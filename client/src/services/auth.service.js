import api from "@/lib/api";

const authService = {
  register: (data) => api.post("/auth/register", data).then((res) => res.data),
  login: (data) => api.post("/auth/login", data).then((res) => res.data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/users/me").then((res) => res.data),
  refreshToken: () => api.post("/auth/refresh-token").then((res) => res.data),
};

export default authService;
