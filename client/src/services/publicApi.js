import axios from "axios";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const profileApi = {
  get: () => publicApi.get("/profile"),
};

export const projectApi = {
  getAll: (params) => publicApi.get("/projects", { params }),
  getById: (id) => publicApi.get(`/projects/${id}`),
};

export const skillApi = {
  getAll: (params) => publicApi.get("/skills", { params }),
};

export const experienceApi = {
  getAll: () => publicApi.get("/experience"),
};

export const educationApi = {
  getAll: () => publicApi.get("/education"),
};

export const certificateApi = {
  getAll: (params) => publicApi.get("/certificates", { params }),
};

export const contactApi = {
  send: (data) => publicApi.post("/messages", data),
};

export default publicApi;
