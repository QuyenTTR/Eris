import CategoryGroup from "../models/categoryGroup.model.js";
import Category from "../models/category.model.js";

import ApiError from "../utils/apiError.js";

class CategoryGroupController {
  async getAll(req, res, next) {
    try {
      const categoryGroups = await CategoryGroup.find().sort({ createdAt: -1 });

      res.status(200).json({ categoryGroups });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, isStatus, description } = req.body;

      const newCategoryGroup = new CategoryGroup({ name, isStatus, description });
      await newCategoryGroup.save();

      res.status(201).json({ message: "Tạo nhóm danh mục thành công", newCategoryGroup });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = req.body;

      const updatedCategoryGroup = await CategoryGroup.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      if (!updatedCategoryGroup) {
        throw new ApiError(404, "Nhóm danh mục không tồn tại");
      }

      res.status(200).json({
        message: "Cập nhật nhóm danh mục thành công",
        categoryGroup: updatedCategoryGroup,
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleStatus(req, res, next) {
    try {
      const { id } = req.params;
      const categoryGroup = await CategoryGroup.findById(id);
      if (!categoryGroup) {
        throw new ApiError(404, "Nhóm danh mục không tồn tại");
      }
      categoryGroup.isStatus = !categoryGroup.isStatus * 1;
      await categoryGroup.save();
      res.status(200).json({
        message: "Cập nhật trạng thái thành công",
        categoryGroup,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedCategoryGroup = await CategoryGroup.findByIdAndDelete(req.params.id);
      if (!deletedCategoryGroup) {
        throw new ApiError(404, "Nhóm danh mục không tồn tại");
      }
      const hasCategories = await Category.findOne({ categoryGroupId: req.params.id });
      if (hasCategories) {
        throw new ApiError(400, "Nhóm danh mục đang được sử dụng, không thể xóa");
      }

      res.status(200).json({
        message: "Xóa nhóm danh mục thành công",
        categoryGroup: deletedCategoryGroup,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryGroupController();
