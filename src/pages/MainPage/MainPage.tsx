import React, {useState} from 'react';
import {useGetUsersQuery} from '../../domain/core/github.api';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  const [search, setSearch] = useState<string>('');
  const {isError, isLoading, data} = useGetUsersQuery('twin');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

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
        <div className={styles.searchDropdown}>Lorem ipsum</div>
      </div>
    </div>
  );
};
