import { z } from "zod";

const signUp = z
  .object({
    fullname: z.string().trim().min(1, "Vui lòng nhập tên").max(100),
    email: z.string().trim().email("Vui lòng nhập email hợp lệ").max(100),
    username: z
      .string()
      .min(8, "Tên đăng nhập phải có ít nhất 8 ký tự")
      .max(100)
      .regex(/^[a-zA-Z0-9._]+$/),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").max(100),
  })
  .strip();

const signIn = z
  .object({
    login: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập tên đăng nhập hoặc email")
      .max(100)
      .regex(/^[^\s]+$/),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").max(100),
  })
  .strip();

export default {
  signUp,
  signIn,
};
