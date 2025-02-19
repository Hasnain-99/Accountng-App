import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditSalary() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [salaryAmount, setSalaryAmount] = useState("");
  const [salaryDate, setSalaryDate] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://accounting.app-desk.com/employee/salary/editSalary.php?id=${id}`
      )
      .then((response) => {
        setSalaryAmount(response.data[0].employee_salary);
        setSalaryDate(response.data[0].created_date);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (salaryAmount.trim() === "") {
      alert("Please enter loan amount");
      return;
    } else if (salaryDate.trim() === "") {
      alert("Please enter loan date");
      return;
    }
    const formData = new FormData();
    formData.append("salaryAmount", salaryAmount);
    formData.append("salaryDate", salaryDate);
    axios
      .post(
        `https://accounting.app-desk.com/employee/salary/addEditSalary.php?id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/employees");
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col col-12 className="h3">
          Salary-Add New
        </Col>
      </Row>
      <Row>
        <Col col-12>
          <Form className="mt-5" encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Salary Amount</Form.Label>
              <Form.Control
                type="number"
                name="salaryAmount"
                defaultValue={salaryAmount}
                onChange={(e) => setSalaryAmount(e.target.value)}
                placeholder="Salary Amount"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="salaryDate"
                defaultValue={salaryDate}
                onChange={(e) => setSalaryDate(e.target.value)}
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

export default EditSalary;
