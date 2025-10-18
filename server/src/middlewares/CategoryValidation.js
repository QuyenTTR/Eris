import Category from "../models/category.js";
import formatResponse from "../helpers/formatResponse.js";

async function CategoryValidation(req, res, next) {
  const data = req.body;
  data.name = data.name.trim();

  if (!data.name || typeof data.name !== "string") {
    return formatResponse(res, 400, { message: "Tên danh mục không được để trống" });
  }
  if (data.name.length > 50) {
    return formatResponse(res, 400, { message: "Tên danh mục không được vượt quá 50 ký tự" });
  }
  if (data.parentId) {
    const parentCategory = await Category.findById(data.parentId);
    if (!parentCategory) {
      return formatResponse(res, 400, { message: "Danh mục cha không tồn tại" });
    }
    if (parentCategory.parentId) {
      return formatResponse(res, 400, { message: "Chỉ được tạo danh mục con cấp 1" });
    }
  }

  next();
}

export default CategoryValidation;
