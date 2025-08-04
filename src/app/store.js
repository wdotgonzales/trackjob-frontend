import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import userProfileReducer from "../features/profile/profileSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: userProfileReducer,
    }
})

