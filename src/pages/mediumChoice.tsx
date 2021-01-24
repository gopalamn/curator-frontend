import {
  Box,
  Button,
  ChakraProvider,
  Container,
  CSSReset,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import NavHeader from "../components/navHeader";

export default function MediumChoice() {
  const history = useHistory();

  const handleBook = () => {
    history.push("/bookSearch");
  };

  console.log("Came to Medium Choice");

  return (
    <Container>
      <NavHeader />
      <Heading p={4} textAlign="center">
        ✨Pick a category✨
      </Heading>
      <Box maxW="sm" marginLeft="auto" marginRight="auto">
        <Flex justify="center" pt="2" pr="10%">
          <Button mr="2" onClick={handleBook}>
            Book
          </Button>
          <Button mr="2">Movie</Button>
        </Flex>
        <Box>
          <Flex justify="center" pt="2" pl="15%">
            <Button mr="2">Song</Button>
            <Button mr="2">TV Show</Button>
          </Flex>
        </Box>
        <Flex justify="center" pt="2">
          <Button mr="2">Article</Button>
          <Button mr="2">Youtube</Button>
          <Button mr="2">Podcast</Button>
        </Flex>
      </Box>
      <Box pt="10"></Box>
    </Container>
  );
}
