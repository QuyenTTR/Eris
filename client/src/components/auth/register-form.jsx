import {
  LockKeyhole,
  LockKeyholeOpen,
  Mail,
  User,
  UserLock,
  LoaderCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/useAuth.store";

const registerSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(1, "Họ và tên không được để trống")
      .max(100),
    email: z.string().trim().email("Email không hợp lệ").max(100),
    username: z
      .string()
      .min(8, "Phải có ít nhất 8 ký tự")
      .max(100)
      .regex(/^[a-zA-Z0-9._]+$/, 'Chỉ gồm chữ cái, số, dấu "." hoặc "_"'),
    password: z.string().min(8, "Phải có ít nhất 8 ký tự").max(100),
    confirmPassword: z.string().min(8, "Phải có ít nhất 8 ký tự").max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

function RegisterForm() {
  const navigate = useNavigate();
  const { registerUser, loading } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data) {
    const { fullname, email, username, password } = data;
    const success = await registerUser({ fullname, email, username, password });
    if (success) {
      navigate("/login");
    }
  }

  return (
    <>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block font-medium text-slate-700">
            Email Của Bạn
          </label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </span>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="VD: example@company.com"
              className="px-10"
            />
          </div>
          {errors.email && (
            <p className="text-destructive mb-1 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="fullname"
            className="block font-medium text-slate-700"
          >
            Họ Và Tên
          </label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-gray-400" />
            </span>
            <Input
              id="fullname"
              {...register("fullname")}
              type="text"
              placeholder="Nhập họ và tên của bạn"
              className="px-10"
            />
          </div>
          {errors.fullname && (
            <p className="text-destructive mb-1 text-sm">
              {errors.fullname.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="username"
            className="block font-medium text-slate-700"
          >
            Tên Đăng Nhập
          </label>

          <div className="relative mt-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <UserLock className="h-5 w-5 text-gray-400" />
            </span>
            <Input
              id="username"
              {...register("username")}
              type="text"
              placeholder="Nhập tên tài khoản để đăng nhập"
              className="px-10"
            />
          </div>
          {errors.username && (
            <p className="text-destructive mb-1 text-sm">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block font-medium text-slate-700"
          >
            Mật Khẩu
          </label>

          <div className="relative mt-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LockKeyholeOpen className="h-5 w-5 text-gray-400" />
            </span>
            <Input
              id="password"
              {...register("password")}
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              className="px-10"
            />
          </div>
          {errors.password && (
            <p className="text-destructive mb-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block font-medium text-slate-700"
          >
            Xác Nhận Mật Khẩu
          </label>

          <div className="relative mt-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LockKeyhole className="h-5 w-5 text-gray-400" />
            </span>
            <Input
              id="confirmPassword"
              {...register("confirmPassword")}
              type="password"
              placeholder="Nhập lại mật khẩu của bạn"
              className="px-10"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive mb-1 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={loading} className="mt-4 h-11 w-full">
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Đăng Ký Tài Khoản"
          )}
        </Button>
      </form>

      {/* <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-sm text-slate-500">or</span>
        </div>
      </div> */}

      <div className="mt-4 text-center">
        <p className="mb-1 text-base">
          Đã có tài khoản?{" "}
          <Link className="text-info font-medium hover:underline" to="/login">
            Đăng Nhập
          </Link>
        </p>
      </div>
    </>
  );
}

export default RegisterForm;
