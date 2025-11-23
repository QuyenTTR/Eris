import { useNavigate } from "react-router";

import { Button } from "../ui/button";
import useAuthStore from "@/stores/useAuth.store";

function LogoutButton(props) {
  const navigate = useNavigate();
  const { logoutUser } = useAuthStore();

  async function handleLogout() {
    await logoutUser();
    navigate("/login");
  }

  return (
    <Button {...props} onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
}

export default LogoutButton;
