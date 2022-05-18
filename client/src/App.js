import React from "react";
import { AuthStateProvider } from "./FireBase";
import NavBar from "./components/modules/NavBar";
import Calendar from "./components/modules/Calendar";
import "./App.css";

const App = () => {
  return (
    <AuthStateProvider>
      <NavBar />
      <Calendar />
    </AuthStateProvider>
  );
};

export default App;
