import { z } from "zod";

const create = z.object({
  name: z.string().trim().min(1).max(100),
  isStatus: z.int().min(0).max(1).default(0),
});

const update = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  isStatus: z.int().min(0).max(1).optional(),
});

export default {
  create,
  update,
};
