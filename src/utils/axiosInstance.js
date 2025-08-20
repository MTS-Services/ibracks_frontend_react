// src/utils/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend.beatzingeez.com/api",
});

// Request Interceptor: if Authorization already set (e.g., Firebase ID token),
// don't overwrite it with app token from localStorage.
instance.interceptors.request.use(
  (config) => {
    if (config.headers && config.headers.Authorization) {
      return config;
    }

    try {
      const raw = localStorage.getItem("userInfo");
      const appToken = raw ? JSON.parse(raw)?.data?.token : null;
      if (appToken) {
        config.headers["Authorization"] = `Bearer ${appToken}`;
      }
    } catch {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
