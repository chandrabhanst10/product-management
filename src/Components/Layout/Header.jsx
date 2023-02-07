import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

import Logout from "../Auth/Logout";

const Header = () => {
  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn);

  return (
    <Navbar
      collapseOnSelect
      bg="transparent"
      expand="lg"
      variant="dark"
      className="navbar  fixed-top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-light">
          Product Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {loggedIn ? (
            <>
              <Nav className="me-auto ">
                <Nav.Link
                  as={Link}
                  style={{ color: "white", fontWeight: "600" }}
                  to="/"
                  className="active"
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  style={{ color: "white", fontWeight: "600" }}
                  to="/all-users"
                >
                  Users
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  style={{ color: "white", fontWeight: "600" }}
                  to="/all-products"
                >
                  Products
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  style={{ color: "white", fontWeight: "600" }}
                  to="/add-product"
                >
                  Add Product
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  style={{ color: "white", fontWeight: "600" }}
                  to="/add-user"
                >
                  Add User
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link
                  as={Link}
                  style={{ color: "white", fontWeight: "600" }}
                  to="/profile"
                >
                  Profile
                </Nav.Link>
                <Nav.Link style={{ color: "white", fontWeight: "600" }}>
                  <Logout />
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/register" style={{ color: "white" }}>
                Register
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                eventKey={2}
                style={{ color: "white" }}
              >
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
