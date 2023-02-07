import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const Navigate = useNavigate();
  const params = useParams();
  const { getLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getProductDetails();
  });

  const getProductDetails = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/product/single-user/${params.id}`)
        .then((res) => {
          setName(res.data.name);
          setCompany(res.data.company);
          setCategory(res.data.category);
          setPrice(res.data.price);
          setDescription(res.data.description);
        })
        .catch((err) => {
          toast(err.message);
        });
    } catch (error) {
      toast(error.message);
      console.log(error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      if (!name || !price || !description || !category || !company) {
        return toast.warning("Fill all manditory fields");
      }
      await axios
        .update(
          `http://localhost:5000/api/product/update-product/${params.id}`,
          {
            name,
            price,
            category,
            description,
            company,
          }
        )
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
    <Container className="w-75 mt-1">
      <Container className="d-flex align-items-center mb-2 mt-2 justify-content-between">
        <h1 className="glow text-light">Update Product</h1>
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
                    className="bg-transparent text-light font-weight-bold"
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
                  <Form.Label className="text-light ">
                    Product Description
                  </Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  font-weight-bold"
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
                    className="bg-transparent text-light  font-weight-bold"
                    type="number"
                    placeholder="Enter Product Price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                    className="bg-transparent "
                    aria-label="Default select example"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                  
                    <option  value="Mobile">
                      Mobile
                    </option>
                    <option value="Laptop">Laptop</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Fridge">Fridge </option>
                    <option value="Tv">Tv</option>
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
                    className="bg-transparent "
                    aria-label="Default select example"
                    onChange={(e) => setCompany(e.target.value)}
                  >
                    <option>Select Comapny</option>
                    <option value="Mobile">Dell</option>
                    <option value="Laptop">Hp</option>
                    <option value="Tablet">Lenovo</option>
                    <option value="Fridge">Asus </option>
                    <option value="Tv">Apple</option>
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
              variant="otlines-primary text-light border-light font-weight"
              onClick={handleUpdateProduct}
            >
              Update Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProduct;
