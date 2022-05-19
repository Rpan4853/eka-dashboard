import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Table from "./Table";

const Body = () => {
  let startDate = JSON.parse(localStorage.getItem("startDate"));
  let endDate = JSON.parse(localStorage.getItem("endDate"));
  let localWeek = [null, null];
  if (startDate && endDate) {
    localWeek = [new Date(startDate), new Date(endDate)];
  }

  const [week, setWeek] = useState(localWeek);

  useEffect(() => {
    localStorage.setItem("startDate", JSON.stringify(week[0]));
    localStorage.setItem("endDate", JSON.stringify(week[1]));
  }, [week]);

  useEffect(() => {
    startDate = JSON.parse(localStorage.getItem("startDate"));
    endDate = JSON.parse(localStorage.getItem("endDate"));
    if (startDate && endDate) {
      localWeek = [new Date(startDate), new Date(endDate)];
      setWeek(localWeek);
    }
  }, []);

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
    <>
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
    </>
  );
};

export default Body;
