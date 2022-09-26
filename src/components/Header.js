import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* header panel */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-2">
            Registration
          </NavLink>
          <Nav className="me-auto">
            <NavLink
              to="/details"
              className="text-decoration-none text-light mx-2"
            >
              Dashboard
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
