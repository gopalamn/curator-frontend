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
import SignUpApp from "./signUp";

type Props = {};

export default class rootContainer extends Component<Props> {
  loggedInUser = localStorage.getItem("username");

  render() {
    // console.log(!!Cookies.get("accessToken"))
    return (
      <Router>
        <Container>
          <Switch>
            {/* Important to have render here to force cookie status 
          to re-render */}
            <Route
              path="/login"
              render={() =>
                !!Cookies.get("accessToken") ? (
                  <Redirect to={`/p/${this.loggedInUser}`} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/signup"
              render={() =>
                !!Cookies.get("accessToken") ? (
                  <Redirect to={`/p/${this.loggedInUser}`} />
                ) : (
                  <SignUpApp />
                )
              }
            />
            <Route
              path="/p/:name"
              render={(routerProps) => <Profile {...routerProps} />}
            />
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

            <Route
              path="/"
              render={() =>
                !!Cookies.get("accessToken") ? (
                  <Redirect to={`/p/${this.loggedInUser}`} />
                ) : (
                  <Login />
                )
              }
            />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    );
  }
}
