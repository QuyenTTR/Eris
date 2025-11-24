import CategoryGroup from "../models/categoryGroup.model.js";

class CategoryGroupController {
  async getAll(req, res) {
    try {
      const categoryGroups = await CategoryGroup.find().sort({ createdAt: -1 });
      res.status(200).json({ categoryGroups });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách nhóm danh mục" });
      console.error("Lỗi khi gọi getAll:", error);
    }
  }

  async create(req, res) {
    try {
      const { name, isStatus, description } = req.body;
      const newCategoryGroup = new CategoryGroup({ name, isStatus, description });
      await newCategoryGroup.save();

      res.status(201).json({ message: "Tạo nhóm danh mục thành công", newCategoryGroup });
    } catch (error) {
      res.status(500).json({ message: "Lỗi tạo nhóm danh mục" });
      console.error("Lỗi khi gọi create:", error);
    }
  }

  async update(req, res) {
    try {
      const data = req.body;

      const updatedCategoryGroup = await CategoryGroup.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });

      if (!updatedCategoryGroup) {
        return res.status(404).json({ message: "Nhóm danh mục không tồn tại" });
      }

      res.status(200).json({
        message: "Cập nhật nhóm danh mục thành công",
        categoryGroup: updatedCategoryGroup,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật nhóm danh mục" });
      console.error("Lỗi khi gọi update:", error);
    }
  }

  async delete(req, res) {
    try {
      const deletedCategoryGroup = await CategoryGroup.findByIdAndDelete(req.params.id);
      if (!deletedCategoryGroup) {
        return res.status(404).json({ message: "Nhóm danh mục không tồn tại" });
      }
      res.status(200).json({
        message: "Xóa nhóm danh mục thành công",
        categoryGroup: deletedCategoryGroup,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa nhóm danh mục" });
      console.error("Lỗi khi gọi delete:", error);
    }
  }
}

export default new CategoryGroupController();
