import React from "react";
import { Container } from "@chakra-ui/react";
import LoginForm from "../components/loginForm";
import NavHeader from "../components/navHeader";

export default function Login() {
  return (
    <Container>
      <NavHeader />
      <LoginForm />
    </Container>
  );
}
