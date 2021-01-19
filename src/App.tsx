import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";
import ThemeSelector from "./components/themeSelector";
import LogoutButton from "./components/logout";

function App() {
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        boxShadow="lg"
      >
        <LogoutButton />
        <ThemeSelector />
      </Box>
    </Flex>
  );
}

export default App;
