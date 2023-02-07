import axios from "axios";
import "../../App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { HiUsers } from "react-icons/hi";

const AllUsers = () => {
  const [Users, setUsers] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = async () => {
    axios
      .get("http://localhost:5000/api/user/all-users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const DeleteUser = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/user/delete-user/${id}`)
      .then((res) => {
        toast.success(res.data);
        getAllProducts();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const UpdateUser = (id) => {
    Navigate(`/update-user/${id}`);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <Container>
        <Container className="d-flex align-items-center mb-2 mt-2 justify-content-between">
          <div className="container1">
            <HiUsers size={50} style={{ color: "white" }} />
          </div>
          <h1 className="glow" style={{ color: "white", marginTop: "10px" }}>
            All Users
          </h1>
          <div className="container2">
            <Button
              as={Link}
              to="/add-user"
              animation="grow"
              className="button"
            >
              Add Users
            </Button>
          </div>
        </Container>
        <Table responsive className="text-light vertical-scrollable">
          <thead>
            <tr key={Users}>
              {Users && (
                <>
                  <th>S NO</th>
                  <th>Name</th>
                  <th> Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Is Admin</th>
                  <th>Operation</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {Users.map((user, index) => (
              <tr key={user._id}>
                <td key={index}>{index + 1}</td>
                <td key={user.name}>{user.name}</td>
                <td key={user.email}>{user.email}</td>
                <td key={user.phone}>{user.phone}</td>
                <td key={user.role}>{user.role}</td>
                <td key={user.isAdmin}>{user.isAdmin}</td>
                <td key={"operation"}>
                  <Container className="justify-content-around d-flex">
                    <AiFillEdit
                      color="yellow"
                      enableBackground={"white"}
                      size={20}
                      onClick={() => {
                        UpdateUser(user._id);
                      }}
                    />
                    <AiFillDelete
                      color="red"
                      enableBackground={"white"}
                      size={20}
                      onClick={() => DeleteUser(user._id)}
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

export default AllUsers;
