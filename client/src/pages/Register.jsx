import RegisterForm from "@/components/ui/auth/register-form";

function Register({ title }) {
  return (
    <>
      <h1 className="text-center text-3xl font-medium text-slate-900">
        {title}
      </h1>
      <RegisterForm />
    </>
  );
}

export default Register;
