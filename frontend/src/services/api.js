import {
  fetchContactInfo as fetchContactInfoRequest,
  sendMessage,
} from "../services.js";

export const fetchContactInfo = () => fetchContactInfoRequest();

export const submitMessage = (payload) => sendMessage(payload);
