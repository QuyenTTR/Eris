import { z } from "zod";

const create = z.object({
  name: z.string().trim().min(1, "Tên danh mục không được để trống").max(100),
  isStatus: z.int().min(0).max(1).default(0),
});

const update = z.object({
  name: z.string().trim().min(1, "Tên danh mục không được để trống").max(100),
  isStatus: z.int().min(0).max(1),
});

export default {
  create,
  update,
};
