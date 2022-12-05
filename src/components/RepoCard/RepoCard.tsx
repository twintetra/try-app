import React, {useState} from 'react';
import {IRepo} from '../../models/models';
import styles from './RepoCard.module.scss';
import {useActions} from '../../hooks/actions';
import {useAppSelector} from '../../hooks/redux';
import cn from 'classnames';

export const RepoCard: React.FC<{repo: IRepo}> = ({repo}) => {
  const {addFavorite, removeFavorite} = useActions();

  const {favourites} = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  const addToFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFav(true);
    addFavorite(repo.html_url);
  };

  const removeFromFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFav(false);
    removeFavorite(repo.html_url);
  };

  return (
    <a href={repo.html_url} className={styles.repoCard} target="_blank">
      <p className={styles.cardName}>{repo.name}</p>
      <div className={styles.extraInformation}>
        <p>Language: {repo.language || '-'}</p>
        <p>Watchers: {repo.watchers_count || '-'}</p>
        <p>Description: {repo.description || '-'}</p>
      </div>
      {!isFav && (
        <button className={cn(styles.button, styles.addButton)} type="button" onClick={addToFavourite}>
          Add to favourite
        </button>
      )}
      {isFav && (
        <button className={cn(styles.button, styles.removeButton)} type="button" onClick={removeFromFavourite}>
          Remove from favourite
        </button>
      )}
    </a>
  );
};
