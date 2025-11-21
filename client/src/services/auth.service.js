import api from "@/lib/api";

const authService = {
  register: (data) =>
    api.post("/auth/register", data, { withCredentials: true }),
  login: (data) => api.post("/auth/login", data, { withCredentials: true }),
};

export default authService;
