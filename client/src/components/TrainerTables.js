import React from "react";
import { Container } from "react-bootstrap";
import Table from "./Table";

const TrainerTables = ({ tableSetUps, startDate, endDate, userId }) => {
  return (
    <Container className="User-container border border-success p-2 mb-2 border-opacity-50 rounded-3 bg-white">
      {tableSetUps.map((table, index) => {
        return (
          <Table
            userId={userId}
            startDate={startDate}
            endDate={endDate}
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
