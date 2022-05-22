import React, { useState, useEffect } from "react";
import Row from "./Row";
import { Button, Container, Table as BootstrapTable } from "react-bootstrap";

const Table = ({
  userId,
  startDate,
  endDate,
  categories,
  columns,
  tableType,
}) => {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    if (startDate && endDate && userId) {
      fetch(
        "/api/rows?" +
          new URLSearchParams({
            userId: userId,
            startDate: startDate,
            tableType: tableType,
          })
      ).then((resp) => resp.json().then((data) => setTableRows(data)));
    }
  }, [startDate, userId, endDate, tableType]);

  const addRow = () => {
    const newRow = new Array(columns).fill(undefined);
    fetch("/api/rows", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        data: newRow,
        startDate: startDate,
        tableType: tableType,
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }).then((resp) =>
      resp.json().then((data) => {
        const objRow = { id: data._id, data: newRow }; //store objectId of row for put request
        const newTableRows = [...tableRows, objRow];
        setTableRows(newTableRows);
      })
    );
  };

  const deleteRow = (index, rowObjId) => {
    fetch(`api/rows/${rowObjId}`, {
      method: "DELETE",
    }).then((resp) => {
      const newRow = [...tableRows];
      newRow.splice(index, 1);
      setTableRows(newRow);
    });
  };

  return (
    <Container className="Table-container">
      <BootstrapTable>
        <thead className="table-light">
          <tr>
            {categories.map((category) => (
              <th>{category}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, rowIndex) => (
            <Row
              key={row.id}
              rowObjId={row.id}
              row={row.data}
              rowIndex={rowIndex}
              deleteRow={deleteRow}
            />
          ))}
        </tbody>
      </BootstrapTable>
      <Button
        className="d-grid gap-2 col-6 mx-auto"
        variant="outline-secondary"
        onClick={addRow}
      >
        Add Row
      </Button>
    </Container>
  );
};

export default Table;
