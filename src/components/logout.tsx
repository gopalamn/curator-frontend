import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Box } from "@chakra-ui/react";

export default function LogoutButton() {
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    localStorage.clear();
    history.push("/login");
  };

  return (
    <Box textAlign="right" py={4}>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
}
