function AuthLayout({ children }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="shadow-soft min-w-[32rem] rounded-lg border border-slate-200 bg-white p-12">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
