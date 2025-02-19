import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Loan from "./loan/Loan";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewEmployee() {
  const [employeeData, setEmployeeData] = useState([]);
  const [image, setImage] = useState("");
  console.log(image);
  let { id } = useParams();
  console.log(employeeData);
  useEffect(() => {
    axios
      .get("https://accounting.app-desk.com/employee/getImage.php")
      .then((response) => {
        setImage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://accounting.app-desk.com/employee/viewEmployee.php?id=${id}`
      )
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value) || isNaN(parseFloat(value))) {
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
      {employeeData.map((employee) => {
        const formattedCreatedDate = new Date(
          employee.created_date
        ).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });
        const status = employee.status === "1" ? "Available" : "Not Available";

        return (
          <Row key={employee.id}>
            <Col
              lg="4"
              md="4"
              sm="12"
              xs="12"
              className=" justify-content-start"
            >
              <div>
                <img
                  className="w-100 h-25"
                  src={require("../uploads/imagePlaceholder.jpg")}
                  alt="pic"
                />
              </div>
            </Col>

            <Col
              lg="4"
              md="4"
              sm="12"
              xs="12"
              className="justify-content-start"
            >
              <div>
                <h5 className="mt-3">Name: {employee.employee_name}</h5>
                <h5 className="mt-5">Role: {employee.job_title}</h5>
                <h5 className="mt-5">Email: {employee.employee_email}</h5>
                <h5 className="mt-5">Phone: {employee.employee_phone}</h5>
              </div>
            </Col>
            <Col
              lg="4"
              md="4"
              sm="12"
              xs="12"
              className="justify-content-start"
            >
              <h5 className="mt-3">Address: {employee.employee_adress}</h5>
              <h5 className="mt-5">Status: {status}</h5>
              <h5 className="mt-5">Salary: {formatCurrency(employee.employee_salary)}</h5>
              <h5 className="mt-5">Created at: {formattedCreatedDate}</h5>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Loan />
      </Row>
    </Container>
  );
}

export default ViewEmployee;
