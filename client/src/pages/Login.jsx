import LoginForm from "@/components/ui/auth/login-form";

function Login({ title }) {
  return (
    <>
      <h1 className="text-center text-3xl font-medium text-slate-900">
        {title}
      </h1>
      <LoginForm />
    </>
  );
}

export default Login;
