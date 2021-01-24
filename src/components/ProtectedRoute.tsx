import React, { Component } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import Cookies from "js-cookie";

// If I need to change this Protected Route to a
// general solution later, makue use of this interface.
// Beware that this might cause async issues...
interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

export default class ProtectedRoute extends Component<PrivateRouteProps> {
  render() {
    return (
      <Route
        render={(props: RouteComponentProps) => {
          //   if (!this.props.isAuthenticated) {
          //     return <Redirect to="/login" />;
          //   }

          // Hardcoded cookies check here because it was causing
          // async issues
          if (!!!Cookies.get("accessToken")) {
            return <Redirect to="/login" />;
          }

          if (this.props.component) {
            return React.createElement(this.props.component);
          }

          if (this.props.render) {
            return this.props.render(props);
          }
        }}
      />
    );
  }
}
