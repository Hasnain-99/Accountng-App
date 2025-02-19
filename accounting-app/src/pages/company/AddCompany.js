import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [contract, setContract] = useState("");
  const [logo, setLogo] = useState("");
  const [status, setStatus] = useState("");
  const fileChangeHandler = (event) => {
    setLogo(event.target.files[0]);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("contactPerson", contactPerson);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("adress", adress);
    formData.append("contract", contract);
    formData.append("logo", logo);
    formData.append("status", status);
    axios
      .post(
        "https://accounting.app-desk.com/companies/addCompany.php",
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
          navigate("/clients");
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
          Company-Add New
        </Col>
      </Row>
      <Row>
        <Col col-12>
          <Form className="mt-5" encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                name="contactPerson"
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="Contact Person"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Company Phone Number"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Company Email Adress"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="adress"
                onChange={(e) => setAdress(e.target.value)}
                placeholder="Company Address"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contract Date</Form.Label>
              <Form.Control
                type="date"
                name="contract"
                onChange={(e) => setContract(e.target.value)}
                placeholder="Contract Date"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Logo</Form.Label>
              <Form.Control
                type="file"
                name="Logo"
                onChange={fileChangeHandler}
                placeholder="Logo"
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

export default AddCompany;
