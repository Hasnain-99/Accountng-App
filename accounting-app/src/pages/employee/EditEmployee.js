import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditEmployee() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://accounting.app-desk.com/employee/editEmployee.php?id=${id}`
      )
      .then((response) => {
        setName(response.data[0].employee_name);
        setEmail(response.data[0].employee_email);
        setPhone(response.data[0].employee_phone);
        setAdress(response.data[0].employee_adress);
        setSalary(response.data[0].employee_salary);
        setStatus(response.data[0].status);
        setJobTitle(response.data[0].job_title);
        setImage(response.data[0].employee_img);

        // console.log(data['employee_name']);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
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
        `https://accounting.app-desk.com/employee/addEditEmployee.php?id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
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
          <Form className="mt-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                defaultValue={adress}
                onChange={(e) => setAdress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                defaultValue={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                defaultValue={status}
                onChange={(e) => setStatus(e.target.value)}
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
                defaultValue={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job Title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                defaultValue={image}
                onChange={(e) => setImage(e.target.value)}
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

export default EditEmployee;
