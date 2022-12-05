import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const LS_FAV_KEY = 'fav';

interface IGithubState {
  favourites: string[];
}

const initialState: IGithubState = {
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) || '[] '),
};

export const githubSlice = createSlice({
  name: 'github',
  initialState: initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      state.favourites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter((item) => item !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
  },
});
