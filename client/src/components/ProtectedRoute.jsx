import Loading from "@/pages/Loading";
import useAuthStore from "@/stores/useAuth.store";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { accessToken, refresh, user, loading, getMe } = useAuthStore();
  const [starting, setStarting] = useState(true);

  function init() {
    if (!accessToken) {
      refresh();
    }
    if (accessToken && !user) {
      getMe();
    }
    setStarting(false);
  }

  useEffect(() => {
    init();
  }, []);

  if (loading || starting) {
    return <Loading />;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
