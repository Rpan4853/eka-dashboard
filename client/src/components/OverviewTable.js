import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";

const OverviewTable = ({ colHeaders, rowHeaders, mapping, parseItem }) => {
  return (
    <BootstrapTable bordered>
      <thead className="table-light">
        <tr>
          {colHeaders.map((header) => {
            return <th>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rowHeaders.map((header) => {
          return (
            <tr>
              <td>{header}</td>
              <td>
                {mapping[header]
                  ? mapping[header].map((item) => {
                      return <p>{parseItem(item)}</p>;
                    })
                  : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </BootstrapTable>
  );
};

export default OverviewTable;
