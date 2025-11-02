import { z } from "zod";

const signUp = z.object({
  fullname: z.string().trim().min(2).max(50),
  email: z.string().trim().email(),
  username: z
    .string()
    .min(8)
    .max(30)
    .regex(/^[a-zA-Z0-9._]+$/),
  password: z.string().min(8).max(100),
});

const signIn = z.object({
  login: z
    .string()
    .trim()
    .min(8)
    .max(30)
    .regex(/^[^\s]+$/),
  password: z.string().min(8).max(100),
});

export default {
  signUp,
  signIn,
};
