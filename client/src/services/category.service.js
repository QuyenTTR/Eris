import api from "@/lib/api";

const categoryService = {
  create: (data) => api.post("/category", data).then((res) => res.data),
  getAll: () => api.get("/category").then((res) => res.data),
  update: (id, data) =>
    api.put(`/category/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/category/${id}`).then((res) => res.data),
};

export default categoryService;
