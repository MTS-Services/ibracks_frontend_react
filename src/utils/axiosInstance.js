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
