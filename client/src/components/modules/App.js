import React from "react";
import { AuthStateProvider } from "../../FireBase";
import NavBar from "./NavBar";
import "./App.css";

const App = () => {
  return (
    <AuthStateProvider>
      <NavBar />
    </AuthStateProvider>
  );
};

export default App;
