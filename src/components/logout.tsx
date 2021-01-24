import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Box } from "@chakra-ui/react";

export default function LogoutButton() {
  const history = useHistory();
  let isAuthenticated = !!Cookies.get("accessToken");

  const handleLogout = async () => {
    Cookies.remove("accessToken");
    localStorage.clear();
    console.log("removed cookies");
  };

  const redirect = async () => {
    console.log("pre handleLogout");
    await handleLogout();
    console.log("post handleLogout");
    history.push("/login");
  };

  return (
    <Box py={2}>
      {isAuthenticated && (
        <Button mr="4" onClick={redirect}>
          Logout
        </Button>
      )}
    </Box>
  );
}
