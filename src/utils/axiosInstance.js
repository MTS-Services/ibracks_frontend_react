// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://backend-ibracks.mtscorporate.com/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// // Optional: Add interceptors
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// export default axiosInstance;

// axios.js
import axios from "axios";
const instance = axios.create({
  baseURL: "https://backend-ibracks.mtscorporate.com/api",
});

// Request Interceptor: Attach language and token
instance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.data?.token;
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
