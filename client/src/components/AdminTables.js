import React from "react";
import { Container } from "react-bootstrap";
import Table from "./Table";

const AdminTables = ({ start, end, locationTrainersMap, tableSetUps }) => {
  return (
    <Container className="Body-container">
      <h3 className="text-center">{`${start.toDateString()} - ${end.toDateString()}`}</h3>
      {Object.keys(locationTrainersMap).map((loc) => {
        return (
          <Container className="Location-container border border-3 border-warning p-2 mb-2 border-opacity-50 bg-warning p-2 text-dark bg-opacity-10">
            <h4 className="text-center">{loc}</h4>
            {locationTrainersMap[loc].map((user) => {
              return (
                <Container className="User-container border border-2 border-warning p-2 mb-2 border-opacity-50 rounded-3 bg-white">
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
};

export default AdminTables;
