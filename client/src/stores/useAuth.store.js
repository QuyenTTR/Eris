import { create } from "zustand";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import authService from "@/services/auth.service";

// const navigate = useNavigate();

const useAuthStore = create((set) => ({
  loading: false,
  user: null,
  accessToken: null,

  registerUser: async ({ fullname, email, username, password }) => {
    set({ loading: true });
    try {
      await authService.register({ fullname, email, username, password });
      toast.success("Đăng ký thành công");
      return true;
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Đã có lỗi xảy ra trong quá trình đăng ký",
      );
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
