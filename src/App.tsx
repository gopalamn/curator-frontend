import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Example() {
  return <Box p="5" maxW="320px" borderWidth="1px"></Box>;
}

export default App;
