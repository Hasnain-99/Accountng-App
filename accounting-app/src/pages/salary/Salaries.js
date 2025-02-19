import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Salaries() {
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    axios
      .get("https://accounting.app-desk.com/salaries/getSalaries.php")
      .then(function (response) {
        setSalaries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
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
      
      <Row className="mt-5">
        <Col lg="6" md="6" sm="6" xs="6">
          <h3>Salaries Details:</h3>
        </Col>
        <Col lg="6" md="6" sm="6" xs="6" className="text-end">
          <Link to="/generatesalary">Generate Salary</Link>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col lg="12" md="12" sm="12" xs="12">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee Name</th>
                <th>Salary</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary, index) => (
                <tr key={index}>
                  <td>{salary.serial}</td>
                  <td>{salary.employee_name}</td>
                  <td>{formatCurrency(salary.employee_salary)}</td>
                  <td>
                    <Link>Edit</Link>
                  </td>
                  <td>
                    <Link>Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Salaries;
