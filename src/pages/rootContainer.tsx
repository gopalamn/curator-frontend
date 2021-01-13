import React, { Component } from "react";
import App from "../App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "./login";
import { Container } from "@chakra-ui/react";
import Cookies from "js-cookie";

type Props = {};

export default class rootContainer extends Component<Props> {
  render() {
    return (
      <Router>
        <Container>
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute
              path="/"
              component={App}
              isAuthenticated={!!Cookies.get("accessToken")}
            />
          </Switch>
        </Container>
      </Router>
    );
  }
}
