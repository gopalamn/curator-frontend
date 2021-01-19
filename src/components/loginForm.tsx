import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  createStandaloneToast,
} from "@chakra-ui/react";
import API from "../api";
import Cookies from "js-cookie";
import ThemeSelector from "./themeSelector";
import { useHistory } from "react-router-dom";

export default function LoginApp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const VARIANT_COLOR = "teal";
  let api = API();
  const history = useHistory();

  const authenticate = async () => {
    return new Promise<void>((resolve, reject) => {
      api.authenticate(email, password).then((response: any) => {
        if (response.ok) {
          // Send success alert
          const toast = createStandaloneToast();
          toast({
            title: "Success!",
            description: "You're logged in.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          const token = response.data.access_token;
          api.setAccessToken(token);
          Cookies.set("accessToken", token, { expires: 60 });
          localStorage.setItem("user", JSON.stringify(response.data));
          resolve(response.data.username);
        } else {
          reject();
        }
      });
    });
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    if (email === "" || password === "") {
      const toast = createStandaloneToast();
      toast({
        title: "An error occured.",
        description: "Please enter an email and password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      try {
        // Wait for authentication and then redirect to
        // /p/username profile
        await authenticate().then((data) => {
          setIsLoading(false);
          history.push(`/p/${data}`);
        });
      } catch (error) {
        const toast = createStandaloneToast();
        toast({
          title: "An error occured.",
          description: "Email or password is incorrect.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setError("Invalid email or password");
        setEmail("");
        setPassword("");
        setIsLoading(false);
      }
    }
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
        <Box p={4}>
          <Box textAlign="center">
            <Heading>Sign In to Your Account</Heading>
          </Box>
          <Box my={8} textAlign="left">
            <form onSubmit={handleLogin}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
              <Button
                isLoading={isLoading}
                type="submit"
                colorScheme={VARIANT_COLOR}
                width="full"
                mt={4}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
