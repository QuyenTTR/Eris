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
      const { category: newCategory, message } =
        await categoryService.create(data);
      set((state) => ({
        categories: [newCategory, ...state.categories],
      }));
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
      const { category: updatedCategory, message } =
        await categoryService.update(id, data);
      set((state) => ({
        categories: state.categories.map((category) =>
          category._id === id ? updatedCategory : category,
        ),
      }));
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
      const category = get().categories.find((category) => category._id === id);
      if (!category) {
        throw new Error("Danh mục không tồn tại");
      }
      const newStatus = !category.isStatus * 1;
      const { category: updatedCategory } = await categoryService.update(id, {
        ...category,
        isStatus: newStatus,
      });
      set((state) => ({
        categories: state.categories.map((category) =>
          category._id === id ? updatedCategory : category,
        ),
      }));
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
      set((state) => ({
        categories: state.categories.filter((category) => category._id !== id),
      }));
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
