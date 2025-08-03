import { create } from "zustand";

export const useSongStore = create((set) => ({
  // For refreshing the recent uploads list
  uploadTrigger: 0,
  songUploaded: () =>
    set((state) => ({ uploadTrigger: state.uploadTrigger + 1 })),

  // Main Part: Add state for the global search query
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
