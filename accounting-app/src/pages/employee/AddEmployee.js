import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [image, setImage] = useState("");
  const [newRecord, setNewRecord] = useState(null);

  const fileChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    } else if (email.trim() === "") {
      alert("Please enter a valid email");
      return;
    } else if (phone.trim() === "") {
      alert("Please enter a valid phone number");
      return;
    } else if (adress.trim() === "") {
      alert("Please enter a valid adress");
      return;
    } else if (salary.trim() === "") {
      alert("Please enter employee salary");
      return;
    } else if (status.trim() === "") {
      alert("Please select a status");
      return;
    } else if (jobTitle.trim() === "") {
      alert("Please enter your Job title");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("adress", adress);
    formData.append("salary", salary);
    formData.append("status", status);
    formData.append("jobTitle", jobTitle);
    formData.append("image", image);

    axios
      .post(
        "https://accounting.app-desk.com/employee/addEmployee.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setNewRecord(response.data);
        toast.success("Data stored successfully!");
        setTimeout(() => {
          navigate("/employees");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Error storing data. Please try again.");
        console.log(error);
      });
   
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col col-12 className="h3">
          Employee-Add New
        </Col>
      </Row>
      <Row>
        <Col col-12>
          <Form className="mt-5" encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="adress"
                onChange={(e) => setAdress(e.target.value)}
                placeholder="Enter Address"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter Salary"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="status"
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option>Open this select menu</option>
                <option value="1">Available</option>
                <option value="2">Not Available</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="job_title"
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job Title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={fileChangeHandler}
                placeholder=""
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={formSubmitHandler}>
              Submit
            </Button>
          </Form>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default AddEmployee;
