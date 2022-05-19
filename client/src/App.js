import React, { useState } from "react";
import { AuthStateProvider } from "./FireBase";
import NavBar from "./components/NavBar";
import Calendar from "./components/Calendar";
import Table from "./components/Table";
import "./App.css";

const App = () => {
  const [week, setWeek] = useState([null, null]);

  const tableSetUps = [
    {
      categories: [
        "S. No",
        "Classes Taught (Topics)",
        "No. of Classes",
        "Student Attendance (Average)",
        "Remarks",
        "Actions",
      ],
      columns: 4,
    },
    {
      categories: [
        "S. No",
        "Classes Attended (Topics)",
        "No. of Classes",
        "Facilitator (Organization)",
        "Remarks",
        "Actions",
      ],
      columns: 4,
    },
    { categories: ["S. No", "Other Tasks", "Remarks", "Actions"], columns: 2 },
  ];
  return (
    <AuthStateProvider>
      <NavBar />
      <Calendar setWeek={setWeek} week={week} />
      {tableSetUps.map((table, index) => {
        return (
          <Table
            weekStartDate={week[0]}
            categories={table.categories}
            columns={table.columns}
            tableType={index}
          />
        );
      })}
    </AuthStateProvider>
  );
};

export default App;
