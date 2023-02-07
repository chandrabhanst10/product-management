import React, { useState, useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FprgotPassword = () => {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  ///////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////

  const [buttonText, setButtoneText] = useState("Get Otp");
  const [headingText, setHeadingText] = useState("Enter Email Address");
  const [emailReadOnly, setEmailReadOnly] = useState(false);
  const [otpReadOnly, setOtpReadOnly] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const [token, setToken] = useState("");

  const Navigate = useNavigate();

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!email) {
     return toast.error("Enter email address");
    } 
      await axios
        .post("http://localhost:5000/api/user/forgot-password", { email })
        .then((res) => {
          if (res.data.success === true) {
            console.log(res.data);
            setShowOtpField(true);
            setButtoneText("Verify Otp");
            setHeadingText("Enter Otp");
            setEmailReadOnly(true);

            setToken(res.data.resetToken);

            toast.success(res.data.message);
          }else if(res.data.success===false){
            toast.error(res.data.message)
            Navigate('/forgor-password')
          }else if(res.data.success===null){
             toast.error(res.data.message);
             Navigate("/forgor-password");
          } else {
            toast.error("Something went wrong");
          }
        });
    
  };
  const VerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please Enter Otp");
    } else {
      await axios
        .post(`http://localhost:5000/api/user/verify-otp/${token}`, { otp })
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            setShowOtpField(true);
            setOtpReadOnly(true);
            setButtoneText("New Password");
            setHeadingText("Enter Otp");
            setEmailReadOnly(true);
            setShowPasswordField(true);
            setToken(res.data.resetToken);
            toast.success(res.data.message);
          }
          
          else if(res.data.success===false){
            console.log(res.data.message);
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.message)});
    }
  };

  const handleUpdatePassword = async () => {
    const v1 = PWD_REGEX.test(password);
    if (!v1) {
      toast.error("Invalid Entry");
      return;
    }
     await axios
       .put(`http://localhost:5000/api/user/reset-password/${token}`, {
         password,
       })
       .then((res) => {
        console.log(res.data);
         if (res.data.success === true) {
           toast.success(res.data.message);
           Navigate("/login");
         }
         if (res.data.success === false) {
           toast.success(res.data.message);
           Navigate("/forgot-password");
         }
       })
       .catch((err) => toast.error(err.message));
    }
  
  

  return (
    <Container className="w-75 mt-2">
      <h1 className="mb-2 text-light">{headingText}</h1>
      <Row>
        <Col>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    className="bg-transparent text-light  rounded-pill border-light border-2"
                    placeholder="Enter Email Address"
                    required
                    readOnly={emailReadOnly}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          {showOtpField === true && (
            <Row>
              <Col>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Enter otp</Form.Label>
                    <Form.Control
                      type="number"
                      className="bg-transparent text-light  rounded-pill border-light border-2"
                      placeholder="Enter  Otp"
                      required
                      readOnly={otpReadOnly}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          )}

          {showPasswordField === true && (
            <Row>
              <Col>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">
                      Enter New Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      className="bg-transparent text-light  rounded-pill border-light border-2"
                      placeholder="Enter New password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          )}

          {}
          <Row className="justify-content-md-center">
            <Col lg={true}>
              <Form>
                <Button
                  variant="otlines-primary text-light border-light"
                  onClick={
                    emailReadOnly === false &&
                    showOtpField === false &&
                    showPasswordField === false ? (
                      sendEmail
                    ) : emailReadOnly === true &&
                      showOtpField === true &&
                      showPasswordField === false ? (
                      VerifyOtp
                    ) : emailReadOnly === true &&
                      otpReadOnly === true &&
                      showPasswordField === true ? (
                      handleUpdatePassword
                    ) : (
                      <></>
                    )
                  }
                  className="text-light  rounded-pill border-light border-2 pl-2"
                >
                  {buttonText}
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>

        {showPasswordField === true && (
          <Container>
            <Col>
              <span className="text-light ">
                Password should contains 8 to 24 characters.
              </span>
              <span className="text-light ">
                Must include uppercase and lowercase letters, a number and a
                special character.
              </span>
              <span className="text-light ">Allowed special characters:</span>
              <span>
                <span className="text-light " aria-label="exclamation mark">
                  !
                </span>
                <span className="text-light " aria-label="at symbol">
                  @
                </span>
                <span className="text-light " aria-label="hashtag">
                  #
                </span>
                <span className="text-light " aria-label="hashtag">
                  #
                </span>
                <span className="text-light " aria-label="dollar sign">
                  $
                </span>
                <span className="text-light " aria-label="percent">
                  %
                </span>
              </span>
            </Col>
          </Container>
        )}
      </Row>
    </Container>
  );
};

export default FprgotPassword;
