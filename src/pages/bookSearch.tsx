import {
  Box,
  chakra,
  ChakraProvider,
  Container,
  createStandaloneToast,
  CSSReset,
  FormControl,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NavHeader from "../components/navHeader";
import API from "../api";
import { SearchIcon } from "@chakra-ui/icons";
import BookCard from "../components/bookCard";

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const api = API();

  const searchBooks = async () => {
    return api.searchVolumes(query).then((response: any) => {
      console.log(response);

      let booksList: any = [];
      response.data.items.forEach((element: any) => {
        let book = {
          book_api_id: element.id,
          title: element.volumeInfo.title,
          cover_img: element.volumeInfo.imageLinks.thumbnail,
          link: element.volumeInfo.infoLink,
        };
        booksList.push(book);
      });

      setBooks(booksList);
    });
  };

  const handleSearch = async (event: any) => {
    event.preventDefault();
    if (query !== "") {
      setIsLoading(true);
      try {
        await searchBooks().then(() => {
          setIsLoading(false);
          console.log(books);
        });
      } catch (error) {
        console.warn(error);
        const toast = createStandaloneToast();
        toast({
          title: "An error occured.",
          description: "Invalid search. Please try again!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    }
  };

  function renderBooks() {
    let bookCardList: any = [];
    books.forEach((element: any) => {
      bookCardList.push(<BookCard key={element.id} book={element} />);
    });

    return (
      <Box>
        <Skeleton isLoaded={!isLoading}>
          <SimpleGrid columns={[2, null, null, 3]} spacing={4}>
            {bookCardList}
          </SimpleGrid>
        </Skeleton>
      </Box>
    );
  }

  return (
    <Container>
      <NavHeader />
      <Box
        d="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        minHeight="40vh"
        mb={4}
      >
        <Heading p={10} textAlign="center">
          🤔 What did you discover?
        </Heading>
        <form onSubmit={handleSearch}>
          <Box d="flex" flexDirection="row">
            <FormControl>
              <Input
                w="60vw"
                maxW="450px"
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
      {renderBooks()}
    </Container>
  );
}
