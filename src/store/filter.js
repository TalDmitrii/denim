import { createSlice } from "@reduxjs/toolkit";

const initialFilter = {
    color: null,
    size: null,
    minPrice: null,
    maxPrice: null,
};

const filterSlice = createSlice({
    name: "filter",
    initialState: initialFilter,
    reducers: {
        setColor(state, action) {
            state.color = action.payload;
        },
        setSize(state, action) {
            state.size = action.payload;
        },
        setMinPrice(state, action) {
            state.minPrice = action.payload;
        },
        setMaxPrice(state, action) {
            state.maxPrice = action.payload;
        },
    },
});

export default filterSlice;

export const filterActions = filterSlice.actions;
