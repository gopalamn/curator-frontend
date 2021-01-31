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
          color="purple.500"
          onClick={handleNewPost}
          variant="link"
          colorScheme="teal"
        >
          <Text>New Discovery </Text>
          <ArrowForwardIcon w={8} />
        </Button>
      )}
    </Box>
  );
}
