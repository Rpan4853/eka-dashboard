import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import TrainerTables from "./TrainerTables";
import AdminTables from "./AdminTables";
import Filters from "./Filters";
import Overview from "./Overview";
import { Alert, Tabs, Tab, Container } from "react-bootstrap";
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
    <Container>
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
        !isAdmin || Object.keys(locationTrainersMap).length > 0 ? (
          <Tabs fill justify defaultActiveKey="overview">
            <Tab eventKey="overview" title="Overview">
              <Overview />
            </Tab>
            <Tab eventKey="data" title="Data">
              {!isAdmin ? (
                <TrainerTables
                  tableSetUps={tableSetUps}
                  startDate={startDate}
                  endDate={endDate}
                  filterLocations={filterLocations}
                  userId={userId}
                />
              ) : (
                <AdminTables
                  startDate={startDate}
                  endDate={endDate}
                  locationTrainersMap={locationTrainersMap}
                  tableSetUps={tableSetUps}
                />
              )}
            </Tab>
          </Tabs>
        ) : (
          <Alert variant="danger">
            <Alert.Heading>
              No data found for the location(s)/week(s) chosen!
            </Alert.Heading>
            <p>Please try again with new filters.</p>
          </Alert>
        )
      ) : null}
    </Container>
  );
};

export default Body;
