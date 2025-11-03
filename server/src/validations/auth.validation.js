import { z } from "zod";

const signUp = z.object({
  fullname: z.string().trim().min(4).max(100),
  email: z.string().trim().email().max(100),
  username: z
    .string()
    .min(8)
    .max(100)
    .regex(/^[a-zA-Z0-9._]+$/),
  password: z.string().min(8).max(100),
});

const signIn = z.object({
  login: z
    .string()
    .trim()
    .min(8)
    .max(100)
    .regex(/^[^\s]+$/),
  password: z.string().min(8).max(100),
});

export default {
  signUp,
  signIn,
};
