import { createSlice } from "@reduxjs/toolkit";

const cartInitial = {
    products: JSON.parse(localStorage.getItem("cartProducts")) || [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitial,
    reducers: {
        addToCart(state, action) {
            state.products.unshift(action.payload);
            localStorage.setItem(
                "cartProducts",
                JSON.stringify(state.products)
            );
        },
        removeFromCart(state, action) {
            state.products = state.products.filter(
                (item) => item.localStorageID !== action.payload
            );
            localStorage.setItem(
                "cartProducts",
                JSON.stringify(state.products)
            );
        },
    },
});

export default cartSlice;

export const cartActions = cartSlice.actions;
