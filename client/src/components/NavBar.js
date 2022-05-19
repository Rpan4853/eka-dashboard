import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import "./modules.css";
import {
  Navbar,
  Container,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const {
    email,
    verified,
    isAdmin,
    location,
    setLocation,
    userId,
    handleLogin,
    handleLogout,
  } = useContext(UserContext);

  const locations = [
    "Panhar, Uttar Pradesh",
    "Jhavar Ka Purva, Uttar Pradesh",
    "Visakhapatnam, Andhra Pradesh",
  ];

  const updateLocation = (loc) => {
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ email: email, location: loc }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }).then((resp) =>
      resp.json().then((data) => {
        setLocation(loc);
      })
    );
  };

  return (
    <Navbar bg="light" sticky="top">
      <Container>
        <Navbar.Brand>
          <img
            className="NavBar-logo"
            src="https://ekkadamaur.org/wp-content/uploads/2020/04/cropped-Final-Logo-Options.png"
            alt="logo"
          />
        </Navbar.Brand>

        <Navbar.Text>{`${email} (${
          isAdmin ? "Admin" : "Trainer"
        })`}</Navbar.Text>

        {!isAdmin ? ( // admin does not need to select location
          <DropdownButton
            variant="success"
            title={location ? location : "Select Location"}
          >
            {locations.map((location) => (
              <Dropdown.Item
                as="button"
                onClick={() => updateLocation(location)}
              >
                {location}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        ) : null}

        {!verified ? (
          <Button variant="primary" onClick={handleLogin}>
            Log In
          </Button>
        ) : (
          <Button variant="danger" onClick={handleLogout}>
            Log Out
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
