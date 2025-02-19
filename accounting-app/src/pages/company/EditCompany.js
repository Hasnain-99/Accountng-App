import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function AddCompany() {
  const navigate = useNavigate();
  let { id } = useParams();
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
  useEffect(() => {
    axios
      .get(
        `https://accounting.app-desk.com/companies/editCompany.php?id=${id}`
      )
      .then((response) => { 
        setCompanyName(response.data[0].company_name);
        setContactPerson(response.data[0].company_contact_name);
        setPhone(response.data[0].company_phone);
        setEmail(response.data[0].company_email);
        setAdress(response.data[0].company_adress);
        setContract(response.data[0].contract_date);
        setLogo(response.data[0].logo);
        setStatus(response.data[0].status);

        // console.log(setCompanyName(response.data[0].employee_name));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
        `https://accounting.app-desk.com/companies/addEditCompany.php?id=${id}`,
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
          Company-Edit
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
                defaultValue={companyName}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                name="contactPerson"
                onChange={(e) => setContactPerson(e.target.value)}
                defaultValue={contactPerson}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                defaultValue={phone}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={email}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="adress"
                onChange={(e) => setAdress(e.target.value)}
                defaultValue={adress}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contract Date</Form.Label>
              <Form.Control
                type="date"
                name="contract"
                onChange={(e) => setContract(e.target.value)}
                defaultValue={contract}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Logo</Form.Label>
              <Form.Control
                type="file"
                name="logo"
                onChange={fileChangeHandler}
                placeholder="Logo"
                defaultValue={logo}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="status"
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={status}
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
          <ToastContainer/>
        </Col>
      </Row>
    </Container>
  );
}

export default AddCompany;
