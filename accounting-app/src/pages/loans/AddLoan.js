import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddLoan() {
  const navigate = useNavigate();
  const [employeeName, setEmployeeName] = useState([]);
  const [getEmployeeName, setGetEmployeeName] = useState([]);
  const [loanAmount, setLoanAmount] = useState("");
  const [loanDate, setLoanDate] = useState("");
  useEffect(() => {
    axios
      .get("https://accounting.app-desk.com/loans/getEmployeeName.php")
      .then((response) => {
        setGetEmployeeName(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (loanAmount.trim() === "") {
      alert("Please enter loan amount");
      return;
    } else if (loanDate.trim() === "") {
      alert("Please enter loan date");
      return;
    }
    if (employeeName.trim() === "") {
      alert("Please select employee Name");
      return;
    } 
    const formData = new FormData();
    formData.append("loanAmount", loanAmount);
    formData.append("loanDate", loanDate);
    formData.append("employeeName", employeeName);

    axios
      .post("https://accounting.app-desk.com/loans/addLoan.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/loans");
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
              <Form.Label>Employee Name</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="employeeName"
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              >
                <option value="">Select Employee</option>
                {getEmployeeName.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.employeeName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
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
