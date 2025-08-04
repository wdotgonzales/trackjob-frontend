// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

// Thunk to check if user has valid and non-expired token
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const token = await AsyncStorage.getItem('accessToken');
  if (!token) throw new Error('No token');

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
    if (decoded.exp && decoded.exp < currentTime) {
      await AsyncStorage.removeItem('accessToken');
      throw new Error('Token expired');
    }

    return token;
  } catch (error) {
    await AsyncStorage.removeItem('accessToken');
    throw new Error('Invalid or expired token');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isLoading: false,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      AsyncStorage.removeItem('accessToken');
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const { login, logout, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;