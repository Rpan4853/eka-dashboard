import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import Calendar from "./Calendar";
import Table from "./Table";
import { Alert } from "react-bootstrap";

const Body = () => {
  const { verified, location, isAdmin } = useContext(UserContext);
  const [week, setWeek] = useState([null, null]);

  useEffect(() => {
    const localStartDate = localStorage.getItem("startDate");
    const localEndDate = localStorage.getItem("endDate");
    if (localStartDate && localEndDate) {
      try {
        setWeek([
          new Date(JSON.parse(localStartDate)),
          new Date(JSON.parse(localEndDate)),
        ]);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    if (week[0]) {
      localStorage.setItem("startDate", JSON.stringify(week[0]));
      localStorage.setItem("endDate", JSON.stringify(week[1]));
    }
  }, [week]);

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
      {verified ? (
        location || isAdmin ? ( // admin does not need to choose location
          <Calendar setWeek={setWeek} week={week} />
        ) : (
          <Alert variant="danger">
            <Alert.Heading>Please select your location!</Alert.Heading>
            <p>Select from the dropdown on the top of the page</p>
          </Alert>
        )
      ) : (
        <Alert variant="danger">
          <Alert.Heading>Please log in to view dashboard!</Alert.Heading>
          <p>
            If you are a new user, make sure to select your location after
            logging in with Google.
          </p>
        </Alert>
      )}
      {tableSetUps.map((table, index) => {
        if (verified && week[0] && week[1] && (location || isAdmin)) {
          return (
            <Table
              weekStartDate={week[0]}
              categories={table.categories}
              columns={table.columns}
              tableType={index}
            />
          );
        }
      })}
    </>
  );
};

export default Body;
