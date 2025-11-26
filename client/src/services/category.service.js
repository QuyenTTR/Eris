import api from "@/lib/api";

const categoryService = {
  create: (data) => api.post("/categories", data).then((res) => res.data),
  getAll: () => api.get("/categories").then((res) => res.data),
  update: (id, data) =>
    api.put(`/categories/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/categories/${id}`).then((res) => res.data),
};

export default categoryService;
