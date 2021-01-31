import React, { Component } from "react";
import { Box, Image, Link } from "@chakra-ui/react";

type Props = {
  book: any;
};

// Need book to have properties:
// title, link, linkActive (true/false), cover_img
class BookCard extends Component<Props> {
  book = this.props.book;

  bookCardBody = () => {
    return (
      <Box
        h={225}
        w={112}
        // borderWidth={1}
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
      >
        <Box h="75%" w="100%">
          <Image
            src={this.book.cover_img}
            alt={`${this.book.title} cover image`}
            borderRadius="lg"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
        <Box p="2" h="25%">
          <Box
            as="h6"
            lineHeight=""
            fontWeight="light"
            fontSize="sm"
            noOfLines={2}
            isTruncated
          >
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
