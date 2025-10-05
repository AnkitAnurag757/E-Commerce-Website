import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for handling the newsletter subscription
export const subscribeToNewsletter = createAsyncThunk(
  "subscriber/subscribe",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
        { email }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const subscriberSlice = createSlice({
  name: "subscriber",
  initialState: {
    loading: false,
    success: false,
    message: null,
    error: null,
  },
  reducers: {
    resetSubscriptionState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state for the subscription
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.success = false;
      })
      // Handle the fulfilled state for the subscription
      .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.error = null;
      })
      // Handle the rejected state for the subscription
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
        state.message = action.payload.message;
      });
  },
});

export const { resetSubscriptionState } = subscriberSlice.actions;

export default subscriberSlice.reducer;
