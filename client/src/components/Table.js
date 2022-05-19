import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import Row from "./Row";
import { Button } from "react-bootstrap";

const Table = ({ categories, columns, tableType }) => {
  const { userId, weekStartDate } = useContext(UserContext);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    if (weekStartDate && userId) {
      fetch(
        "/api/rows?" +
          new URLSearchParams({
            userId: userId,
            weekStartDate: weekStartDate,
            tableType: tableType,
          })
      ).then((resp) => resp.json().then((data) => setTableRows(data)));
    }
  }, [weekStartDate, userId]);

  const addRow = () => {
    const newRow = new Array(columns).fill(undefined);
    fetch("/api/rows", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        data: newRow,
        weekStartDate: weekStartDate,
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
            <Row
              key={row.id}
              rowObjId={row.id}
              row={row.data}
              rowIndex={rowIndex}
              deleteRow={deleteRow}
            />
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
