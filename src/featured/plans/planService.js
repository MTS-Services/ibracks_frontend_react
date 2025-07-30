import axiosInstance from "../../utils/axiosInstance";

// ✅ All plans
export const getAllPlans = async (query = {}) => {
  try {
    const res = await axiosInstance.get("plan.json", {
      params: query, // ⬅️ this automatically adds ?key=value to URL
    });
    return res.data;
  } catch (error) {
    console.error(
      "Failed to fetch plan:",
      error?.response?.data?.message || error.message,
    );
    throw error;
  }
};
