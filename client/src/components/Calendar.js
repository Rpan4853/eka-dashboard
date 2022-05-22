import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./modules.css";

const Calendar = ({ setStartDate, setEndDate, startDate, endDate }) => {
  const { isAdmin } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(startDate && endDate ? false : true); // have open if start and end date dont exist

  const isMonday = (date) => {
    return date.getDay() === 1;
  };

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
            ? isAdmin
              ? "Choose Week(s)"
              : "Choose Week"
            : "Cancel"
          : `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
      </Button>

      {isOpen | !startDate ? (
        <>
          {isAdmin ? ( // admin calendar can select week ranges
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
                  setIsOpen(false); //let admin finish picking range
                }
              }}
            />
          ) : (
            <DatePicker
              selected={startDate}
              filterDate={isMonday}
              inline
              onChange={(date) => {
                setIsOpen(false);
                setStartDate(date);
                setEndDate(
                  new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() + 5
                  )
                );
              }}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default Calendar;
