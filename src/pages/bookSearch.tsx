import {
  Box,
  Button,
  Circle,
  Container,
  createStandaloneToast,
  FormControl,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NavHeader from "../components/navHeader";
import API from "../api";
import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import BookCard from "../components/bookCard";
import { useHistory } from "react-router";

export default function BookSearch() {
  interface bookCart {
    [key: string]: any;
  }

  const [query, setQuery] = useState("");
  const [isSearchLoading, setisSearchLoading] = useState(false);
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [cartBooks, setCartBooks] = useState<bookCart>({});

  // Used to get around problems with useEffect detecting
  // dictionary changes in cartBooks.
  const [countCartBooks, setCountCartBooks] = useState(0);
  const history = useHistory();
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
          linkActive: false,
        };
        booksList.push(book);
      });

      setBooks(booksList);
    });
  };

  const handleSearch = async (event: any) => {
    event.preventDefault();
    if (query !== "") {
      setisSearchLoading(true);
      try {
        await searchBooks().then(() => {
          setisSearchLoading(false);
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
        setisSearchLoading(false);
      }
    }
  };

  const handleBookSelect = (event: any, element: any) => {
    let existingBookList: { [index: string]: any } = cartBooks;

    // Create visual checkmark
    const checkmarkObj = document.getElementById(
      element.book_api_id + "checkmark"
    );
    if (checkmarkObj && !event.target.checked) {
      checkmarkObj.style.display = "none";
      if (existingBookList[element.book_api_id]) {
        delete existingBookList[element.book_api_id];
      }
    } else if (checkmarkObj && event.target.checked) {
      checkmarkObj.style.display = "block";
      if (!existingBookList[element.book_api_id]) {
        existingBookList[element.book_api_id] = element;
      }
    }

    setCartBooks(existingBookList);

    // console.log(cartBooks);
  };

  function renderBooks() {
    let bookCardList: any = [];
    // console.log(cartBooks)

    books.forEach((element: any) => {
      let isChecked = false;

      if (cartBooks[element.book_api_id] !== undefined) {
        isChecked = true;
      }

      bookCardList.push(
        <Skeleton key={element.book_api_id} isLoaded={!isSearchLoading}>
          <Box display="none">
            <input
              checked={isChecked}
              type="checkbox"
              id={element.book_api_id}
              onChange={(event: any) => {
                handleBookSelect(event, element);

                if (event.target.checked) {
                  // localStorage.setItem(
                  //   element.book_api_id + "checked",
                  //   event.target.checked
                  // );
                  setCountCartBooks(countCartBooks + 1);
                } else if (!event.target.checked) {
                  // localStorage.removeItem(element.book_api_id + "checked");
                  setCountCartBooks(countCartBooks - 1);
                }
              }}
            />
          </Box>
          <label htmlFor={element.book_api_id}>
            <Box
              d="table"
              borderRadius="lg"
              position="relative"
              overflow="hidden"
            >
              <Box
                display={isChecked ? "block" : "none"}
                id={element.book_api_id + "checkmark"}
              >
                <Box
                  position="absolute"
                  bg="green.200"
                  top="-10%"
                  right="-30%"
                  borderRadius="lg"
                  w={20}
                  h={50}
                  transform="rotate(45deg)"
                >
                  <CheckIcon
                    color="black"
                    position="absolute"
                    top="60%"
                    right="35%"
                    transform="rotate(-45deg)"
                  />
                </Box>
              </Box>
              <BookCard book={element} />
            </Box>
          </label>
        </Skeleton>
      );
    });

    return (
      <Box>
        <SimpleGrid columns={[2, 3, 3, 3]} spacing={4}>
          {bookCardList}
        </SimpleGrid>
      </Box>
    );
  }

  const handleDone = (event: any) => {
    setIsDoneLoading(true);
    // Prepare data structure for api request
    let iterateBooks: { [index: string]: any } = cartBooks;
    let checkoutBooks: any = [];
    Object.entries(iterateBooks).forEach((value: { [index: string]: any }) => {
      delete value[1]["linkActive"];
      let book = {
        book_api_id: value[1].book_api_id,
        title: value[1].title,
        cover_img: value[1].cover_img,
        link: value[1].link,
      };
      // localStorage.removeItem(value[1].book_api_id + "checked");
      setCountCartBooks(0);
      const checkmarkObj = document.getElementById(
        value[1].book_api_id + "checkmark"
      );
      if (checkmarkObj) checkmarkObj.style.display = "none";
      checkoutBooks.push(book);
    });
    // console.log(checkoutBooks)
    // Make api request
    api
      .addIndividualBooks(checkoutBooks)
      .then((response: any) => {
        if (response.ok) {
          let username = localStorage.getItem("username");
          history.push(`/p/${username}`);
        }
        // Didn't do setIsDoneLoading(false) here because causes memory leak
      })
      .catch((error: any) => {
        console.warn(error);
        const toast = createStandaloneToast();
        toast({
          title: "An error occured.",
          description: "Please make selections and try again!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsDoneLoading(false);
      });
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
        minHeight="50%"
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
              isLoading={isSearchLoading}
              aria-label="Search"
              icon={<SearchIcon />}
            />
          </Box>
        </form>
        <Box mt="4" position="relative">
          {countCartBooks !== 0 && (
            <Circle
              color="black"
              top="-10%"
              right="-10%"
              position="absolute"
              size={5}
              bg="green.200"
              zIndex="1"
            >
              <Text fontSize="xs" fontWeight="semibold">
                {countCartBooks}
              </Text>
            </Circle>
          )}
          <Button isLoading={isDoneLoading} onClick={handleDone}>
            Done
          </Button>
        </Box>
      </Box>
      {renderBooks()}
    </Container>
  );
}
