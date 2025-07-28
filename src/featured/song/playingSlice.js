import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentlyPlaying: null, // ID of currently playing song
  isPlaying: false,
  volume: 1,
  playbackRate: 1,
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    setCurrentlyPlaying: (state, action) => {
      state.currentlyPlaying = action.payload;
      state.isPlaying = true;
    },

    togglePlayback: (state, action) => {
      const songId = action.payload;

      if (state.currentlyPlaying === songId) {
        // Toggle play/pause for the same song
        state.isPlaying = !state.isPlaying;
      } else {
        // Play a different song
        state.currentlyPlaying = songId;
        state.isPlaying = true;
      }
    },

    pausePlayback: (state) => {
      state.isPlaying = false;
    },

    stopPlayback: (state) => {
      state.currentlyPlaying = null;
      state.isPlaying = false;
    },

    setVolume: (state, action) => {
      state.volume = Math.max(0, Math.min(1, action.payload));
    },

    setPlaybackRate: (state, action) => {
      state.playbackRate = action.payload;
    },
  },
});

export const {
  setCurrentlyPlaying,
  togglePlayback,
  pausePlayback,
  stopPlayback,
  setVolume,
  setPlaybackRate,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
