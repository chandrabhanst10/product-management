import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import AddProduct from "./Product/AddProduct";
import Header from "./Layout/Header";
import Home from "./Layout/Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import AllProducts from "./Product/AllProducts";
import AllUsers from "./User/AllUsers";
import AddUsers from "./User/AddUsers";
import UpdateProduct from "./Product/UpdateProduct";
import Profile from "./User/Profile";
import  ForgotPassword  from "./Auth/ForgotPassword";
import UpdateUser from "./User/UpdateUser";

const Router = () => {
  const  {loggedIn}  = useContext(AuthContext);
  console.log(loggedIn);
  return (
    <div>
      <Header />

      <Routes>
        {loggedIn ? (
          <>
            <Route path="/" exact element={<Home />} />
            <Route path="/add-user" exact element={<AddUsers />} />
            <Route path="/all-users" exact element={<AllUsers />} />
            <Route path="/update-user/:id" exact element={<UpdateUser />} />

            <Route path="/profile" exact element={<Profile />} />

            <Route path="/add-product" exact element={<AddProduct />} />
            <Route path="/all-products" exact element={<AllProducts />} />
            <Route
              path="/update-product/:id"
              exact
              element={<UpdateProduct />}
            />
          </>
        ) : (
          <>
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/forgot-password" exact element={<ForgotPassword />} />
          </>
        )}
      </Routes>
      {/* <Login /> */}
    </div>
  );
};

export default Router;
