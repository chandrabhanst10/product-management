import React from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import '../../App.css'
import Dropdown from "./Dropdown";

const Home = () => {
  return (
    <Container>
      <Row className="bg-transparent">
        <Col className="col-md-6">
          <h3 className="animate-charcter">PINEVENT</h3>
        </Col>
      </Row>
     {/* <Dropdown/> */}
    </Container>
  );
};

export default Home;
