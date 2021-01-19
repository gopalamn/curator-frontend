import React from "react";
import GoogleLogout from "react-google-login";

export default function GLogout() {
  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <GoogleLogout
      clientId="226210438231-f9a34ekpbjq8gkpj0n10e5pffrgropsn.apps.googleusercontent.com"
      buttonText="Logout"
      onSuccess={responseGoogle}
      cookiePolicy={"single_host_origin"}
    ></GoogleLogout>
  );
}
