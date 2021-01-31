import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import LogoutButton from "./logout";
import ThemeSelector from "./themeSelector";
import { useHistory, useLocation } from "react-router-dom";
import ProfileButton from "../components/profileButton";
import Cookies from "js-cookie";
import ProfileMenu from "./profileMenu";

export default function NavHeader() {
  // TODO: Only show logout when on your own profile page, everywhere else
  // show a profile button instead

  let location = useLocation();
  let username = localStorage.getItem("username");
  let isAuthenticated = !!Cookies.get("accessToken");
  let isUserProfile = false;
  let history = useHistory();

  if (location.pathname === `/p/${username}`) {
    isUserProfile = true;
  }

  const handleLogin = () => {
    history.push("/login");
  };

  const LoginButton = () => {
    let isLoginScreen = false;
    if (location.pathname === "/login") {
      isLoginScreen = true;
    }
    return (
      <Box py={2}>
        {!isLoginScreen && (
          <Button mr="4" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Flex>
      <Box p="2">
        <Heading
          bgClip="text"
          bgGradient="linear(to-l, #DD5E89, #F7bb97)"
          size="xl"
        >
          Curator
        </Heading>
      </Box>
      <Spacer />
      {!isAuthenticated && <LoginButton />}
      <ProfileMenu />
      {/* {isUserProfile ? <LogoutButton /> : <ProfileButton />} */}
      <ThemeSelector />
    </Flex>
  );
}
