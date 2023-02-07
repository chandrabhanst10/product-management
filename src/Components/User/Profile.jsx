import "../../App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import ProfilePic from "../../Images/profile.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const [updateCondtion, setUpdateCondtion] = useState(false);

  useEffect(() => {
    getProfileDetails();
  }, []);
  const getProfileDetails = async () => {
    try {
      await axios
        .get("http://localhost:5000/api/user/user-profile")
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setRole(res.data.role);
          setPassword(res.data.password);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const user = { name, email, phone, role, password };
      await axios
        .patch("http://localhost:5000/api/user/update-user", user)
        .then((res) => {
          toast(res.data);
          setUpdateCondtion(false);
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <Container>
      <h1 className="text-light font-italic ">Profile</h1>

      <Row>
        <Col>
          <Container>
            <Image
              className="bg-transparent"
              src={ProfilePic}
              width={250}
              height={250}
              rounded
            />
            {updateCondtion === false && (
              <div className="container2">
                <Button
                  as={Link}
                  // to="/all-products"
                  animation="grow"
                  variant="success"
                  className="button"
                  onClick={() => {
                    setUpdateCondtion(true);
                  }}
                >
                  Update Profile
                </Button>
              </div>
            )}
          </Container>
        </Col>
        <Col>
          {updateCondtion === true && (
            <Container>
              <Form>
                <Form.Group>
                  <Form.Label className="text-light">Name</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    placeholder="Enter Phone Number"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-light">Email</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    value={email}
                    readOnly
                  />
                </Form.Group>
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
                <Form.Group>
                  <Form.Label className="text-light ">Role</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    value={role}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-light ">Password</Form.Label>
                  <Form.Control
                    type="text"
                    className="bg-transparent text-dark  rounded-pill border-dark border-2"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
              <div className="container2">
                <Button
                  animation="grow"
                  variant="success"
                  className="button"
                  onClick={() => {
                    handleUpdateProfile();
                  }}
                >
                  Update
                </Button>
              </div>
            </Container>
          )}
          {updateCondtion === false && (
            <Container>
              <Form>
                <Form.Group>
                  <Form.Label className="text-light">Name</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    placeholder="Enter Phone Number"
                    value={name}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-light">Email</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    value={email}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-light">Phone</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    value={phone}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-light ">Role</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    value={role}
                    readOnly
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                </Form.Group>
              </Form>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
