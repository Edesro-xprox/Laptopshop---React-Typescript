// api/http.ts
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);