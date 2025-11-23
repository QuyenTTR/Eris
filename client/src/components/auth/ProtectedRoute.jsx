import useAuthStore from "@/stores/useAuth.store";
import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
