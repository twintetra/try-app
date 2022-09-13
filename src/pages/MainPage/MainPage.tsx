import React, {useEffect, useState} from 'react';
import {useGetUsersQuery} from '../../domain/core/github.api';
import styles from './MainPage.module.scss';
import {useDebounce} from '../../hooks/debounce';

export const MainPage = () => {
  const [search, setSearch] = useState<string>('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const {isError, isLoading, data} = useGetUsersQuery(debounced, {
    skip: debounced.length < 3,
  });
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  useEffect(() => {
    setDropdown(debounced.length >= 3 && !!data?.length);
  }, [debounced, data]);

  if (isError)
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
                <li key={user.id} className={styles.list}>
                  {user.login}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
