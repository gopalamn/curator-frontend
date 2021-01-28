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
} from "@chakra-ui/react";
import NewPost from "../components/NewPost";
import API from "../api";
import NotFound from "./notFound";
import NavHeader from "../components/navHeader";
import BookCard from "../components/bookCard";

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
    };
  }

  componentDidMount() {
    // Loading content of profile requires initial profile load
    // Hence the .then structure
    this.profileRenderBool().then(() => {
      this.fetchBooks();
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
        this.setState({ stillLoading: false });
      });
    }
  }

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
          <BookCard book={element} />
        </Skeleton>
      );
    });

    booksList.reverse();

    return (
      <Box>
        <Skeleton isLoaded={!this.state.stillLoading}>
          <Heading mb={2} size="xs">
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
            {this.renderBooks()}
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
