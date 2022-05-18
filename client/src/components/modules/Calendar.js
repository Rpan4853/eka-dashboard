import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./modules.css";

const Calendar = ({ setWeek, week }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, endDate] = week;

  const isMonday = (date) => {
    return date.getDay() == 1;
  };

  const showCalendar = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
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
    </div>
  );
};

export default Calendar;
