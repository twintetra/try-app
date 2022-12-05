import React from 'react';
import {useAppSelector} from '../../hooks/redux';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const {favourites} = useAppSelector((state) => state.github);

  if (!favourites.length) {
    return (
      <div className={styles.container}>
        <p>No items</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul>
        {favourites.map((favourite) => (
          <li key={favourite} className={styles.item}>
            <a href={favourite} target="_blank">
              {favourite}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
