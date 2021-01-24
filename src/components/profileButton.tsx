import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Box } from "@chakra-ui/react";

export default function ProfileButton() {
  const history = useHistory();
  let isAuthenticated = !!Cookies.get("accessToken");
  let username = localStorage.getItem("username");

  const handleProfile = () => {
    history.push(`/p/${username}`);
  };

  return (
    <Box py={2}>
      {isAuthenticated && (
        <Button mr="4" onClick={handleProfile}>
          Profile
        </Button>
      )}
    </Box>
  );
}
