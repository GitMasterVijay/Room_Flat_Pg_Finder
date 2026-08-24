import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_URL 
  ? (import.meta.env.VITE_API_URL.endsWith('/') ? import.meta.env.VITE_API_URL.slice(0, -1) : import.meta.env.VITE_API_URL)
  : (import.meta.env.DEV ? "http://localhost:5000" : "");

export const getImageUrl = (img) => {
  if (!img) return "https://placehold.co/600x400/CCCCCC/666666?text=No+Image";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  const base = API_BASE ? API_BASE : "";
  return `${base}/uploads/${img}`;
};

const API = axios.create({
  baseURL: `${API_BASE}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
