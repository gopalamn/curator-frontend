import { ChevronRightIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  createStandaloneToast,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Text,
  useTimeout,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import NavHeader from "../components/navHeader";
import API from "../api";
import LinkCard from "../components/linkCard";

// TODO: Need to figure out how to only run a function after a user's done typing

export default function MediumChoice() {
  const history = useHistory();
  const [link, setLink] = useState("");
  const [isSearchForVisible, setIsSearchForVisible] = useState(true);
  const [isLinkPreviewLoading, setIsLinkPreviewLoading] = useState(false);
  const [linkObj, setLinkObj] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const api = API();

  useEffect(() => {
    if (link.length === 0) {
      setIsSearchForVisible(true);
    } else {
      setIsSearchForVisible(false);
    }
  }, [link]);

  const handleBook = () => {
    history.push("/bookSearch");
  };

  const handleShowClick = () => {
    setShowPreview(true);
    handleLinkFetch(link);
  };

  async function handleLinkSubmit(event: any) {
    event.preventDefault();

    if (link === "") {
      const toast = createStandaloneToast();
      toast({
        title: "An error occured.",
        description: "Please enter a link!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    handleLinkFetch(link);
    // console.log(linkObj)
    api.addLinkPost(linkObj).then((response: any) => {
      if (response.ok) {
        let username = localStorage.getItem("username");
        history.push(`/p/${username}`);
      } else {
        const toast = createStandaloneToast();
        toast({
          title: "An error occured.",
          description: "Your link doesn't seem to be secure!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  }

  function handleLinkFetch(linkParam: any) {
    // console.log(linkParam)
    api
      .linkPreview(linkParam)
      .then((response: any) => {
        // console.log(response)

        if (response.ok) {
          let shallowLinkObj = {
            link: response.data.link,
            description: response.data.description,
            hostname: response.data.hostname,
            title: response.data.title,
            img: response.data.img,
          };
          setLinkObj(shallowLinkObj);
        }
      })
      .catch((error) => {
        console.warn(error);
        const toast = createStandaloneToast();
        toast({
          title: "An error occured.",
          description: "Invalid link, please try again!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => setIsLinkPreviewLoading(false));
  }

  const handleLinkPaste = async (event: any) => {
    event.preventDefault();
    setIsLinkPreviewLoading(true);
    setLink(event.clipboardData.getData("Text"));
    handleLinkFetch(event.clipboardData.getData("Text"));
  };

  function renderLinkCard() {
    // console.log(linkObj)
    return (
      <Skeleton isLoaded={!isLinkPreviewLoading}>
        {!!showPreview && Object.keys(linkObj).length !== 0 && (
          <LinkCard link={linkObj} />
        )}
      </Skeleton>
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
        minHeight="50%"
        mb={10}
      >
        <Heading p={10} textAlign="center">
          🤔 What did you discover?
        </Heading>
        <form onSubmit={handleLinkSubmit}>
          <Box d="flex" flexDirection="row">
            <FormControl>
              <InputGroup>
                <Input
                  w="60vw"
                  maxW="450px"
                  variant="flushed"
                  placeholder="https://..."
                  value={link}
                  onChange={(event) => setLink(event.target.value)}
                  onPaste={(event) => handleLinkPaste(event)}
                />
                <InputRightElement width={20}>
                  <Button
                    isLoading={isLinkPreviewLoading}
                    size="sm"
                    onClick={handleShowClick}
                  >
                    Show
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                Tip: Click Show to see a preview of the link!
              </FormHelperText>
            </FormControl>
            <IconButton
              variant="ghost"
              type="submit"
              aria-label="Enter"
              icon={<ChevronRightIcon w={30} h={20} />}
            />
          </Box>
        </form>
        <Box textAlign="left" pt={10}>
          {renderLinkCard()}
        </Box>
      </Box>
      <Text
        display={isSearchForVisible ? "block" : "none"}
        textAlign="center"
        textColor="gray.400"
      >
        or
      </Text>
      <Box
        d="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        minHeight="50%"
        mb={4}
        display={isSearchForVisible ? "block" : "none"}
      >
        <Heading pt={10} pb={4} textAlign="center">
          Search for
        </Heading>
        <Box maxW="sm" marginLeft="auto" marginRight="auto">
          <Flex justify="center" pt="2" pr="5%">
            <Link to="/bookSearch">
              <Button mr="2">Books</Button>
            </Link>
            <Button mr="2">Movies</Button>
          </Flex>
          <Flex justify="center" pt="2">
            <Button mr="2">TV Shows</Button>
            <Button mr="2">Songs</Button>
            <Button mr="2">Podcasts</Button>
          </Flex>
        </Box>
      </Box>
    </Container>
  );
}
