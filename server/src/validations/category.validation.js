import { z } from "zod";

const create = z.object({
  name: z.string().trim().min(1, "Tên danh mục không được để trống").max(100),
  description: z.string().trim().max(500).default(""),
  colorHex: z
    .string()
    .trim()
    .min(1, "Mã màu không được để trống")
    .max(7)
    .regex(/^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}))?$/, "Vui lòng nhập mã màu hợp lệ")
    .toLowerCase()
    .default(""),
  categoryGroupId: z.string().trim().min(1, "Vui lòng chọn nhóm danh mục"),
  isStatus: z.int().min(0).max(1).default(0),
});

const update = z.object({
  name: z.string().trim().min(1, "Tên danh mục không được để trống").max(100).optional(),
  description: z.string().trim().max(500).optional(),
  colorHex: z
    .string()
    .trim()
    .max(7)
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Vui lòng nhập mã màu hợp lệ")
    .toLowerCase()
    .optional(),
  categoryGroupId: z.string().trim().min(1, "Vui lòng chọn nhóm danh mục").optional(),
  isStatus: z.int().min(0).max(1).optional(),
});

export default {
  create,
  update,
};
