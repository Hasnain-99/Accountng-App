import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function GetAllPayments() {
  const [display, setDisplay] = useState("default");
  const [defaultPayments, setDefaultPayments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };
  useEffect(() => {
    if (display === "default") {
      axios
        .get("https://accounting.app-desk.com/payments/getAllPayments.php")
        .then(function (response) {
          setDefaultPayments(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    axios
      .post(
        "https://accounting.app-desk.com/payments/getAllPaymentsFiltered.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setPayments(response.data);
      })
      .catch((error) => console.log(error));
    setDisplay("other");
  };
   const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value) || value === "NaN") {
      return "";
    }
    
    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AED'
    });
  
    return currencyFormatter.format(value);
  };

  return (
    <Container fluid className="mt-5">
      <Form onSubmit={submitHandler}>
        <h3>Filter Report:</h3>
        <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            onChange={(event) => setStartDate(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            onChange={(event) => setEndDate(event.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Filter
        </Button>
      </Form>
      <Row className="mt-5">
        <Col className=" p-2 float-start" lg="6" md="6" sm="6" xs="6">
          <h3>Payments </h3>
        </Col>
        <Col lg="6" md="6" sm="6" xs="6">
          <Link className="m-1 float-end" to={"/invoices"}>
            Invoices
          </Link>
          <Link className="m-1 float-end" to={"/payments/addnew"}>
            Add Payment
          </Link>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Transaction ID</th>
            <th>Amount Paid</th>
            <th>Payment Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        {display === "default" && (
          <tbody>
            {defaultPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.serial}</td>
                <td>{payment.company_name}</td>
                <td>{payment.transaction_id}</td>
                <td>{formatCurrency(payment.payment_amount)}</td>
                <td>{formatDate(payment.payment_date)}</td>
                <td>
                  <Link to={`/clients/payments/edit/${payment.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {display === "other" && (
          <tbody>
            {Array.isArray(payments) &&
              payments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.serial}</td>
                  <td>{payment.company_name}</td>
                  <td>{payment.transaction_id}</td>
                  <td>{payment.payment_amount}</td>
                  <td>{payment.payment_date}</td>
                  <td>{payment.payment_file}</td>
                  <td>
                    <Link to={`/clients/payments/edit/${payment.id}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </Table>
    </Container>
  );
}

export default GetAllPayments;
