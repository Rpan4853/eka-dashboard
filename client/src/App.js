import React, { useState } from "react";
import { AuthStateProvider } from "./FireBase";
import NavBar from "./components/NavBar";
import Calendar from "./components/Calendar";
import Table from "./components/Table";
import "./App.css";

const App = () => {
  const [week, setWeek] = useState([null, null]);
  return (
    <AuthStateProvider>
      <NavBar />
      <Calendar setWeek={setWeek} week={week} />
      <Table
        categories={[
          "S. No",
          "Classes Taught (Topics)",
          "No. of Classes",
          "Student Attendance (Average)",
          "Remarks",
          "Actions",
        ]}
        rows={[[1, "Math", 25, 25, undefined]]}
        columns={5}
      />
      <Table
        categories={[
          "S. No",
          "Classes Attended (Topics)",
          "No. of Classes",
          "Facilitator (Organization)",
          "Remarks",
          "Actions",
        ]}
        rows={[[1, "Math", 25, 25, undefined]]}
        columns={5}
      />
      <Table
        categories={["S. No", "Other Tasks", "Remarks"]}
        rows={[]}
        columns={3}
      />
    </AuthStateProvider>
  );
};

export default App;
