import React, { useState, useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.warning("Fill all manditory fields");
    }
    axios
      .post("http://localhost:5000/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          console.log(res.data);
          toast.success(res.data.message);
          Navigate("/");
        }
        if (res.data.success === false) {
          toast.error(res.data.message);
        }
      })
      .catch(async (err) => {
        console.log(err.message);
        toast.error(err.message);
        Navigate("/login");
        await getLoggedIn();
      });
  };
  return (
    <Container className="w-100">
      <h1 className="mb-2 text-light">Login</h1>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-light">Email address</Form.Label>
              <Form.Control
                type="email"
                className="bg-transparent text-light  rounded-pill border-light border-2"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-light">Password</Form.Label>
              <Form.Control
                type="password"
                className="bg-transparent text-light  rounded-pill border-light border-2"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-around">
        <Col as={Link} to="/forgot-password">
          <p className="text-light">Forgot Password</p>
        </Col>
        <Col lg={true}>
          <Form>
            <Button
              variant="otlines-primary text-light border-light"
              onClick={handleLogin}
              className="text-light  rounded-pill border-light border-2 pl-2"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
