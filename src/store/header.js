import { createSlice } from "@reduxjs/toolkit";

const headerInitial = {
    isNavVisible: true,
};

const headerSlice = createSlice({
    name: "header",
    initialState: headerInitial,
    reducers: {
        setIsNavVisible(state, action) {
            state.isNavVisible = action.payload;
        },
    },
});

export default headerSlice;

export const headerActions = headerSlice.actions;
