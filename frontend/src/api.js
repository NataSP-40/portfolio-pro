import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8000/api/", // Adjust the baseURL as needed
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const csrfToken = Cookies.get("csrftoken");
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

export const fetchProfile = () => api.get("profile/");
export const fetchProjects = () => api.get("projects/");
export const sendContact = (data) => api.post("contact/", data);

export default api;
