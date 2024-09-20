import { createSlice } from '@reduxjs/toolkit';

const favoriteMoviesSlice = createSlice({
    name: 'favoriteMovies',
    initialState: [],
    reducers: {
        addFavoriteMovie: (state, action) => {
            state.push(action.payload);  // Add new movie to the favorite list
        },
        removeFavoriteMovie: (state, action) => {
            return state.filter(movie => movie.id !== action.payload.id);  // Remove movie by id
        },
        getFavoriteMovies: (state) => {
            return state;
        }
    }
});

export const { addFavoriteMovie, removeFavoriteMovie, getFavoriteMovies } = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;
