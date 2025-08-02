import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false, 
};

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        showLoader: (state) => {
            state.isVisible = true;
        },
        hideLoader: (state) => {
            state.isVisible = false;
        },
    },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
