// src/lib/api.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);

export const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to attach the Authorization header automatically
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Get reviews all with pagination and dynamic params
export async function getAllReview(page = 1, limit = 10) {
  try {
    const res = await api.get(`/reviews/all?page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching reviewss:", err);
    throw new Error("Failed to fetch all reviews with pagination");
  }
}
