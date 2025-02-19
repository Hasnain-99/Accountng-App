import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddLoan() {
    let { id } = useParams();
    
    const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (loanAmount.trim() === "") {
      alert("Please enter loan amount");
      return;
    } else if (loanDate.trim() === "") {
      alert("Please enter loan date");
      return;
    }
    const formData = new FormData();
    formData.append("loanAmount", loanAmount);
    formData.append("loanDate", loanDate);
    axios
      .post(
        `https://accounting.app-desk.com/employee/loan/addLoan.php?id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      navigate(`/employees/view/${id}`);
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col col-12 className="h3">
          Loan-Add New
        </Col>
      </Row>
      <Row>
        <Col col-12>
          <Form className="mt-5" encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Loan Amount</Form.Label>
              <Form.Control
                type="number"
                name="loanAmount"
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Loan Amount"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                onChange={(e) => setLoanDate(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={formSubmitHandler}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddLoan;
