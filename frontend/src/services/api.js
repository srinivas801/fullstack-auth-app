import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (user) => api.post("/auth/register", user);

export const loginUser = (credentials) => api.post("/auth/login", credentials);

export default api;
