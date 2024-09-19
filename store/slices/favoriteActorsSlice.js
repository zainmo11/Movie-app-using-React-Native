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
        }
    }
});

export const { addFavoriteActor, removeFavoriteActor } = favoriteActorsSlice.actions;
export default favoriteActorsSlice.reducer;
