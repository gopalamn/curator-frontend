import React from "react";
import { Container } from "@chakra-ui/react";
import LoginForm from "../components/loginForm";
import SignUp from "../components/signUpForm";
import NavHeader from "../components/navHeader";

export default function SignUpApp() {
  return (
    <Container>
      <NavHeader />
      <SignUp />
    </Container>
  );
}
