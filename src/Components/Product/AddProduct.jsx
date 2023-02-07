import React, { useContext, useState } from "react";
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

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const Navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  const handleAddProduct = async () => {
    try {
      if (!name || !price || !description || !category || !company) {
        return toast.warning("Fill all manditory fields");
      }
      await axios
        .post("http://localhost:5000/api/product/add-product", {
          name,
          price,
          category,
          description,
          company,
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
    <Container className=" mt-1">
      <Container className="d-flex align-items-center mb-2 mt-2 justify-content-between">
        <div className="container1">
          <BsArrowLeftCircle
            size={50}
            className="arrow text-light"
            onClick={() => Navigate("/all-products")}
          />
        </div>
        <h1 className="glow text-light">Add Products</h1>
        <div className="container2">
          <Button
            as={Link}
            to="/all-products"
            animation="grow"
            variant="success"
            className="button"
          >
            All Products
          </Button>
        </div>
      </Container>
      <Row>
        <Col>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label className="text-light ">Name</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    type="text"
                    placeholder="Enter Product Name"
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
                  <Form.Label className="text-light ">Description</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  font-weight-bold  rounded-pill border-light border-2"
                    type="text"
                    placeholder="Enter Product Description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label className="text-light">Price</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    type="number"
                    placeholder="Enter Product Price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="1"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group
                  className="mb-3"
                >
                  <Form.Label className="text-light">Category</Form.Label>
                  <Form.Select
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    aria-label="Default select example"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option className="bg-transparent text-dark">
                      Select Category
                    </option>
                    <option className="bg-transparent text-dark" value="Mobile">
                      Mobile
                    </option>
                    <option className="bg-transparent text-dark" value="Laptop">
                      Laptop
                    </option>
                    <option className="bg-transparent text-dark" value="Tablet">
                      Tablet
                    </option>
                    <option className="bg-transparent text-dark" value="Fridge">
                      Fridge{" "}
                    </option>
                    <option className="bg-transparent text-dark" value="Tv">
                      Tv
                    </option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label className="text-light">Company</Form.Label>
                  <Form.Select
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    aria-label="Default select example"
                    onChange={(e) => setCompany(e.target.value)}
                  >
                    <option className="bg-transparent text-dark">
                      Select Comapny
                    </option>
                    <option className="bg-transparent text-dark" value="Mobile">
                      Dell
                    </option>
                    <option className="bg-transparent text-dark" value="Laptop">
                      Hp
                    </option>
                    <option className="bg-transparent text-dark" value="Tablet">
                      Lenovo
                    </option>
                    <option className="bg-transparent text-dark" value="Fridge">
                      Asus
                    </option>
                    <option className="bg-transparent text-dark" value="Tv">
                      Apple
                    </option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Col>
        {/* <Col id="img">
          <Image src={RegisterImage} className="w-100" />
        </Col> */}
      </Row>
      <Row className="justify-content-md-center">
        <Col lg={true}>
          <Form>
            <Button
              variant="otlines-primary text-light border-light"
              onClick={handleAddProduct}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
