import React, { Component } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

export default class ProtectedRoute extends Component<PrivateRouteProps> {
  render() {
    return (
      <Route
        render={(props: RouteComponentProps) => {
          if (!this.props.isAuthenticated) {
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
