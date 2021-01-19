import React from "react";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";

export default function Category() {
  return (
    <ChakraProvider>
      <CSSReset />
    </ChakraProvider>
  );
}
