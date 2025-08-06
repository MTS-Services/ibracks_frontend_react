import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../utils/axiosInstance";
// Async thunk to fetch the songs the user already owns
export const fetchOwnedSongs = createAsyncThunk(
  "auth/fetchOwnedSongs",
  async (_, { rejectWithValue }) => {
    try {
      // --- PATH FIXED HERE ---
      const response = await axios.get("/payments/orders/my-orders");
      if (response.data.success) {
        // Extract all song IDs from all items in all orders
        const songIds = response.data.orders.flatMap((order) =>
          order.items.map((item) => item.songId),
        );
        return new Set(songIds);
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Could not fetch owned songs",
      );
    }
  },
);

// --- NEW --- Async thunk to fetch songs uploaded by the user
export const fetchUploadedSongs = createAsyncThunk(
  "auth/fetchUploadedSongs",
  async (_, { rejectWithValue }) => {
    try {
      // IMPORTANT: Ask your backend dev for this API endpoint
      const response = await axios.get("/users/my-uploaded-songs");
      if (response.data.success) {
        return new Set(response.data.uploadedSongs.map((song) => song.id));
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Could not fetch uploaded songs",
      );
    }
  },
);

const initialState = {
  user: null,
  token: null,
  ownedSongIds: [],
  uploadedSongIds: [], // <-- NEW STATE
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
      state.ownedSongIds = [];
      state.uploadedSongIds = []; // <-- RESET ON LOGOUT
    },
  },
  extraReducers: (builder) => {
    builder
      // Cases for owned songs
      .addCase(fetchOwnedSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOwnedSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ownedSongIds = Array.from(action.payload);
      })
      .addCase(fetchOwnedSongs.rejected, (state) => {
        state.status = "failed";
      })
      // --- NEW --- Cases for uploaded songs
      .addCase(fetchUploadedSongs.fulfilled, (state, action) => {
        state.uploadedSongIds = Array.from(action.payload);
      });
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
