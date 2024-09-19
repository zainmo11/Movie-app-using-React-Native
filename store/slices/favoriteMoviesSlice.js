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
        }
    }
});

export const { addFavoriteMovie, removeFavoriteMovie } = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;
