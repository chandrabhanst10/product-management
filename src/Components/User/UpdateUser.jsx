import "../../App.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [isadmin, setIsAdmin] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const Navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getProductDetails();
  });

  const getProductDetails = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/user/single-user/${params.id}`)
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setRole(res.data.role);
          setIsAdmin(res.data.isadmin);
        })
        .catch((err) => {
          toast(err.message);
        });
    } catch (error) {
      toast(error.message);
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios
        .update(`http://localhost:5000/api/user/update-user/${params.id}`, {
          name,
          email,
          phone,
          role,
          isadmin,
        })
        .then((res) => {
          toast(res.data);
          getLoggedIn();
          Navigate("/all-products");
        })
        .catch((err) => {
          toast(err.message);
        });
    } catch (error) {
      toast(error.message);
      console.log(error);
    }
  };

  return (
    <Container>
      <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>

      <h1 className="text-light font-italic ">Update User</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-light">Name</Form.Label>
              <Form.Control
                type="text"
                className="bg-transparent text-light  rounded-pill border-light border-2"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-light">Email</Form.Label>
              <Form.Control
                type="email"
                className="bg-transparent text-light  rounded-pill border-light border-2"
                value={email}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-light">Phone</Form.Label>
              <Form.Control
                type="number"
                className="bg-transparent text-light  rounded-pill border-light border-2"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="text-light">Role</Form.Label>
              <Form.Select
                className="bg-transparent text-light  rounded-pill border-light border-2"
                aria-label="Default select example"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option className="bg-transparent text-dark" value="Developer">
                  Developer
                </option>
                <option className="bg-transparent text-dark" value="Tester">
                  Tester
                </option>
                <option className="bg-transparent text-dark" value="Manager">
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
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="text-light">IS Admin</Form.Label>
              <Form.Select
                className="bg-transparent text-light  rounded-pill border-light border-2"
                aria-label="Default select example"
                onChange={(e) => setIsAdmin(e.target.value)}
              >
                <option className="bg-transparent text-dark" value="yes">
                  Yes
                </option>
                <option
                  className="bg-transparent text-dark"
                  selected
                  value="no"
                >
                  No
                </option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row />

      <Container>
        <div className="container2">
          <Button
            animation="grow"
            variant="success"
            className="button"
            onClick={() => {
              handleUpdateUser();
            }}
          >
            Update User
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default UpdateUser;
