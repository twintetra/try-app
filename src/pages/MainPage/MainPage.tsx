import React, {useEffect, useState} from 'react';
import {useGetUsersQuery, useLazyGetUserReposQuery} from '../../store/github/github.api';
import styles from './MainPage.module.scss';
import {useDebounce} from '../../hooks/debounce';
import {IRepo} from '../../models/models';
import {RepoCard} from '../../components/RepoCard';

export const MainPage = () => {
  const [search, setSearch] = useState<string>('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const {isError, isLoading, data} = useGetUsersQuery(debounced, {
    skip: debounced.length < 3,
  });
  const [fetchRepos, {isLoading: areReposLoading, isError: areReposError, data: reposData}] =
    useLazyGetUserReposQuery();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleUser = (login: string) => () => {
    fetchRepos(login);
    setDropdown(false);
  };

  useEffect(() => {
    setDropdown(debounced.length >= 3 && !!data?.length);
  }, [debounced, data]);

  if (isError || areReposError)
    return (
      <div className={styles.container}>
        <p className={styles.error}>Something went wrong...</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search for Github name..."
          value={search}
          onChange={handleSearch}
        />
        {dropdown && (
          <ul className={styles.searchDropdown}>
            {isLoading ? (
              <li className={styles.listLoader}>Loading...</li>
            ) : (
              data?.map((user) => (
                <li key={user.id} className={styles.list} onClick={handleUser(user.login)}>
                  {user.login}
                </li>
              ))
            )}
          </ul>
        )}
        <div className={styles.repos}>
          {areReposLoading ? (
            <div>Loading...</div>
          ) : (
            reposData?.map((repo: IRepo) => <RepoCard key={repo.id} repo={repo} />)
          )}
        </div>
      </div>
    </div>
  );
};
