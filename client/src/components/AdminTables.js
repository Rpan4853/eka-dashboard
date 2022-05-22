import React from "react";
import { Container } from "react-bootstrap";
import Table from "./Table";

const AdminTables = ({
  startDate,
  endDate,
  locationTrainersMap,
  tableSetUps,
}) => {
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

  return (
    <>
      {getStartDates(startDate, endDate).map((start) => {
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
      })}
    </>
  );
};

export default AdminTables;
