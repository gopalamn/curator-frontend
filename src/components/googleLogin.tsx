import { Button } from "@chakra-ui/react";
import React from "react";
import GoogleLogin from "react-google-login";

export default function GLogin() {
  const handleLogin = async (response: any) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="226210438231-f9a34ekpbjq8gkpj0n10e5pffrgropsn.apps.googleusercontent.com"
      buttonText="Login"
      render={(renderProps) => (
        <Button
          width="full"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Sign in with Google
        </Button>
      )}
      onFailure={handleLogin}
      onSuccess={handleLogin}
      cookiePolicy={"single_host_origin"}
    />
  );
}
