import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import Row from "./Row";
import { Button } from "react-bootstrap";

const Table = ({ categories, rows, columns }) => {
  const { userId } = useContext(UserContext);
  const [tableRows, setTableRows] = useState(rows);

  const addRow = () => {
    const newRow = new Array(columns).fill(undefined);
    newRow[0] = tableRows.length + 1;
    const newTableRows = [...tableRows, newRow];
    setTableRows(newTableRows);
  };

  const deleteRow = (index) => {
    const newRow = [...tableRows];
    newRow.splice(index, 1);
    setTableRows(newRow);
  };

  return (
    <>
      <table className="table align-middle">
        <thead className="table-light">
          <tr>
            {categories.map((category) => (
              <th>{category}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, rowIndex) => (
            <Row row={row} rowIndex={rowIndex} deleteRow={deleteRow} />
          ))}
        </tbody>
      </table>
      <Button variant="primary" onClick={addRow}>
        Add Row
      </Button>
    </>
  );
};

export default Table;
