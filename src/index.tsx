import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./pages/rootContainer";
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import theme from "./theme";

ReactDOM.render(
  <ChakraProvider>
    <CSSReset />
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Root />
  </ChakraProvider>,
  document.getElementById("root")
);
