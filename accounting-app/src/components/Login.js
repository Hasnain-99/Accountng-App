import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bgImg from "../assets/images/bgSidebar.gif";

const Login = ({ onLogin}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Please enter a valid username");
      return;
    } else if (password.trim() === "") {
      alert("Please enter your password");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("https://accounting.app-desk.com/user/login.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response.data.status === "success") {
          onLogin();
          navigate("/clients");
        } else {
          setLoginError(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
   
  };
  return (
    <Container fluid className="full-screen-container" style={{
        
        height:"60rem",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundposition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <Row className="justify-content-center mt-50">
        <Col lg="4" md="6" sm="10" xs="10">
          <h2 className="text-center text-white">Administrator</h2>
          <Form className="" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="text-white">Username</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </Form.Group>
            {loginError && (
              <p className="text-danger h5">Invalid email or password</p>
            )}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
