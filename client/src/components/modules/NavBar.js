import React from "react";
import "./NavBar.css";
import { Navbar, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
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
        <Button variant="primary">Log In</Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
