import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Box } from "@chakra-ui/react";

export default function ProfileButton() {
  let isAuthenticated = !!Cookies.get("accessToken");
  let username = localStorage.getItem("username");

  return (
    <Box py={2}>
      {isAuthenticated && (
        <Link to={`/p/${username}`}>
          <Button mr="4">Profile</Button>
        </Link>
      )}
    </Box>
  );
}
