import Category from "../models/category.model.js";

class CategoryController {
  async getAll(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: -1 });
      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục" });
      console.error("Lỗi khi gọi getAll:", error);
    }
  }

  async create(req, res) {
    try {
      const { name, isStatus, description } = req.body;

      const newCategory = new Category({ name, isStatus, description });
      await newCategory.save();
      res.status(201).json({ message: "Tạo danh mục thành công", category: newCategory });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo danh mục" });
      console.error("Lỗi khi gọi create:", error);
    }
  }

  async update(req, res) {
    try {
      const { name, isStatus, description } = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name, isStatus, description },
        {
          new: true,
        }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Danh mục không tồn tại" });
      }

      res.status(200).json({
        message: "Cập nhật danh mục thành công",
        category: updatedCategory,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật danh mục" });
      console.error("Lỗi khi gọi update:", error);
    }
  }

  async delete(req, res) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);

      if (!deletedCategory) {
        return res.status(404).json({ message: "Danh mục không tồn tại" });
      }

      res.status(200).json({
        message: "Xóa danh mục thành công",
        category: deletedCategory,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa danh mục" });
      console.error("Lỗi khi gọi delete:", error);
    }
  }
}

export default new CategoryController();
