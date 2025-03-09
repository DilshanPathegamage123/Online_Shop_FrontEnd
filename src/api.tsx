import axios from "axios";
import { store, logout } from "./store";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - adds token to requests
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handles auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Dispatch logout action
      store.dispatch(logout());
      // Redirect to login
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
