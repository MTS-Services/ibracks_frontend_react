// axios.js
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3011/api",
});

// Request Interceptor: Attach language and token
instance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const token = userInfo?.data?.token;

    // Attach headers

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
