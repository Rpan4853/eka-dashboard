import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import Calendar from "./Calendar";
import { Alert, Form } from "react-bootstrap";
import Select from "react-select";

const Filters = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  filterLocations,
  setFilterLocations,
  setLocationTrainersMap,
}) => {
  const { location, isAdmin } = useContext(UserContext);

  const createArrayQuery = (array, query) => {
    let queryString = `${query}=${array[0]}`;
    for (let i = 1; i < array.length; i++) {
      queryString += `&${query}=${array[i]}`;
    }
    return queryString;
  };

  //creates a mapping of locations to user objects
  const createMapping = (users) => {
    const mapping = {};
    users.map((user) => {
      if (mapping.hasOwnProperty(user.location)) {
        mapping[user.location].push(user);
      } else {
        mapping[user.location] = [user];
      }
    });
    return mapping;
  };

  useEffect(() => {
    if (filterLocations.length > 0) {
      fetch(`/api/users?${createArrayQuery(filterLocations, "location")}`).then(
        (resp) =>
          resp.json().then((users) => {
            setLocationTrainersMap(createMapping(users));
          })
      );
    }
  }, [filterLocations]);

  const locationOptions = [
    { value: "Panhar, Uttar Pradesh", label: "Panhar, Uttar Pradesh" },
    {
      value: "Jhavar Ka Purva, Uttar Pradesh",
      label: "Jhavar Ka Purva, Uttar Pradesh",
    },
    {
      value: "Visakhapatnam, Andhra Pradesh",
      label: "Visakhapatnam, Andhra Pradesh",
    },
  ];

  return (
    <>
      {isAdmin ? (
        <>
          <Form>
            <Form.Label>Select Location(s)</Form.Label>
            <Select
              options={locationOptions}
              isMulti
              onChange={(filtLocations) =>
                setFilterLocations(filtLocations.map((loc) => loc.value))
              }
            />
          </Form>
        </>
      ) : null}
      {location || (isAdmin && filterLocations.length > 0) ? ( // admin does not need to choose location
        <Calendar
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        <>
          {!isAdmin ? (
            <Alert variant="danger">
              <Alert.Heading>Please select your location!</Alert.Heading>
              <p>Select from the dropdown on the top of the page</p>
            </Alert>
          ) : null}
        </>
      )}
    </>
  );
};

export default Filters;
