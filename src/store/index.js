import { configureStore, createSlice } from "@reduxjs/toolkit";

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
    },
});

export default store;

export const productsActions = productsSlice.actions;
