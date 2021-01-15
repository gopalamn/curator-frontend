import * as React from "react";
import logo from "./logo.svg";
import { Box, Button, Flex } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import themeSelector from "./components/themeSelector";
import ThemeSelector from "./components/themeSelector";

function App() {
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    history.push("/login");
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <ThemeSelector />
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
    </Flex>
  );
}

export default App;
