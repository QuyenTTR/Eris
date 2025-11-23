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
      toast.error("Lỗi khi tải danh mục");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategoryStore;
