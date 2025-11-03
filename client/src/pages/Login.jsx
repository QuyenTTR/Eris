import {
  LockKeyhole,
  LockKeyholeOpen,
  Mail,
  User,
  UserLock,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Login() {
  return (
    <>
      <h1 className="text-center text-3xl font-medium text-slate-900">
        Đăng Nhập
      </h1>

      <form className="mt-6 space-y-4">
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
              name="username"
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
              name="password"
              type="password"
              required
              placeholder="Nhập mật khẩu của bạn"
              className="px-10"
            />
          </div>
        </div>
        <Button type="submit" className="mt-4 h-11 w-full">
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
