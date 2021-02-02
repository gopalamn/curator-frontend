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
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import API from "../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const VARIANT_COLOR = "purple";
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
          console.log(response.data);
          Cookies.set("accessToken", token, { expires: 60 });
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("profile_pic", response.data.profile_pic);
          localStorage.setItem(
            "fullname",
            response.data.firstname + " " + response.data.lastname
          );
          resolve(response.data.username);
        } else {
          reject();
        }
      });
    });
  };

  const createUser = async () => {
    return new Promise<void>((resolve, reject) => {
      api
        .addUser(email, username, password, firstname, lastname)
        .then((response: any) => {
          if (response.ok) {
            resolve();
          } else {
            reject();
          }
        });
    });
  };

  const handleSignUp = async (event: any) => {
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
        // Wait for create user and authentication and then redirect to
        // /p/username profile
        await createUser().then(() => {
          authenticate().then((data) => {
            setIsLoading(false);
            history.push(`/p/${data}`);
          });
        });
      } catch (error) {
        const toast = createStandaloneToast();
        toast({
          title: "An error occured.",
          description: "Please try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <Flex minHeight="80vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
        pt={4}
      >
        <Box p={4}>
          <Box textAlign="center">
            <Heading>Create an Account</Heading>
          </Box>
          <Box my={8} textAlign="left">
            <form onSubmit={handleSignUp}>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Username</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="curator.com/" />
                  <Input
                    type="text"
                    placeholder="Enter a username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl d="flex" flexDir="row" isRequired mt={4}>
                <Box mr={4}>
                  <FormLabel>Firstname</FormLabel>
                  <Input
                    placeholder="Enter your firstname"
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
                  />
                </Box>
                <Box ml={4}>
                  <FormLabel>Lastname</FormLabel>
                  <Input
                    placeholder="Enter your lastname"
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
                  />
                </Box>
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter a password"
                  isInvalid={!!(password !== confirmPassword)}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  isInvalid={!!(password !== confirmPassword)}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </FormControl>

              <Button
                isLoading={isLoading}
                type="submit"
                colorScheme={VARIANT_COLOR}
                width="full"
                mt={4}
              >
                Create Account
              </Button>
            </form>
          </Box>
          <Button
            onClick={() => history.push("/login")}
            mt={-5}
            fontSize="sm"
            textAlign="center"
            variant="link"
          >
            Sign in to Curator
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
