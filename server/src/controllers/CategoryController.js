import Category from "../models/category.js";
import formatResponse from "../helpers/formatResponse.js";

class CategoryController {
  async getAll(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: -1 });
      formatResponse(res, 200, categories);
    } catch (error) {
      formatResponse(res, 500, { message: "Lỗi khi lấy danh sách danh mục" });
      console.error("Lỗi khi gọi getAll:", error);
    }
  }

  async create(req, res) {
    try {
      const data = req.body;

      const newCategory = new Category(data);
      await newCategory.save();

      formatResponse(res, 201, { message: "Tạo danh mục thành công", category: newCategory });
    } catch (error) {
      formatResponse(res, 500, { message: "Lỗi khi tạo danh mục" });
      console.error("Lỗi khi gọi create:", error);
    }
  }

  async update(req, res) {
    try {
      const data = req.body;

      if (data.parentId === data._id) {
        return formatResponse(res, 400, { message: "Danh mục cha không thể trùng với danh mục hiện tại" });
      }

      const hasChildren = await Category.exists({ parentId: data._id });
      if (hasChildren && data.parentId) {
        return formatResponse(res, 400, { message: "Danh mục không thể thay đổi danh mục cha khi đã có danh mục con" });
      }

      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });

      if (!updatedCategory) {
        return formatResponse(res, 404, { message: "Danh mục không tồn tại" });
      }

      formatResponse(res, 200, {
        message: "Cập nhật danh mục thành công",
        category: updatedCategory,
      });
    } catch (error) {
      formatResponse(res, 500, { message: "Lỗi khi cập nhật danh mục" });
      console.error("Lỗi khi gọi update:", error);
    }
  }

  async delete(req, res) {
    try {
      const hasChildren = await Category.exists({ parentId: req.params.id });
      if (hasChildren) {
        return formatResponse(res, 400, { message: "Danh mục không thể xóa khi đã có danh mục con" });
      }

      const deletedCategory = await Category.findByIdAndDelete(req.params.id);

      if (!deletedCategory) {
        return formatResponse(res, 404, { message: "Danh mục không tồn tại" });
      }

      formatResponse(res, 200, {
        message: "Xóa danh mục thành công",
        category: deletedCategory,
      });
    } catch (error) {
      formatResponse(res, 500, { message: "Lỗi khi xóa danh mục" });
      console.error("Lỗi khi gọi delete:", error);
    }
  }
}

export default new CategoryController();
