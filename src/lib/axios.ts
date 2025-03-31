import axios from "axios";

const api = axios.create({
  baseURL: process.env.STRAPI_BACKEND_URL ?? "http://localhost:1337", // Replace with your actual API URL
  timeout: 10000, // Optional: Set a timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
