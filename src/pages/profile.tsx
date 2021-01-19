import React, { Component } from "react";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import NewPost from "../components/NewPost";
import LogoutButton from "../components/logout";
import API from "../api";
import NotFound from "./notFound";

type Props = {
  match: any;
};

type State = {
  profileValid: boolean;
  stillLoading: boolean;
};

class Profile extends Component<Props, State> {
  api: any;

  constructor(props: Props) {
    super(props);
    this.api = API();
    this.state = {
      profileValid: false,
      stillLoading: true,
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.profileRenderBool();
  }

  profileRenderBool = () => {
    let profileUsername = this.props.match.params.name;
    // let profileUsername = "hi"
    console.log(profileUsername);
    return this.api
      .getUser(profileUsername)
      .then((response: any) => {
        console.log(response);
        if (response.ok && response.data.username !== undefined) {
          this.setState({ profileValid: true });
          this.setState({ stillLoading: false });
        } else {
          this.setState({ stillLoading: false });
        }
      })
      .catch((error: any) => console.warn(error));
  };

  renderProfile = () => {
    if (!this.state.stillLoading) {
      console.log(this.state.profileValid);
      if (this.state.profileValid) {
        return (
          <ChakraProvider>
            <CSSReset />
            <LogoutButton />
            <NewPost />
          </ChakraProvider>
        );
      } else {
        return <NotFound />;
      }
    }
  };

  render() {
    return <div>{this.renderProfile()}</div>;
  }
}

export default Profile;
