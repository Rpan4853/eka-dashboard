import React, { useState } from "react";
import { AuthStateProvider } from "./FireBase";
import NavBar from "./components/modules/NavBar";
import Calendar from "./components/modules/Calendar";
import "./App.css";

const App = () => {
  const [week, setWeek] = useState([null, null]);
  return (
    <AuthStateProvider>
      <NavBar />
      <Calendar setWeek={setWeek} week={week} />
    </AuthStateProvider>
  );
};

export default App;
