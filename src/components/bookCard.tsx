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
          maxW="15vw"
          maxH="40vh"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image
            src={book.cover_img}
            alt={`${book.title} cover image`}
            objectFit="cover"
            w="15vw"
            h="30vh"
          />
          <Box p="2">
            <Box as="h6" isTruncated>
              {book.title}
            </Box>
          </Box>
        </Box>
      </Link>
    );
  }
}

class test extends Component<Props> {
  render() {
    let book = this.props.book;
    const property = {
      // imageUrl: "https://bit.ly/2Z4KKcF",
      imageUrl: book.cover_img,
      imageAlt: "Rear view of modern home with pool",
      beds: 3,
      baths: 2,
      // title: "Modern home in city center in the heart of historic Los Angeles",
      title: book.title,
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 4,
    };

    return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={property.imageUrl} alt={property.imageAlt} />

        <Box p="6">
          {/* <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {property.beds} beds &bull; {property.baths} baths
              </Box>
            </Box> */}

          <Box
            mt="1"
            fontWeight="semibold"
            as="h5"
            lineHeight="tight"
            isTruncated
          >
            {property.title}
          </Box>

          {/* <Box>
              {property.formattedPrice}
              <Box as="span" color="gray.600" fontSize="sm">
                / wk
              </Box>
            </Box> */}

          {/* <Box d="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < property.rating ? "teal.500" : "gray.300"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {property.reviewCount} reviews
              </Box>
            </Box> */}
        </Box>
      </Box>
    );
  }
}

export default BookCard;
