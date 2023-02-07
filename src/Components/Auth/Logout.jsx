import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext";

const Logout = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const Navigate = useNavigate();

  async function logOut() {
    await axios
      .get("http://localhost:5000/api/user/logout")
      .then(async (res) => {
        console.log(res.data);
        toast(res.data);

        await getLoggedIn();
        Navigate("/login");
      })
      .catch(async (err) => {
        console.log(err.data);
        toast(err.data);
        await getLoggedIn();
        Navigate("/login");
      });
  }

  return <div onClick={logOut}>Logout</div>;
};

export default Logout;
