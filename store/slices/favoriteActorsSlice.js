import { createSlice } from '@reduxjs/toolkit';

const favoriteActorsSlice = createSlice({
    name: 'favoriteActors',
    initialState: [],
    reducers: {
        addFavoriteActor: (state, action) => {
            state.push(action.payload);  // Add new actor to the favorite list
        },
        removeFavoriteActor: (state, action) => {
            return state.filter(actor => actor.id !== action.payload.id);  // Remove actor by id
        },
        getFavoriteActors: (state) => {
            return state;
        }
    }
});

export const { addFavoriteActor, removeFavoriteActor,getFavoriteActors } = favoriteActorsSlice.actions;
export default favoriteActorsSlice.reducer;
