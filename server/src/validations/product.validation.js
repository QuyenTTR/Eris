import { z } from "zod";

const create = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên sản phẩm").max(100),
  description: z.string().trim().max(500).default(""),
  imageUrl: z.string().trim().min(1, "Vui lòng nhập URL hình ảnh").max(500),
  isStatus: z.int().min(0).max(1).default(0),
  price: z.number().min(0, "Giá sản phẩm không được nhỏ hơn 0"),
  unit: z.string().trim().min(1, "Vui lòng nhập đơn vị tính").max(100),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
});

const update = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên sản phẩm").max(100).optional(),
  description: z.string().trim().max(500).optional(),
  imageUrl: z.string().trim().min(1, "Vui lòng nhập URL hình ảnh").max(500).optional(),
  isStatus: z.int().min(0).max(1).optional(),
  price: z.number().min(0, "Giá sản phẩm không được nhỏ hơn 0").optional(),
  unit: z.string().trim().min(1, "Vui lòng nhập đơn vị tính").max(100).optional(),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục").optional(),
});

export default {
  create,
  update,
};
