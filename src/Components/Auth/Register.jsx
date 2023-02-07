import React, { useState, useContext, useEffect, useRef } from "react";
//fontawsome import
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
//email validation
function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  toast.error("You have entered an invalid email address!");
  return false;
}
const Register = () => {
  //validations
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const Navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  //useeffects
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

 

  //handle register
  async function handleRegister(e) {
    e.preventDefault();
    // if button enabled with JS hack

    const v1 = PWD_REGEX.test(password);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }
    await ValidateEmail(email);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        { name, email, password, phone, role }
      );
      // TODO: remove console.logs before deployment
      // console.log(JSON.stringify(response?.data));
      if(response.data.success===true){
        toast.success(response.data.message);
         toast.success("User Registered");  
         await getLoggedIn();
         Navigate("/");
      }
      if(response.data.success===false){
        toast.success(response.data.message);
         toast.success("User Registered");  
         Navigate("/register");
      }
     
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
        toast.error("No Server Response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username Taken");
        toast.error("Username Taken");
      } else {
        setErrMsg("Registration Failed");
        toast.error("Registration Failed");
      }
      errRef.current.focus();
    }
  }
  return (
    <Container className="w-75 mt-2 ">
      <h1 className="mb-2 text-light">Register</h1>
      <Row>
        <Col>
          <Row>
            <Col>
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Name</Form.Label>
                  <Form.Control
                    id="name"
                    ref={userRef}
                    autoComplete="off"
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    type="text"
                    placeholder="Enter Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group className="mb-3" c>
                  <Form.Label className="text-light">Email</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    type="email"
                    id="email"
                    autoComplete="off"
                    placeholder="Enter Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" control>
                  <Form.Label className="text-light">ContactNumber</Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    type="number"
                    placeholder="Enter Phone Number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    min="10"
                    max="10"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group className="mb-3" contro>
                  <Form.Label className="text-light">Role</Form.Label>
                  <Form.Select
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    aria-label="Default select example"
                    onChange={(e) => setRole(e.target.value)}
                  >
                  
                    <option
                      className="bg-transparent text-dark"
                      value="Developer"
                    >
                      Developer
                    </option>
                    <option className="bg-transparent text-dark" value="Tester">
                      Tester
                    </option>
                    <option
                      className="bg-transparent text-dark"
                      value="Manager"
                    >
                      Manager
                    </option>
                    <option className="bg-transparent text-dark" value="HR">
                      Human Resource
                    </option>
                    <option
                      className="bg-transparent text-dark"
                      value="Architecture"
                    >
                      Architecture
                    </option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col lg={true}>
              <Form>
                <Form.Group className="mb-3" cont>
                  <Form.Label className="text-light">
                    Password
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validPassword ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={
                        validPassword || !password ? "hide" : "invalid"
                      }
                    />
                  </Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p
                    id="pwdnote"
                    className={
                      passwordFocus && !validPassword
                        ? "instructions text-light"
                        : "offscreen text-light"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                  </p>
                </Form.Group>
              </Form>
            </Col>
            <Col lg={true}>
              <Form>
                <Form.Group className="mb-3" cont>
                  <Form.Label className="text-light">
                    Comfirm Password
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validMatch && matchPassword ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={
                        validMatch || !matchPassword ? "hide" : "invalid"
                      }
                    />
                  </Form.Label>
                  <Form.Control
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    type="password"
                    id="confirm_password"
                    placeholder="Enter Confirm Password"
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    value={matchPassword}
                    onChange={(e) => setMatchPassword(e.target.value)}
                  />
                  <p
                    id="confirmnote text-light"
                    className={
                      matchFocus && !validMatch
                        ? "instructions text-light"
                        : "offscreen text-light"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>
                </Form.Group>
                <Button
                  disabled={!validPassword || !validMatch ? true : false}
                  variant="otlines-primary text-light border-light"
                  onClick={handleRegister}
                  className="text-light  rounded-pill border-light border-2 pl-2"
                >
                  Register
                </Button>
              </Form>
              <p>
                Already registered?
                <br />
                <span className="line">
                  <a href="/login">Sign In</a>
                </span>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
