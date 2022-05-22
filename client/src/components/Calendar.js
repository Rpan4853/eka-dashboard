import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./modules.css";

const Calendar = ({ setStartDate, setEndDate, startDate, endDate }) => {
  const { isAdmin } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(startDate && endDate ? false : true); // have open if start and end date dont exist

  const showCalendar = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="Calendar-container">
      <Button
        className="Button-container shadow-none d-grid gap-2 col-4 mx-auto"
        variant={isOpen ? "outline-danger" : "outline-primary"}
        onClick={showCalendar}
        disabled={!startDate || !endDate}
      >
        {(!startDate || !endDate) | isOpen
          ? !startDate || !endDate
            ? "Choose Week(s)"
            : "Cancel"
          : `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
      </Button>

      {isOpen | !startDate ? (
        <>
          <DatePicker
            startDate={startDate || new Date()}
            endDate={endDate}
            selectsRange
            inline
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
              if (end) {
                setIsOpen(false); //let user finish picking range
              }
            }}
          />
        </>
      ) : null}
    </div>
  );
};

export default Calendar;
