import api from "@/lib/api";

const authService = {
  register: (data) => api.post("/auth/signup", data, { withCredentials: true }),
  login: (data) => api.post("/auth/signin", data, { withCredentials: true }),
};

export default authService;
