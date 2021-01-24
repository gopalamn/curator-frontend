import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function NotFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100px"
      width="100%"
    >
      <Text>😅 Oops! Page not found.</Text>
    </Box>
  );
}
