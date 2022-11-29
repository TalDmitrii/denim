import { createSlice } from "@reduxjs/toolkit";

const favoritesInitial = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: favoritesInitial,
    reducers: {
        addToFavorites(state, action) {
            const isFound = state.favorites.find((id) => id === action.payload);
            if (isFound) return;

            state.favorites.unshift(action.payload);
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
        removeFromFavorites(state, action) {
            state.favorites = state.favorites.filter(
                (id) => id !== action.payload
            );
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
    },
});

export default favoritesSlice;

export const favoritesActions = favoritesSlice.actions;
