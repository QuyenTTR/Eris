import { useState } from "react";
import { useNavigate } from "react-router";

function useAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return { loading, setLoading, navigate };
}

export default useAuth;
