import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import "./modules.css";
import logo from "../eka-logo.png";
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
    name,
    email,
    verified,
    isAdmin,
    location,
    setLocation,
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
      method: "PUT",
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
          <img className="NavBar-logo" src={logo} alt="logo" />
        </Navbar.Brand>

        {!isAdmin && verified ? ( // admin does not need to select location
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

        {verified ? (
          <Navbar.Text>{`${name.toUpperCase()} | ${email} (${
            isAdmin ? "Admin" : "Trainer"
          })`}</Navbar.Text>
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
