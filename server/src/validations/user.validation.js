import { z } from "zod";

const signUp = z.object({
  fullname: z.string().min(2).max(50).trim(),
  email: z.string().trim().email(),
  username: z.string().min(8).max(30).trim(),
  password: z.string().min(8).max(100),
});

export default {
  signUp,
};
