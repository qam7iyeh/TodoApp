import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://localhost:7211";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;