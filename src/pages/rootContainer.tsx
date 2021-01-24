import React, { Component } from "react";
import App from "../App";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "./login";
import { Container } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Profile from "./profile";
import NotFound from "./notFound";
import MediumChoice from "./mediumChoice";
import BookSearch from "./bookSearch";

type Props = {};

export default class rootContainer extends Component<Props> {
  loggedInUser = localStorage.getItem("user");

  render() {
    return (
      <Router>
        <Container>
          <Switch>
            <Route
              path="/p/:name"
              render={(routerProps) => <Profile {...routerProps} />}
            />
            <Route path="/login">
              {!!Cookies.get("accessToken") ? (
                <Redirect to={`/p/${this.loggedInUser}`} />
              ) : (
                <Login />
              )}
            </Route>
            {/* ProtectedRoute method doesn't actuall use the isAuthenticated
            method as of now due to async issues */}
            <ProtectedRoute
              path="/newPostCategory"
              component={MediumChoice}
              isAuthenticated={!!Cookies.get("accessToken")}
            />
            <ProtectedRoute
              path="/bookSearch"
              component={BookSearch}
              isAuthenticated={!!Cookies.get("accessToken")}
            />
            <Route path="/login">
              {!!Cookies.get("accessToken") ? (
                <Redirect to={`/p/${this.loggedInUser}`} />
              ) : (
                <Login />
              )}
            </Route>
            <ProtectedRoute
              path="/"
              component={App}
              isAuthenticated={!!Cookies.get("accessToken")}
            />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    );
  }
}
