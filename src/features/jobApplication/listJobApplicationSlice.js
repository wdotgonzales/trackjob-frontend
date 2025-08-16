import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../services/httpClient";

export const fetchJobApplication = createAsyncThunk(
    'jobApplication/fetchJobApplication',
    async (params = {}, { rejectWithValue }) => {
        try {
            // Create URL search params from the provided parameters
            const searchParams = new URLSearchParams();
            
            // Add parameters to the URL if they have values
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    searchParams.append(key, value);
                }
            });

            // Build the URL with query parameters
            const queryString = searchParams.toString();
            const url = queryString ? `job_application/?page=1&${queryString}` : 'job_application/?page=1';
            
            const response = await httpClient.get(url);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to fetch job application');
            }

            const result = await response.json();
            return result.data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }
);

const jobApplicationSlice = createSlice({
    name: "jobApplication",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        currentParams: {}, // Store current query parameters
    },
    reducers: {
        clearJobApplicationData: (state) => {
            state.data = [];
            state.error = null;
            state.isLoading = false;
            state.currentParams = {};
        },
        setQueryParams: (state, action) => {
            state.currentParams = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobApplication.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
                // Store the parameters that were used for this request
                state.currentParams = action.meta.arg || {};
            })
            .addCase(fetchJobApplication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchJobApplication.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Something went wrong';
            });
    }
})

export const { clearJobApplicationData, setQueryParams } = jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;
