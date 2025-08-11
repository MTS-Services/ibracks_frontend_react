import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import axios from "../../../../utils/axiosInstance";
export function useLicenseManager() {
  const [packs, setPacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPacks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/licenses");
      if (response.data && response.data.success) {
        setPacks(response.data.data);
      }
    } catch (err) {
      setError(err);
      toast.error("Failed to fetch license packs.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPack = async (newPackData) => {
    try {
      const response = await axios.post("/licenses", newPackData);

      // Check if the response and its data property exist
      if (response.data && response.data.data) {
        // --- FIX IS HERE ---
        // Before: You were likely adding the whole response.data
        // Now: We add the pack object from response.data.data
        setPacks((prevPacks) => [...prevPacks, response.data.data]);
        toast.success("License pack created successfully!");
        return true;
      } else {
        // Handle cases where the API response format is unexpected
        toast.error("Received an invalid response from the server.");
        return false;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create pack.");
      return false;
    }
  };

  const updatePack = async (packId, updatedPackData) => {
    try {
      const response = await axios.put(`/licenses/${packId}`, updatedPackData);
      if (response.data && response.data.success) {
        setPacks((prevPacks) =>
          prevPacks.map((pack) =>
            pack.id === packId ? response.data.data : pack,
          ),
        );
        toast.success("License pack updated successfully!");
        return true;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update pack.");
      return false;
    }
  };

  const deletePack = async (packId) => {
    try {
      // Expecting a 204 No Content response on success
      await axios.delete(`/licenses/${packId}`);
      setPacks((prevPacks) => prevPacks.filter((pack) => pack.id !== packId));
      toast.success("License pack deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete pack.");
    }
  };

  return {
    packs,
    isLoading,
    error,
    fetchPacks,
    createPack,
    updatePack,
    deletePack,
  };
}
