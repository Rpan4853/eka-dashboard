import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";
import "./NavBar.css";
import { Navbar, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const { email, verified, handleLogin, handleLogout } =
    useContext(UserContext);

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
        <Navbar.Text>{email}</Navbar.Text>
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
