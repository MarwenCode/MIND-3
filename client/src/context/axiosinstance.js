import axios from "axios";

const API_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Get the user ID from local storage and add it as a query parameter to the request
    const userId = localStorage.getItem("user_id");
    if (userId) {
      config.params = { user_id: userId };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;

