import React, { Component } from "react";
import {
  Avatar,
  Box,
  Text,
  Skeleton,
  Heading,
  Container,
  Progress,
  Stack,
  Circle,
} from "@chakra-ui/react";
import NewPost from "../components/NewPost";
import API from "../api";
import NotFound from "./notFound";
import NavHeader from "../components/navHeader";
import BookCard from "../components/bookCard";
import LinkCard from "../components/linkCard";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";

type Props = {
  match: any;
};

type State = {
  profileValid: boolean;
  stillLoading: boolean;
  profileUser: {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    profile_pic: string;
    username: string;
  };
  books: [];
  links: [];
};

class Profile extends Component<Props, State> {
  api: any;

  constructor(props: Props) {
    super(props);
    this.api = API();
    this.state = {
      profileValid: false,
      stillLoading: true,
      profileUser: {
        id: -1,
        email: "",
        firstname: "",
        lastname: "",
        profile_pic: "",
        username: "",
      },
      books: [],
      links: [],
    };
  }

  componentDidMount() {
    // Loading content of profile requires initial profile load
    // Hence the .then structure
    this.profileRenderBool().then(() => {
      this.fetchBooks();
      this.fetchLinks();
      this.setState({ stillLoading: false });
    });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    // Specifically needed when profile button is clicked on someone
    // else's page while user is logged in
    if (prevProps.match.params.name !== this.props.match.params.name) {
      this.setState({ stillLoading: true });
      this.profileRenderBool().then(() => {
        this.fetchBooks();
        this.fetchLinks();
        this.setState({ stillLoading: false });
      });
    }
  }

  // Load user's links into state
  fetchLinks = () => {
    return this.api
      .getUserLinks(this.state.profileUser.id)
      .then((response: any) => {
        if (response.ok) {
          const newLinkList: any = [];
          response.data.forEach((element: any) => {
            let userLink = {
              id: element.link_post_id,
              link: element.link,
              title: element.title,
              img: element.img,
              description: element.description,
              hostname: element.hostname,
            };
            newLinkList.push(userLink);
          });
          this.setState({ links: newLinkList });
        }
      });
  };

  // Displays links
  renderLinks = () => {
    // Don't show anything if the user doesn't have any books
    if (this.state.links === undefined || this.state.links.length === 0) {
      return;
    }

    let linksList: any = [];
    this.state.links.forEach((element: any) => {
      linksList.push(
        <Skeleton key={element.id} isLoaded={!this.state.stillLoading}>
          <Box position="relative">
            <LinkCard link={element} />
          </Box>
        </Skeleton>
      );
    });

    linksList.reverse();

    return (
      <Box>
        <Skeleton isLoaded={!this.state.stillLoading}>
          <Heading py={2} size="sm">
            🔗 Links
          </Heading>
        </Skeleton>
        <Stack direction="row" position="relative" overflow="auto">
          {linksList}
        </Stack>
      </Box>
    );
  };

  // Load user's books into state
  fetchBooks = () => {
    return this.api
      .getUserBooks(this.state.profileUser.id)
      .then((response: any) => {
        if (response.ok) {
          const newBookList: any = [];
          response.data.forEach((element: any) => {
            let book = {
              id: element.book_post_id,
              book_api_id: element.book_api_id,
              cover_img: element.cover_img,
              link: element.link,
              title: element.title,
              linkActive: true,
            };
            newBookList.push(book);
          });
          this.setState({ books: newBookList });
        }
      });
  };

  // Displays books
  renderBooks = () => {
    // Don't show anything if the user doesn't have any books
    if (this.state.books === undefined || this.state.books.length === 0) {
      return;
    }

    let booksList: any = [];
    this.state.books.forEach((element: any) => {
      booksList.push(
        <Skeleton key={element.id} isLoaded={!this.state.stillLoading}>
          <Box position="relative">
            <BookCard book={element} />
            {/* <Circle zIndex="1" as="button" position="absolute" top={1} right={1} size={5} bg="black" opacity={0.5}>
                <DeleteIcon width={2} color="white" />
            </Circle> */}
          </Box>
        </Skeleton>
      );
    });

    booksList.reverse();

    return (
      <Box>
        <Skeleton isLoaded={!this.state.stillLoading}>
          <Heading mt={5} py={2} size="sm">
            📚 Books
          </Heading>
        </Skeleton>
        <Stack direction="row" position="relative" overflow="auto">
          {booksList}
        </Stack>
      </Box>
    );
  };

  // Checks if this profile exists
  profileRenderBool = () => {
    let profileUsername = this.props.match.params.name;
    // console.log(profileUsername);
    return this.api
      .getUser(profileUsername)
      .then((response: any) => {
        // console.log(response);
        if (response.ok && response.data.username !== undefined) {
          this.setState({ profileValid: true });
          const newProfileUser = {
            id: response.data.user_id,
            email: response.data.email,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            profile_pic: response.data.profile_pic,
            username: response.data.username,
          };
          this.setState({ profileUser: newProfileUser });
        }
      })
      .catch((error: any) => console.warn(error));
  };

  // Loads profile picture from props
  profilePicture = () => {
    let fullname =
      this.state.profileUser.firstname + " " + this.state.profileUser.lastname;
    return (
      <Box display="inline-block">
        <Box d="flex" flexDir="column" py="2" alignItems="center">
          <Skeleton isLoaded={!this.state.stillLoading}>
            <Avatar
              py="2"
              size="lg"
              name={fullname}
              src={this.state.profileUser.profile_pic}
            />
          </Skeleton>
          <Skeleton isLoaded={!this.state.stillLoading}>
            <Text py="2">{fullname}</Text>
          </Skeleton>
        </Box>
      </Box>
    );
  };
  // TODO: Add in loading animation for components
  // if not yet loaded
  renderProfile = () => {
    if (!this.state.stillLoading) {
      if (this.state.profileValid) {
        return (
          <Container>
            <NavHeader />
            {this.profilePicture()}
            <NewPost />
            <Box>{this.renderBooks()}</Box>
            <Box mt={4} mb={10}>
              {this.renderLinks()}
            </Box>
          </Container>
        );
      } else {
        return <NotFound />;
      }
    } else {
      return <Progress position="absolute" size="xs" isIndeterminate />;
    }
  };

  render() {
    return <div>{this.renderProfile()}</div>;
  }
}

export default Profile;
