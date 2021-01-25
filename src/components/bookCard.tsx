import React, { Component } from "react";
import { Box, Image, Link } from "@chakra-ui/react";

type Props = {
  book: any;
};

class BookCard extends Component<Props> {
  render() {
    let book = this.props.book;
    // Helps with jumpiness on mobile Chrome instead of using vh
    let jsvh = window.innerHeight * 0.01;

    return (
      <Link href={book.link} isExternal>
        <Box
          // height="40vh"
          height={jsvh * 40}
          // width="20vh"
          width={jsvh * 20}
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
            w="100%"
            h="80%"
          />
          <Box p="2" h="20%">
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
