import React from "react";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import LoginForm from "../components/loginForm";

export default function Login() {
  return (
    <ChakraProvider>
      <CSSReset />
      <LoginForm />
    </ChakraProvider>
  );
}
