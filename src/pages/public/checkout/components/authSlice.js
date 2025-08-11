import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../utils/axiosInstance";

// Async thunk to fetch the songs the user already owns WITH purchase dates
export const fetchOwnedSongs = createAsyncThunk(
  "auth/fetchOwnedSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/payments/orders/my-orders");
      if (response.data.success) {
        const ownedSongsData = {};
        // We loop through each order to get the purchase date
        response.data.orders.forEach((order) => {
          const purchaseDate = order.createdAt; // The date of the order
          // Then we loop through the items in that order
          order.items.forEach((item) => {
            // We store the songId and the date it was purchased
            ownedSongsData[item.songId] = purchaseDate;
          });
        });
        // Returns an object like: { "songId1": "2025-08-07T...", "songId2": "..." }
        return ownedSongsData;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Could not fetch owned songs",
      );
    }
  },
);

// (fetchUploadedSongs thunk remains the same if you need it)

const initialState = {
  user: null,
  token: null,
  ownedSongs: {}, // Changed from ownedSongIds to an object to store dates
  uploadedSongIds: [],
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.ownedSongs = {}; // Reset to empty object on logout
      state.uploadedSongIds = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnedSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOwnedSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ownedSongs = action.payload; // Store the object with dates
      })
      .addCase(fetchOwnedSongs.rejected, (state) => {
        state.status = "failed";
      });
    // Add cases for fetchUploadedSongs if you are using it
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
