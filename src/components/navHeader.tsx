import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import LogoutButton from "./logout";
import ThemeSelector from "./themeSelector";
import { useLocation } from "react-router-dom";
import ProfileButton from "../components/profileButton";

export default function NavHeader() {
  // TODO: Only show logout when on your own profile page, everywhere else
  // show a profile button instead

  let location = useLocation();
  let username = localStorage.getItem("username");
  let isUserProfile = false;

  if (location.pathname === `/p/${username}`) {
    isUserProfile = true;
  }

  return (
    <Flex>
      <Box p="4">
        <Heading size="md">Curator</Heading>
      </Box>
      <Spacer />
      {isUserProfile ? <LogoutButton /> : <ProfileButton />}
      <ThemeSelector />
    </Flex>
  );
}
