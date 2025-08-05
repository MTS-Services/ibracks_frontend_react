import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../cart/cartSlice";
import audioPlayerReducer from "../song/playingSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    audioPlayer: audioPlayerReducer,
  },
});
