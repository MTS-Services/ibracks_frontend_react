// store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "../cart/cartSlice";
import audioPlayerReducer from "../song/playingSlice";
import authReducer from "../auth/authSlice"; // <-- 1. Notun authReducer import korun

// 2. Apnar shob reducer'ke ekotrito korun
const rootReducer = combineReducers({
  cart: cartReducer,
  audioPlayer: audioPlayerReducer,
  auth: authReducer, // <-- 3. Ekhane authReducer jog korun
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist diye bole din shudhumatro kon state'gulo save korte chan
  whitelist: ["cart", "auth"], // <-- 4. Ekhane 'auth' jog korun
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); 
