import { Link } from "react-router";

function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-7xl font-extrabold tracking-tight">404</h1>
        <h2 className="mb-2 text-2xl font-semibold">Không tìm thấy trang</h2>
        <p className="mb-6 text-slate-400">
          Hình như bạn đi lạc rồi… Trang bạn yêu cầu không tồn tại hoặc đã bị
          xoá.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-xl border border-slate-700 px-4 py-2 transition hover:bg-slate-800"
          >
            ⬅ Quay về trang chủ
          </Link>
          <Link
            to="/dashboard"
            className="rounded-xl bg-sky-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-sky-600"
          >
            Đi tới dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
