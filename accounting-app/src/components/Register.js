import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import bgImg from "../assets/images/bgSidebar.gif";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Please enter your email");
      return;
    } else if (name.trim() === "") {
      alert("Please enter name");
      return;
    } else if (role.trim() === "") {
      alert("Please enter your role");
      return;
    } else if (password.trim() === "") {
      alert("Please enter a password");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("role", role);
    formData.append("password", password);
    axios
      .post("https://accounting.app-desk.com/user/register.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === "success") {
            setSuccessMessage(response.data.message);
            setTimeout(() => {
                navigate("/");
              }, 2000);
         
        } else {
          setErrorMessage(response.data.message);
          console.log(errorMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container
      fluid
      className="full-screen-container"
      style={{
        height: "60rem",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundposition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Row className="justify-content-center mt-50">
        <Col lg="4" md="6" sm="10" xs="10">
          <h2 className="text-center text-white">Administrator</h2>
          

          <Form className="" onSubmit={handleSubmit}>
          {errorMessage && <p className="text-danger text-center h4">{errorMessage}</p>}
          {successMessage && <p className="text-success text-center h4">{successMessage}</p>}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="text-white">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label className="text-white">Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                placeholder="Enter your role"
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
            <Link
              to="/"
              className="text-white"
              style={{ margin: "5px", textDecoration: "none" }}
            >
              Login
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
