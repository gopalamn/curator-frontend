import { Button, Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useHistory, useLocation } from "react-router-dom";

export default function NewPost() {
  let isAuthenticated = !!Cookies.get("accessToken");
  const history = useHistory();
  let location = useLocation();
  let username = localStorage.getItem("username");
  let isUserProfile = false;

  if (location.pathname === `/p/${username}`) {
    isUserProfile = true;
  }

  const handleNewPost = () => {
    history.push("/newPostCategory");
  };

  return (
    <Box mb={4} position="relative">
      {isAuthenticated && isUserProfile && (
        <Button onClick={handleNewPost} colorScheme="teal">
          New Discovery
        </Button>
      )}
    </Box>
  );
}
