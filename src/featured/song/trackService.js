import axiosInstance from "../../utils/axiosInstance";

// ✅ All songs
export const getAllSongs = async (query = {}) => {
  try {
    const res = await axiosInstance.get("tracks.json", {
      params: query, // ⬅️ this automatically adds ?key=value to URL
    });
    return res.data;
  } catch (error) {
    console.error(
      "Failed to fetch songs:",
      error?.response?.data?.message || error.message,
    );
    throw error;
  }
};

// ✅ Single song by ID
export const getSongById = async (id) => {
  try {
    const res = await axiosInstance.get("tracks.json");
    const allSongs = res.data;

    const song = allSongs.find((s) => String(s.id) === String(id));

    if (!song) {
      throw new Error(`Song with ID ${id} not found`);
    }

    return song;
  } catch (error) {
    console.error(
      `Failed to fetch song with ID ${id}:`,
      error?.response?.data?.message || error.message,
    );
    throw error;
  }
};
