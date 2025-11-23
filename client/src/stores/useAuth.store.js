import { create } from "zustand";
import { toast } from "sonner";

import authService from "@/services/auth.service";

const useAuthStore = create((set, get) => ({
  loading: false,
  user: null,
  accessToken: null,

  clearState: () => set({ user: null, accessToken: null, loading: false }),

  registerUser: async ({ fullname, email, username, password }) => {
    set({ loading: true });
    try {
      await authService.register({ fullname, email, username, password });
      toast.success("Đăng ký thành công");
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Đã có lỗi xảy ra trong quá trình đăng ký",
      );
      return false;
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async ({ login, password }) => {
    set({ loading: true });
    try {
      const {
        data: { accessToken },
      } = await authService.login({
        login,
        password,
      });
      set({ accessToken });
      await get().getMe();
      toast.success("Đăng nhập thành công");
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Đã có lỗi xảy ra trong quá trình đăng nhập",
      );
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logoutUser: async () => {
    try {
      await authService.logout();
      get().clearState();
      toast.success("Đăng xuất thành công");
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Đã có lỗi xảy ra trong quá trình đăng xuất",
      );
      return false;
    }
  },

  getMe: async () => {
    set({ loading: true });
    try {
      const {
        data: { user },
      } = await authService.getMe();

      set({ user });
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Đã có lỗi xảy ra trong quá trình lấy thông tin người dùng",
      );
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
