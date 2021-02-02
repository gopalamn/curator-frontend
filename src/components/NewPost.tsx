import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Box, Text } from "@chakra-ui/react";
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
    <Box mb={4} textAlign="left" position="relative">
      {isAuthenticated && isUserProfile && (
        <Button
          // color="purple.500"
          bgGradient="linear(to-r, #7928CA, #DB00FF)"
          bgClip="text"
          onClick={handleNewPost}
          variant="link"
        >
          New Discovery
          <ArrowForwardIcon color="#DB00FF" w={8} />
        </Button>
      )}
    </Box>
  );
}
