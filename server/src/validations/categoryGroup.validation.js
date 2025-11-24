import { z } from "zod";

const create = z.object({
  name: z.string().trim().min(1, "Tên nhóm danh mục không được để trống").max(100),
  isStatus: z.int().min(0).max(1).default(0),
  description: z.string().trim().max(500).default(""),
});

const update = z.object({
  name: z.string().trim().min(1, "Tên nhóm danh mục không được để trống").max(100).optional(),
  isStatus: z.int().min(0).max(1).optional(),
  description: z.string().trim().max(500).optional(),
});

export default {
  create,
  update,
};
