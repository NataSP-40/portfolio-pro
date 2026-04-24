import axios from "axios";

const envApiUrl = (import.meta.env.VITE_API_URL || "").trim();

const API_BASE_URL =
  envApiUrl || (import.meta.env.DEV ? "http://localhost:8000/api" : "");

if (!API_BASE_URL) {
  throw new Error(
    "Missing VITE_API_URL in production build. Set VITE_API_URL to your deployed backend API root (for example: https://your-backend.onrender.com/api).",
  );
}

const normalizedApiBaseUrl = API_BASE_URL.replace(/\/+$/, "");

const MEDIA_BASE_URL =
  import.meta.env.VITE_MEDIA_BASE_URL ||
  normalizedApiBaseUrl.replace(/\/api$/, "");

const normalizedMediaBaseUrl = MEDIA_BASE_URL.replace(/\/+$/, "");

export const getMediaUrl = (path) => {
  if (!path) {
    return "";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedMediaBaseUrl}${normalizedPath}`;
};

const axiosInstance = axios.create({
  baseURL: normalizedApiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer {token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;
