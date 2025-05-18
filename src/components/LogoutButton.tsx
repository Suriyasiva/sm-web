import { Button } from "@chakra-ui/react";
import useAuthStore from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { Routes } from "../constants/Routes";

const LogoutButton = () => {
  const authStore = useAuthStore();

  const navigate = useNavigate();

  function handleLogout() {
    navigate(Routes.guest.dashboard);
    authStore.logout();
  }

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
