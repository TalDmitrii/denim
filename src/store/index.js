import { configureStore, createSlice } from "@reduxjs/toolkit";
import filterSlice from "./filter";
import cartSlice from "./cart";

const initialProductsState = {
    products: [],
};

const productsSlice = createSlice({
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
    },
});

export default store;

export const productsActions = productsSlice.actions;
