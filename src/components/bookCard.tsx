import React, { Component } from "react";
import { Box, Image, Link } from "@chakra-ui/react";

type Props = {
  book: any;
};

class BookCard extends Component<Props> {
  render() {
    let book = this.props.book;
    return (
      <Link href={book.link} isExternal>
        <Box
          height="40vh"
          width="22.5vh"
          maxW="40vw"
          maxH="71.11vw"
          margin="auto"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image
            src={book.cover_img}
            alt={`${book.title} cover image`}
            objectFit="cover"
            w="35vw"
            h="30vh"
          />
          <Box p="2">
            <Box as="h6" lineHeight="" fontSize="sm" noOfLines={2} isTruncated>
              {book.title}
            </Box>
          </Box>
        </Box>
      </Link>
    );
  }
}

export default BookCard;
