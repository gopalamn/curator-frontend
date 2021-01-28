import React, { Component } from "react";
import { Box, Image, Link } from "@chakra-ui/react";

type Props = {
  book: any;
};

// Need book to have properties:
// title, link, linkActive (true/false), cover_img
class BookCard extends Component<Props> {
  book = this.props.book;
  // Helps with jumpiness on mobile Chrome instead of using vh
  jsvh = window.innerHeight * 0.01;

  bookCardBody = () => {
    return (
      <Box
        // height="40vh"
        // height={this.jsvh * 40}
        // width="20vh"
        // width={this.jsvh * 20}
        // maxW="40vw"
        // maxH="71.11vw"
        h={225}
        w={112}
        // margin="auto"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box h="75%" w="100%">
          <Image
            src={this.book.cover_img}
            alt={`${this.book.title} cover image`}
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
        <Box p="2" h="25%">
          <Box as="h6" lineHeight="" fontSize="sm" noOfLines={2} isTruncated>
            {this.book.title}
          </Box>
        </Box>
      </Box>
    );
  };

  renderBook = () => {
    if (this.book.linkActive) {
      return (
        <Link href={this.book.link} isExternal>
          {this.bookCardBody()}
        </Link>
      );
    } else {
      return <div>{this.bookCardBody()}</div>;
    }
  };

  render() {
    return <div>{this.renderBook()}</div>;
  }
}

export default BookCard;
