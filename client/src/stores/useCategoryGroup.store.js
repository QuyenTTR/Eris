import { create } from "zustand";
import { toast } from "sonner";

import categoryGroupService from "@/services/categoryGroup.service";

const useCategoryGroupStore = create((set, get) => ({
  loading: false,
  categoryGroups: [],

  clearState: () => set({ categoryGroups: [], loading: false }),

  getAllCategoryGroups: async () => {
    set({ loading: true });
    try {
      const { categoryGroups } = await categoryGroupService.getAll();
      set({ categoryGroups });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Lỗi tải nhóm danh mục");
    } finally {
      set({ loading: false });
    }
  },

  createCategoryGroup: async (data) => {
    set({ loading: true });
    try {
      const { message } = await categoryGroupService.create(data);
      get().getAllCategoryGroups();
      toast.success(message);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Lỗi tạo nhóm danh mục");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateCategoryGroup: async (id, data) => {
    set({ loading: true });
    try {
      const { message } = await categoryGroupService.update(id, data);
      get().getAllCategoryGroups();

      toast.success(message);
      return true;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Lỗi cập nhật nhóm danh mục",
      );
      return false;
    } finally {
      set({ loading: false });
    }
  },

  toggleCategoryGroupStatus: async (id) => {
    set({ loading: true });
    try {
      const { message } = await categoryGroupService.toggleStatus(id);
      get().getAllCategoryGroups();

      toast.success(message);
      return true;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Lỗi thay đổi trạng thái nhóm danh mục",
      );
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteCategoryGroup: async (id) => {
    set({ loading: true });
    try {
      const { message } = await categoryGroupService.delete(id);
      get().getAllCategoryGroups();
      toast.success(message);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Lỗi xóa nhóm danh mục");
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategoryGroupStore;
