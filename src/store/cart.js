import { createSlice } from "@reduxjs/toolkit";

const cartInitial = {
    // products: [{ id: 1, size: "m", color: "bluelight" }],
    products: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitial,
    reducers: {
        addToCart(state, action) {
            state.products.push(action.payload);
        },
        removeFromCart(state, action) {
            state.products = state.products.filter(
                (item) => item !== action.payload
            );
        },
    },
});

export default cartSlice;

export const cartActions = cartSlice.actions;
