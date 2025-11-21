function AuthLayout({ children, title }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="shadow-soft min-w-[32rem] rounded-lg border border-slate-200 bg-white p-12">
        <h1 className="text-center text-3xl font-medium text-slate-900">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
