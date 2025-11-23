import useAuthStore from "@/stores/useAuth.store";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
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
    return <div>Đang tải...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
