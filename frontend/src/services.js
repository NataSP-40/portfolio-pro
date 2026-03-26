import axiosInstance, { getMediaUrl } from "./axiosConfig";

export const fetchProfile = () => axiosInstance.get("/profile/");

export const fetchContactInfo = () => axiosInstance.get("/contact-info/");

export const sendMessage = (data) => axiosInstance.post("/messages/", data);

export const fetchProjects = () => axiosInstance.get("/projects/");

export const fetchResume = () => axiosInstance.get("/resume/");

export { getMediaUrl };
