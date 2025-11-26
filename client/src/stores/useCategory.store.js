import { create } from "zustand";
import { toast } from "sonner";

import categoryService from "@/services/category.service";

const useCategoryStore = create((set, get) => ({
  loading: false,
  categories: [],

  clearState: () => set({ categories: [], loading: false }),

  getAllCategories: async () => {
    set({ loading: true });
    try {
      const { categories } = await categoryService.getAll();
      set({ categories });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Lỗi tải danh mục");
    } finally {
      set({ loading: false });
    }
  },

  createCategory: async (data) => {
    set({ loading: true });
    try {
      const { message } = await categoryService.create(data);
      get().getAllCategories();

      toast.success(message);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Lỗi khi tạo danh mục");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateCategory: async (id, data) => {
    set({ loading: true });
    try {
      const { message } = await categoryService.update(id, data);
      get().getAllCategories();

      toast.success(message);
      return true;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Lỗi khi cập nhật danh mục",
      );
      return false;
    } finally {
      set({ loading: false });
    }
  },

  toggleCategoryStatus: async (id) => {
    set({ loading: true });
    try {
      const { message } = await categoryService.toggleStatus(id);
      get().getAllCategories();

      toast.success("Cập nhật trạng thái thành công");
      return true;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Lỗi khi cập nhật trạng thái danh mục",
      );
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ loading: true });
    try {
      const { message } = await categoryService.delete(id);

      get().getAllCategories();

      toast.success(message);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Lỗi khi xóa danh mục");
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategoryStore;
