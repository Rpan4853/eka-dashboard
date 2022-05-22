import React from "react";
import { Container } from "react-bootstrap";
import Table from "./Table";

const TrainerTables = ({ tableSetUps, start, end, userId }) => {
  return (
    <Container className="User-container border border-warning border-3 p-2 mb-2 border-opacity-50 rounded-3 bg-white">
      <h3 className="text-center">{`${start.toDateString()} - ${end.toDateString()}`}</h3>
      {tableSetUps.map((table, index) => {
        return (
          <Table
            userId={userId}
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
};

export default TrainerTables;
