import React, { Component } from "react";
import { Box, Image, Link, useColorModeValue } from "@chakra-ui/react";

type Props = {
  link: any;
};

// Need link to have properties:
// title, src, img
class LinkCard extends Component<Props> {
  link = this.props.link;

  linkCardBody = () => {
    return (
      <Box
        h={200}
        w={300}
        // borderWidth={1}
        borderRadius="lg"
        overflow="hidden"
        boxShadow="xl"
      >
        <Box h="70%" w="100%">
          <Image
            src={this.link.img}
            alt={`${this.link.title} cover image`}
            borderRadius="lg"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
        <Box p={2} h="25%">
          <Box as="h6" lineHeight="" fontSize="sm" noOfLines={1} isTruncated>
            {this.link.title}
          </Box>
          <Box
            as="h6"
            color="gray.400"
            lineHeight=""
            fontSize="sm"
            noOfLines={1}
            isTruncated
          >
            {this.link.hostname}
          </Box>
        </Box>
      </Box>
    );
  };

  renderBook = () => {
    return (
      <Link href={this.link.link} isExternal>
        {this.linkCardBody()}
      </Link>
    );
  };

  render() {
    return <div>{this.renderBook()}</div>;
  }
}

export default LinkCard;
