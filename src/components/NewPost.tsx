import { Button, Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export default function NewPost() {
  let isAuthenticated = !!Cookies.get("accessToken");
  const history = useHistory();

  const handleNewPost = () => {
    history.push("/newPostCategory");
  };

  return (
    <Box mb={4} position="relative">
      {isAuthenticated && (
        <Button onClick={handleNewPost} colorScheme="teal">
          New Discovery
        </Button>
      )}
    </Box>
  );
}
