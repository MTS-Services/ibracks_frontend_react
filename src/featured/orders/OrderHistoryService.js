import axiosInstance from "../../utils/axiosInstance";

// ✅ All orders
export const getAllOrders = async (query = {}) => {
  try {
    const res = await axiosInstance.get("/payments/orders/my-orders", {
      params: query, // ⬅️ this automatically adds ?key=value to URL
    });
    return res.data;
  } catch (error) {
    console.error(
      "Failed to fetch orders:",
      error?.response?.data?.message || error.message,
    );
    throw error;
  }
};
