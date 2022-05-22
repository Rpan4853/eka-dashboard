import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import Table from "./Table";
import Filters from "./Filters";
import { Alert, Container, Row, Col } from "react-bootstrap";
import "./modules.css";

const Body = () => {
  const { userId, verified, location, isAdmin } = useContext(UserContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterLocations, setFilterLocations] = useState([]);
  const [locationTrainersMap, setLocationTrainersMap] = useState({});

  useEffect(() => {
    const localStartDate = localStorage.getItem("startDate");
    const localEndDate = localStorage.getItem("endDate");
    if (localStartDate && localEndDate) {
      try {
        setStartDate(new Date(JSON.parse(localStartDate)));
        setEndDate(new Date(JSON.parse(localEndDate)));
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    if (startDate) {
      localStorage.setItem("startDate", JSON.stringify(startDate));
      localStorage.setItem("endDate", JSON.stringify(endDate));
    }
  }, [startDate, endDate]);

  const getStartDates = (start, end) => {
    let actualStart = start; //make sure the first start date is a monday
    for (let i = 0; i < 7; i++) {
      if (actualStart.getDay() === 1 || actualStart > end) {
        break;
      }
      actualStart = new Date(
        actualStart.getFullYear(),
        actualStart.getMonth(),
        actualStart.getDate() + 1
      );
    }
    let startDates = [];
    for (let date = actualStart; date <= end; ) {
      startDates.push(date);
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    }
    return startDates;
  };

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
        <Filters
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
          filterLocations={filterLocations}
          setFilterLocations={setFilterLocations}
          setLocationTrainersMap={setLocationTrainersMap}
        />
      ) : (
        <Alert variant="danger">
          <Alert.Heading>Please log in to view dashboard!</Alert.Heading>
          <p>
            If you are a new user, make sure to select your location after
            logging in with Google.
          </p>
        </Alert>
      )}
      {verified &&
      startDate &&
      endDate &&
      (location || (isAdmin && filterLocations.length > 0)) ? (
        !isAdmin ? (
          <Container className="User-container border border-success p-2 mb-2 border-opacity-50 rounded-3 bg-white">
            {tableSetUps.map((table, index) => {
              if (
                verified &&
                startDate &&
                endDate &&
                (location || (isAdmin && filterLocations.length > 0))
              ) {
                return (
                  <Table
                    userId={userId}
                    startDate={startDate}
                    endDate={endDate}
                    categories={table.categories}
                    columns={table.columns}
                    tableType={index}
                  />
                );
              }
            })}
          </Container>
        ) : Object.keys(locationTrainersMap).length > 0 ? (
          getStartDates(startDate, endDate).map((start) => {
            const end = new Date(
              start.getFullYear(),
              start.getMonth(),
              start.getDate() + 5
            );
            return (
              <Container className="Body-container">
                <h3 className="text-center">{`${start.toDateString()} - ${end.toDateString()}`}</h3>
                {Object.keys(locationTrainersMap).map((loc) => {
                  return (
                    <Container className="Location-container border border-success p-2 mb-2 border-opacity-50 bg-success p-2 text-dark bg-opacity-10">
                      <h4 className="text-center">{loc}</h4>
                      {locationTrainersMap[loc].map((user) => {
                        return (
                          <Container className="User-container border border-success p-2 mb-2 border-opacity-50 rounded-3 bg-white">
                            <h6 className="text-center ">{`${user.name.toUpperCase()} | ${
                              user.email
                            }`}</h6>
                            <hr />
                            {tableSetUps.map((table, index) => {
                              return (
                                <Table
                                  userId={user.id}
                                  startDate={start}
                                  endDate={end}
                                  categories={table.categories}
                                  columns={table.columns}
                                  tableType={index}
                                />
                              );
                            })}
                          </Container>
                        );
                      })}
                    </Container>
                  );
                })}
              </Container>
            );
          })
        ) : (
          <Alert variant="danger">
            <Alert.Heading>
              No data found for the location(s)/week(s) chosen!
            </Alert.Heading>
            <p>Please try again with new filters.</p>
          </Alert>
        )
      ) : null}
    </>
  );
};

export default Body;
