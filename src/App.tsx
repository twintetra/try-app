import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {MainPage} from './pages/MainPage';
import {FavouritesPage} from './pages/FavouritesPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
    </Routes>
  );
}
