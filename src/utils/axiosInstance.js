import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/data/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Optional: Add interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
