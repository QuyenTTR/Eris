import { LockKeyholeOpen, UserLock } from "lucide-react";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/useAuth.store";

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Tên đăng nhập không được để trống")
    .max(100),
  password: z.string().min(8, "Phải có ít nhất 8 ký tự").max(100),
});

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { loginUser, loading } = useAuthStore();

  async function onSubmit(data) {
    const { username, password } = data;
    const success = await loginUser({ login: username, password });
    if (success) {
      navigate("/");
    }
  }

  return (
    <>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              className="selection:bg-info h-11 px-10 md:text-base"
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
              className="selection:bg-info h-11 px-10 md:text-base"
            />
          </div>
          {errors.password && (
            <p className="text-destructive mb-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="mt-4 h-11 w-full text-base"
        >
          Đăng Nhập
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
        <p className="mb-1 md:text-base">
          Chưa có tài khoản?{" "}
          <Link
            className="text-info font-medium hover:underline"
            to="/register"
          >
            Đăng Ký
          </Link>
        </p>
      </div>
    </>
  );
}

export default LoginForm;
