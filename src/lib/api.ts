import axios, { AxiosRequestHeaders } from "axios";

// Passe par la variable d'env (ou /api -> proxy Vite)
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

export const api = axios.create({
  baseURL,
  headers: { Accept: "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (location.pathname !== "/login") window.location.replace("/login");
    }
    return Promise.reject(err);
  }
);

export function setToken(token: string | null) {
  if (!token) {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  } else {
    localStorage.setItem("token", token);
    (api.defaults.headers.common as AxiosRequestHeaders)["Authorization"] = `Bearer ${token}`;
  }
}
