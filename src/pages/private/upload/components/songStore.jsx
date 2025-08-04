import { create } from "zustand";

export const useSongStore = create((set) => ({
  uploadTrigger: 0,
  songUploaded: () =>
    set((state) => ({ uploadTrigger: state.uploadTrigger + 1 })),

  // For global search query
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
