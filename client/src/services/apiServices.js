import api from "./api";

export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials),
  getMe: () => api.get("/auth/me"),
  // NEW: backend route added in server/src/routes/authRoutes.js — see Settings.jsx
  updatePassword: (data) => api.put("/auth/password", data),
};

export const projectApi = {
  getAll: (params) => api.get("/projects", { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post("/projects", data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  // FIX: the route in server/src/routes/projectRoutes.js is
  // `router.post("/:id/cover", ...)` but this was calling `api.put(...)`,
  // which means cover uploads were hitting a route that doesn't exist
  // (405/404). Changed to POST to match the backend.
  uploadCover: (id, formData) =>
    api.post(`/projects/${id}/cover`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  uploadGallery: (id, formData) =>
    api.post(`/projects/${id}/gallery`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteGallery: (id, imageId) => api.delete(`/projects/${id}/gallery/${imageId}`),
  togglePublish: (id) => api.patch(`/projects/${id}/publish`),
  toggleFeature: (id) => api.patch(`/projects/${id}/feature`),
  reorder: (order) => api.put("/projects/reorder", { order }),
};

export const profileApi = {
  get: () => api.get("/profile"),
  update: (data) => api.put("/profile", data),
  updateImage: (formData) =>
    api.put("/profile/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export const skillApi = {
  getAll: (params) => api.get("/skills", { params }),
  create: (data) => api.post("/skills", data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
  // NEW: these existed on the backend (skillRoutes.js) but had no client wrapper
  uploadIcon: (id, formData) =>
    api.post(`/skills/${id}/icon`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  reorder: (order) => api.put("/skills/reorder", { order }),
};

// NEW: certificateApi didn't exist at all, even though the backend
// (certificateRoutes.js / certificateController.js) was fully built.
export const certificateApi = {
  getAll: (params) => api.get("/certificates", { params }),
  getById: (id) => api.get(`/certificates/${id}`),
  create: (data) => api.post("/certificates", data),
  update: (id, data) => api.put(`/certificates/${id}`, data),
  delete: (id) => api.delete(`/certificates/${id}`),
  uploadImage: (id, formData) =>
    api.post(`/certificates/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  reorder: (order) => api.put("/certificates/reorder", { order }),
};

export const messageApi = {
  getAll: (params) => api.get("/messages", { params }),
  getById: (id) => api.get(`/messages/${id}`),
  getStats: () => api.get("/messages/stats"),
  markRead: (id, read = true) => api.patch(`/messages/${id}/read`, { read }),
  delete: (id) => api.delete(`/messages/${id}`),
  deleteAll: () => api.delete("/messages"),
};