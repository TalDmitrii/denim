import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter";
import cartSlice from "./cart";
import headerSlice from "./header";
import displayModeSlice from "./display-mode";
import favoritesSlice from "./favorites";

const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        cart: cartSlice.reducer,
        header: headerSlice.reducer,
        displayMode: displayModeSlice.reducer,
        favorites: favoritesSlice.reducer,
    },
});

export default store;
