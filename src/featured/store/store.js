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
import storage from "redux-persist/lib/storage"; // localStorage ব্যবহার করার জন্য

import cartReducer from "../cart/cartSlice";
import audioPlayerReducer from "../song/playingSlice";

// ধাপ ১: আপনার সব রিডিউসারকে একত্রিত করুন
const rootReducer = combineReducers({
  cart: cartReducer,
  audioPlayer: audioPlayerReducer,
});

// ধাপ ২: redux-persist এর জন্য কনফিগারেশন তৈরি করুন
const persistConfig = {
  key: "root", // localStorage-এ মূল key
  storage,
  // whitelist দিয়ে বলে দিন শুধুমাত্র কোন state-টি সেভ করতে চান
  whitelist: ["cart"],
};

// ধাপ ৩: একত্রিত রিডিউসারকে persistReducer দিয়ে র‍্যাপ করুন
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ধাপ ৪: স্টোর কনফিগার করুন
export const store = configureStore({
  reducer: persistedReducer, // এখানে সরাসরি পারসিস্টেড রিডিউসার ব্যবহার করুন
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
