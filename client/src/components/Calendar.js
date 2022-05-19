import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import DatePicker from "react-datepicker";
import { Button, Alert } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./modules.css";

const Calendar = ({ setWeek, week }) => {
  const { isAdmin, location, verified } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [startDate, endDate] = week;

  const isMonday = (date) => {
    return date.getDay() === 1;
  };

  const showCalendar = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  if (verified) {
    if (location) {
      <div className="Calendar-container">
        <Button
          className="shadow-none"
          variant={isOpen ? "outline-danger" : "outline-primary"}
          onClick={showCalendar}
          disabled={!startDate}
        >
          {!startDate | isOpen
            ? !startDate
              ? "Choose Week"
              : "Cancel"
            : `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
        </Button>

        {isOpen | !startDate ? (
          <>
            <DatePicker
              onChange={(date) => {
                setIsOpen(false);
                setWeek([
                  date,
                  new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() + 5
                  ),
                ]);
              }}
              filterDate={isMonday}
              inline
            />
          </>
        ) : null}
      </div>;
    } else {
      return (
        <Alert variant="danger">
          <Alert.Heading>Please select your location!</Alert.Heading>
          <p>Select from the dropdown on the top of the page</p>
        </Alert>
      );
    }
  } else {
    return (
      <Alert variant="danger">
        <Alert.Heading>Please log in to view dashboard!</Alert.Heading>
        <p>
          If you are a new user, make sure to select your location after logging
          in with Google.
        </p>
      </Alert>
    );
  }
};

export default Calendar;
