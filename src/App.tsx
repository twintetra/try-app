import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {MainPage} from './pages/MainPage';
import {FavouritesPage} from './pages/FavouritesPage';
import {Navigation} from './components/Navigation';
import './styles/main.module.scss';

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </>
  );
}
