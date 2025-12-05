import Category from "../models/category.model.js";

import ApiError from "../utils/apiError.js";

class CategoryController {
  async getAll(req, res, next) {
    try {
      const categories = await Category.find().sort({ createdAt: -1 });

      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, isStatus, description, colorHex } = req.body;

      const newCategory = new Category({ name, isStatus, description, colorHex });
      await newCategory.save();

      res.status(201).json({ message: "Tạo danh mục thành công", category: newCategory });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      if (!updatedCategory) {
        throw new ApiError(404, "Danh mục không tồn tại");
      }

      res.status(200).json({
        message: "Cập nhật danh mục thành công",
        category: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleStatus(req, res, next) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        throw new ApiError(404, "Danh mục không tồn tại");
      }
      category.isStatus = !category.isStatus * 1;
      await category.save();

      res.status(200).json({
        message: "Cập nhật trạng thái thành công",
        category,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        throw new ApiError(404, "Danh mục không tồn tại");
      }

      res.status(200).json({
        message: "Xóa danh mục thành công",
        category: deletedCategory,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
