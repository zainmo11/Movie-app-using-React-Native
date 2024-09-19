import { configureStore } from '@reduxjs/toolkit';
import favoriteActorsReducer from './slices/favoriteActorsSlice';
import favoriteMoviesReducer from './slices/favoriteMoviesSlice';

export const store = configureStore({
    reducer: {
        favoriteActors: favoriteActorsReducer,
        favoriteMovies: favoriteMoviesReducer,
    },
});
