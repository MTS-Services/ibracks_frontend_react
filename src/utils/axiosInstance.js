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
// import axios from "axios";
// const instance = axios.create({
//   baseURL: "https://backend-ibracks.mtscorporate.com/api",
// });

// // Request Interceptor: Attach language and token
// instance.interceptors.request.use(
//   (config) => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     const token = userInfo?.data?.token;
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// export default instance;

//kamrul

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-ibracks.mtscorporate.com/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGUybHMxdTAwMDB1aWRvaW53eGl5MmgiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJyZW1lbWJlck1lIjp0cnVlLCJpYXQiOjE3NTQyODQ0MDcsImV4cCI6MTc1Njg3NjQwN30.OupW1D7S41csrYVg6a2nX1obvUflEfHB_Y5SuVsKJvw";

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
