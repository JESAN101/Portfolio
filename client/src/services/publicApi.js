import api from "./api";

export const profileApi = {
  get: () => api.get("/profile"),
};

export const projectApi = {
  getAll: (params) => api.get("/projects", { params }),
  getById: (id) => api.get(`/projects/${id}`),
};

export const skillApi = {
  getAll: (params) => api.get("/skills", { params }),
};

export const experienceApi = {
  getAll: () => api.get("/experience"),
};

export const educationApi = {
  getAll: () => api.get("/education"),
};

export const certificateApi = {
  getAll: () => api.get("/certificates"),
};

export const contactApi = {
  send: (data) => api.post("/messages", data),
};
