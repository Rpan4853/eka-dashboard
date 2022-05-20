import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./modules.css";

const Calendar = ({ setWeek, week }) => {
  const { isAdmin } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(week[0] && week[1] ? false : true); // have open if start and end date dont exist
  const [startDate, endDate] = week;

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
        className="shadow-none"
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
              filterDate={isMonday}
              selectsRange
              selectsDisabledDaysInRange
              inline
              onChange={(dates) => {
                const [start, end] = dates;
                if (end) {
                  setWeek([
                    start,
                    new Date(
                      end.getFullYear(),
                      end.getMonth(),
                      end.getDate() + 5
                    ),
                  ]);
                  setIsOpen(false); //let admin finish picking range
                } else {
                  setWeek([start, end]);
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
                setWeek([
                  date,
                  new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() + 5
                  ),
                ]);
              }}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default Calendar;
