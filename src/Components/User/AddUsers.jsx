import React, { useState, useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  //handle register
  async function handleRegister(e) {
    e.preventDefault();
    try {
      if (!name || !email || !phone || !role || !password) {
        toast.warning("Fill all manditory fields");
      }
      const res = await axios.post("http://localhost:5000/api/user/register", {
        name,
        email,
        phone,
        role,
        password,
      });

      toast(res.data);
      await getLoggedIn();
      Navigate("/all-users");
    } catch (error) {
      // alert(error.message);
      console.log(error);
    }
  }
  return (
    <Container className="w-100 mt-1">
      <Container className="d-flex align-items-center mb-2 mt-2 justify-content-between">
        <div className="container1">
          <BsArrowLeftCircle
            size={50}
            className="arrow text-light"
            onClick={() => Navigate("/all-users")}
          />
        </div>
        <h1 className="glow text-light">Add Users</h1>
        <div className="container2">
          <Button
            as={Link}
            to="/all-users"
            animation="grow"
            variant="success"
            className="button"
          >
            All Users
          </Button>
        </div>
      </Container>
      <Row>
        <Col>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label className="text-light" >
                    Name
                  </Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    type="text"
                    placeholder="Enter Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label className="text-light">
                    Email address
                  </Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    type="email"
                    placeholder="Enter Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label className="text-light" >
                    Contact Number
                  </Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    type="number"
                    placeholder="Enter Phone Number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    min="10"
                    max="10"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label className="text-light" controlId="floatingInput">
                    Role
                  </Form.Label>
                  <Form.Select
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    aria-label="Default select example"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option className="bg-transparent text-dark">
                      Select Role
                    </option>
                    <option
                      className="bg-transparent text-dark"
                      value="Developer"
                    >
                      Developer
                    </option>
                    <option className="bg-transparent text-dark" value="Tester">
                      Tester
                    </option>
                    <option
                      className="bg-transparent text-dark"
                      value="Manager"
                    >
                      Manager
                    </option>
                    <option className="bg-transparent text-dark" value="HR">
                      Human Resource
                    </option>
                    <option className="bg-transparent text-dark" value="Doctor">
                      Doctor
                    </option>
                    <option
                      className="bg-transparent text-dark"
                      value="Architecture"
                    >
                      Architecture
                    </option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col lg={true}>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label className="text-light">
                    Password
                  </Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    type="password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="otlines-primary text-light border-light"
                  onClick={handleRegister}
                >
                  Add User
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
