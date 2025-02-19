import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("amount", amount);
    formData.append("date", date);
    axios
      .post(
        "https://accounting.app-desk.com/expenses/addExpense.php",
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
    navigate("/expenses");
  };
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col lg="12" md="12" sm="12">
          <h3>Expense - Add New</h3>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <Form
            className="mt-5"
            encType="multipart/form-data"
            onSubmit={formSubmitHandler}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                required
              >
                <option>Select title</option>
                <option value="1">Fuel</option>
                <option value="2">Food</option>
                <option value="3">Transport</option>
                <option value="4">Others</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name=""
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name=""
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddExpense;
