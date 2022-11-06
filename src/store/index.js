import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter";
import cartSlice from "./cart";
import headerSlice from "./header";

const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        cart: cartSlice.reducer,
        header: headerSlice.reducer,
    },
});

export default store;
