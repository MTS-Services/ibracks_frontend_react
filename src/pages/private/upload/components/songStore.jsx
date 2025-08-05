import { create } from "zustand";

const audio = new Audio();

export const useSongStore = create((set, get) => ({
  // Player State
  songs: [],
  currentSongIndex: null,
  isPlaying: false,
  isShuffle: false,
  repeatMode: "off",
  volume: 0.5,
  currentTime: 0,
  duration: 0,
  searchQuery: "",
  uploadTrigger: 0,
  songUploaded: () =>
    set((state) => ({ uploadTrigger: state.uploadTrigger + 1 })),

  // --- Actions ---
  setSongs: (songList) => set({ songs: songList }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  playSong: (index) => {
    const { songs, currentSongIndex } = get();
    if (index === currentSongIndex) {
      get().togglePlayPause();
      return;
    }
    set({ currentSongIndex: index, isPlaying: true });
    audio.src = songs[index].audioFile;
    audio.play().catch((e) => console.error("Audio play failed:", e));
  },

  togglePlayPause: () => {
    const { isPlaying, songs, currentSongIndex } = get();
    if (songs.length === 0 || currentSongIndex === null) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    set({ isPlaying: !isPlaying });
  },

  nextSong: () => {
    const { songs, currentSongIndex, isShuffle } = get();
    if (songs.length === 0) return;
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    get().playSong(nextIndex);
  },

  prevSong: () => {
    const { songs, currentSongIndex } = get();
    if (songs.length === 0) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    get().playSong(prevIndex);
  },

  seek: (time) => {
    audio.currentTime = time;
    set({ currentTime: time });
  },

  setVolume: (e) => {
    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    set({ volume: newVolume });
  },

  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),

  toggleRepeat: () => {
    set((state) => {
      if (state.repeatMode === "off") return { repeatMode: "all" };
      if (state.repeatMode === "all") return { repeatMode: "one" };
      return { repeatMode: "off" };
    });
  },

  _handleTimeUpdate: () => set({ currentTime: audio.currentTime }),
  _handleLoadedMetadata: () => set({ duration: audio.duration }),
  _handleSongEnd: () => {
    const { repeatMode } = get();
    if (repeatMode === "one") {
      audio.currentTime = 0;
      audio.play();
    } else {
      get().nextSong();
    }
  },
}));

// Attach event listeners to the single audio instance
audio.addEventListener("timeupdate", () =>
  useSongStore.getState()._handleTimeUpdate(),
);
audio.addEventListener("loadedmetadata", () =>
  useSongStore.getState()._handleLoadedMetadata(),
);
audio.addEventListener("ended", () => useSongStore.getState()._handleSongEnd());
