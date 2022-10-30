import { configureStore, createSlice } from "@reduxjs/toolkit";
import filterSlice from "./filter";
import cartSlice from "./cart";
import headerSlice from "./header";

const initialProductsState = {
    // Remove
    products: [],
};

const productsSlice = createSlice({
    // Remove
    name: "products",
    initialState: initialProductsState,
    reducers: {
        refreshProducts(state, action) {
            state.products = [...state.products, ...action.payload];
        },
    },
});

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        filter: filterSlice.reducer,
        cart: cartSlice.reducer,
        header: headerSlice.reducer,
    },
});

export default store;

export const productsActions = productsSlice.actions; // Remove
