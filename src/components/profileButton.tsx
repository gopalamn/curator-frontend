import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Box } from "@chakra-ui/react";

export default function ProfileButton() {
  const history = useHistory();
  let isAuthenticated = !!Cookies.get("accessToken");
  let username = localStorage.getItem("username");

  const handleProfile = () => {
    // I really need to start using redux...
    let username = localStorage.getItem("username");
    let user_id = localStorage.getItem("user_id");
    localStorage.clear();
    if (username) localStorage.setItem("username", username);
    if (user_id) localStorage.setItem("user_id", user_id);
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
