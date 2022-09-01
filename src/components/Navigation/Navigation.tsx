import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Navigation.module.scss';

export const Navigation = () => (
  <nav>
    <div className={styles.navigation}>
      <Link to="/" className={styles.link}>
        Main
      </Link>
      <Link to="/favourites" className={styles.link}>
        Favourites
      </Link>
    </div>
  </nav>
);
