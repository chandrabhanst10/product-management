import "../../App.css";
import axios from "axios";
import React, { useState,useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { GoDatabase } from "react-icons/go";
import { Button } from "react-bootstrap";
import { Link} from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const ProductList = () => {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = async () => {
    axios
      .get("http://localhost:5000/api/product/all-products")
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const DeleteProduct = async (id) => {
    // alert(id)
    await axios
      .delete(`http://localhost:5000/api/product/delete-product/${id}`)
      .then((res) => {
        toast.success(res.data);
        getAllProducts();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // const handleSearch = async (e) => {
  //   let key = e.target.value;
  //   key = key.toUpperCase();
  //   console.log(key);
  //   const products = await axios(
  //     `http://localhost:5000/api/product/search-product/${key}`
  //   );
  //   if (products) {
  //     setProducts(products.data);
  //   } else {
  //     getAllProducts();
  //   }
  // };

  return (
    <div style={{ marginTop: "10px" }}>
      <Container>
        <Container className="d-flex align-items-center mb-2 mt-2 justify-content-between">
          <div className="container1">
            <GoDatabase size={50} style={{ color: "white" }} />
          </div>
          <h1 className="glow" style={{ color: "white", marginTop: "10px" }}>
            All Products
          </h1>
          <div className="container2">
            <Button
              as={Link}
              to="/add-product"
              animation="grow"
              className="button"
            >
              Add Users
            </Button>
          </div>
        </Container>
        <Table responsive className="text-light vertical-scrollable">
          <thead>
            <tr>
              {Products && (
                <>
                  <th>S NO</th>
                  <th>Name</th>
                  <th> Description</th>
                  <th>Company</th>
                  <th>category</th>
                  <th>Created By</th>
                  <th>Operation</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {Products.map((product, index) => (
              <tr key={product._id}>
                <td key={index}>{index + 1}</td>
                <td key={product.name}>{product.name}</td>
                <td key={product.description}>{product.description}</td>
                <td key={product.company}>{product.company}</td>
                <td key={product.category}>{product.category}</td>
                <td key={product.user}>{product.user}</td>
                <td key={"operation"}>
                  <Container className="justify-content-around d-flex">
                    <AiFillEdit
                      color="yellow"
                      enableBackground={"white"}
                      size={20}
                      as={Link}
                      to={`/update/${product._id}`}
                    />
                    <AiFillDelete
                      color="red"
                      enableBackground={"white"}
                      size={20}
                      onClick={() => DeleteProduct(product._id)}
                    />
                  </Container>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ProductList;
