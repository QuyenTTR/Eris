import { z } from "zod";

const create = z.object({
  name: z.string().min(2).max(50).trim(),
  isStatus: z.int().min(0).default(0),
});

const update = z.object({
  name: z.string().min(2).max(50).trim().optional(),
  isStatus: z.int().min(0).max(1).optional(),
});

export default {
  create,
  update,
};
