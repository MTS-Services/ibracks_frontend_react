import { create } from "zustand";

// This store holds a simple trigger that we can change to cause a refresh
export const useSongStore = create((set) => ({
  uploadTrigger: 0,
  songUploaded: () =>
    set((state) => ({ uploadTrigger: state.uploadTrigger + 1 })),
}));
