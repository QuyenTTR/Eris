import api from "@/lib/api";

const categoryGroupService = {
  create: (data) => api.post("/category-groups", data).then((res) => res.data),
  getAll: () => api.get("/category-groups").then((res) => res.data),
  update: (id, data) =>
    api.put(`/category-groups/${id}`, data).then((res) => res.data),
  toggleStatus: (id) =>
    api.patch(`/category-groups/${id}/toggle-status`).then((res) => res.data),
  delete: (id) => api.delete(`/category-groups/${id}`).then((res) => res.data),
};

export default categoryGroupService;
