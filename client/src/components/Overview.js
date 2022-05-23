import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Table as BootstrapTable, Container } from "react-bootstrap";
import OverviewTable from "./OverviewTable";

const Overview = ({ startDate, endDate, trainers, locationTrainersMap }) => {
  console.log("overview rendred");
  const { userId, isAdmin } = useContext(UserContext);
  const [classesTaught, setClassesTaught] = useState(0);
  const [classesTaken, setClassesTaken] = useState(0);
  const [attendance, setAttendance] = useState(0);

  const locations = [
    "Panhar, Uttar Pradesh",
    "Jhavar Ka Purva, Uttar Pradesh",
    "Visakhapatnam, Andhra Pradesh",
  ];

  const createArrayQuery = (array, query) => {
    let arrayQuery = `${query}=${array[0].id}`;
    for (let i = 1; i < array.length; i++) {
      arrayQuery += `&${query}=${array[i].id}`;
    }
    return arrayQuery;
  };

  const fetchRowData = async (tableType, isAdmin) => {
    if (isAdmin) {
      return await fetch(
        `/api/rows?${createArrayQuery(
          trainers,
          "userId"
        )}&startDate=${startDate}&endDate=${endDate}&tableType=${tableType}`
      );
    } else {
      return await fetch(
        `/api/rows?userId=${userId}&startDate=${startDate}&endDate=${endDate}&tableType=${tableType}`
      );
    }
  };

  const sumArraysAtIndex = (array, index) => {
    return array
      .map((item) => parseInt(item.data[index]))
      .reduce((prev, cur) => {
        if (prev) {
          if (cur) {
            return prev + cur;
          } else {
            return prev;
          }
        } else {
          return 0;
        }
      });
  };

  useEffect(() => {
    console.log("hereee");
    if (userId) {
      fetchRowData(0, isAdmin).then((resp) => {
        resp.json().then((rows) => {
          console.log(rows);
          setClassesTaught(sumArraysAtIndex(rows, 1));
          setAttendance(sumArraysAtIndex(rows, 2));
        });
      });
      fetchRowData(1, isAdmin).then((resp) => {
        resp.json().then((rows) => {
          setClassesTaken(sumArraysAtIndex(rows, 1));
        });
      });
    }
  }, [userId, startDate, endDate, trainers]);

  const parseUser = (user) => {
    return `${user.name ? `${user.name.toUpperCase()} |` : ""} ${user.email} `;
  };

  return (
    <Container className="User-container border border-warning border-3 p-2 mb-2 border-opacity-50 rounded-3 bg-white">
      {isAdmin ? (
        <OverviewTable
          colHeaders={["Locations", "Trainers"]}
          rowHeaders={locations}
          mapping={locationTrainersMap}
          parseItem={parseUser}
        />
      ) : null}
      <OverviewTable
        colHeaders={["Query", "Value"]}
        rowHeaders={["Classes Taught", "Classes Taken", "Attendance"]}
        mapping={{
          "Classes Taught": [classesTaught],
          "Classes Taken": [classesTaken],
          Attendance: [attendance],
        }}
        parseItem={(item) => item}
      />
    </Container>
  );
};

export default Overview;
