import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Table as BootstrapTable, Container } from "react-bootstrap";

const Overview = ({ locationTrainersMap }) => {
  const { isAdmin } = useContext(UserContext);
  const locations = [
    "Panhar, Uttar Pradesh",
    "Jhavar Ka Purva, Uttar Pradesh",
    "Visakhapatnam, Andhra Pradesh",
  ];

  return (
    <Container className="User-container border border-warning border-3 p-2 mb-2 border-opacity-50 rounded-3 bg-white">
      {isAdmin ? (
        <BootstrapTable bordered>
          <thead className="table-light">
            <tr>
              <th>Locations</th>
              <th>Trainers</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => {
              return (
                <tr>
                  <td>{loc}</td>

                  <td>
                    {locationTrainersMap[loc]
                      ? locationTrainersMap[loc].map((user) => (
                          <p>{`${user.name.toUpperCase()} | ${user.email} `}</p>
                        ))
                      : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </BootstrapTable>
      ) : null}
    </Container>
  );
};

export default Overview;
