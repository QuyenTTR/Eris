import { z } from "zod";

const signUp = z.object({
  fullname: z.string().trim().min(1, "Tên không được để trống").max(100),
  email: z.string().trim().email("Vui lòng nhập email hợp lệ").max(100),
  username: z
    .string()
    .min(8, "Tên đăng nhập phải có ít nhất 8 ký tự")
    .max(100)
    .regex(/^[a-zA-Z0-9._]+$/),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").max(100),
});

const signIn = z.object({
  login: z
    .string()
    .trim()
    .min(1, "Tên đăng nhập không được để trống")
    .max(100)
    .regex(/^[^\s]+$/),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").max(100),
});

export default {
  signUp,
  signIn,
};
