import { createSlice } from "@reduxjs/toolkit";

const displayInitial = {
    isMobile: true,
};

const displayModeSlice = createSlice({
    name: "displayMode",
    initialState: displayInitial,
    reducers: {
        setIsMobile(state, action) {
            state.isMobile = action.payload;
        },
    },
});

export default displayModeSlice;

export const displayActions = displayModeSlice.actions;
