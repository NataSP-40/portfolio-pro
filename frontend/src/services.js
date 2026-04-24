import axiosInstance, { getMediaUrl } from "./axiosConfig";

const DEFAULT_NAV_LINKS = [
  { label: "Home", href: "#profile" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const DEFAULT_PRIMARY_BUTTON = { label: "View My Work", href: "#projects" };
const DEFAULT_SECONDARY_BUTTON = { label: "Get in Touch", href: "#contact" };

const unwrapProfilePayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload[0] || null;
  }

  return payload || null;
};

export const fetchProfile = () => axiosInstance.get("/profile/");

export const fetchNavbarContent = async () => {
  const response = await fetchProfile();
  const profile = unwrapProfilePayload(response.data);

  return {
    logo_text: profile?.logo_text || profile?.name || "Logo",
    links: Array.isArray(profile?.links) ? profile.links : DEFAULT_NAV_LINKS,
  };
};

export const fetchProfileContent = async () => {
  const response = await fetchProfile();
  const profile = unwrapProfilePayload(response.data);

  return {
    headline:
      profile?.headline ||
      (profile?.name ? `${profile.name}` : "Your headline"),
    title: profile?.title || "",
    subheadline:
      profile?.subheadline ||
      profile?.hero_statement ||
      "Your subheadline goes here.",
    primary_button: profile?.primary_button || DEFAULT_PRIMARY_BUTTON,
    secondary_button: profile?.secondary_button || DEFAULT_SECONDARY_BUTTON,
  };
};

export const fetchContactInfo = () => axiosInstance.get("/contact-info/");

export const sendMessage = (data) => axiosInstance.post("/messages/", data);

export const fetchProjects = () => axiosInstance.get("/projects/");

export const fetchResume = () => axiosInstance.get("/resume/");

export { getMediaUrl };
