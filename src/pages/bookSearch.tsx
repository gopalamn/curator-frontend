import {
  Box,
  chakra,
  ChakraProvider,
  Container,
  CSSReset,
  FormControl,
  Heading,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NavHeader from "../components/navHeader";
import API from "../api";
import { SearchIcon } from "@chakra-ui/icons";

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const api = API();

  const searchBooks = async () => {
    return api.searchVolumes(query).then((response: any) => {
      console.log(response);
    });
  };

  const handleSearch = async (event: any) => {
    event.preventDefault();
    if (query !== "") {
      setIsLoading(true);
      try {
        await searchBooks().then(() => {
          setIsLoading(false);
        });
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const renderBooks = async () => {
    return;
  };

  return (
    <Container>
      <NavHeader />
      <Box
        d="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        minHeight="70vh"
      >
        <Heading p={10} textAlign="center">
          🤔 What did you discover?
        </Heading>
        <form onSubmit={handleSearch}>
          <Box d="flex" flexDirection="row">
            <FormControl>
              <Input
                width="50vw"
                variant="flushed"
                placeholder="Search for a book"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </FormControl>
            <IconButton
              variant="ghost"
              type="submit"
              isLoading={isLoading}
              aria-label="Search"
              icon={<SearchIcon />}
            />
          </Box>
        </form>
      </Box>
    </Container>
  );
}
