import React from "react";
import { AuthStateProvider } from "./FireBase";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import "./App.css";

const App = () => {
  return (
    <AuthStateProvider>
      <NavBar />
      <Body />
    </AuthStateProvider>
  );
};

export default App;
