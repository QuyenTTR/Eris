import {
  LockKeyhole,
  LockKeyholeOpen,
  Mail,
  User,
  UserLock,
} from "lucide-react";
import { set, z } from "zod";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import authService from "@/services/auth.service";

const signInSchema = z.object({
  login: z.string().trim().max(100),
  password: z.string().min(8, "Phải có ít nhất 8 ký tự").max(100),
});

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function onSubmit(data) {
    setLoading(true);

    authService
      .login(data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Đăng nhập thất bại");
        setLoading(false);
      });
  }

  return (
    <>
      <h1 className="text-center text-3xl font-medium text-slate-900">
        Đăng Nhập
      </h1>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="login" className="block font-medium text-slate-700">
            Tên Đăng Nhập
          </label>

          <div className="relative mt-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <UserLock className="h-5 w-5 text-gray-400" />
            </span>
            <Input
              id="login"
              {...register("login")}
              type="text"
              required
              placeholder="Nhập tên tài khoản để đăng nhập"
              className="px-10"
            />
          </div>
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
              required
              placeholder="Nhập mật khẩu của bạn"
              className="px-10"
            />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="mt-4 h-11 w-full">
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
        <p className="mb-1 text-base">
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

export default Login;
