import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Employees() {
  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    
    if (confirmDelete) {
      axios
        .delete(
          `https://accounting.app-desk.com/employee/deleteEmployee.php?id=${id}`
        )
        .then((response) => {
          const updatedRecords = data.filter((row) => row.id !== id);
          setData(updatedRecords);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://accounting.app-desk.com/employee/getEmployee.php")
      .then(function (response) {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col className=" p-2 float-start" lg="6" md="6" sm="6" xs="6">
          <h3>Employees</h3>
        </Col>
        <Col lg="6" md="6" sm="6" xs="6">
          <Link className="float-end" to="/addemployee">
            Add New
          </Link>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
        {data.map((row) => {
          const status = row.status === "1" ? "Available" : "Not Available";
        
          return (
            <tr key={row.id}>
              <td>{row.employee_name}</td>
              <td>{row.employee_email}</td>
              <td>{row.employee_phone}</td>
              <td>{row.employee_adress}</td>
              <td>{row.job_title}</td>
              <td>{status}</td>
              <td>
                <Link to={`/employees/view/${row.id}`}>View</Link>
              </td>
              <td>
                <Link to={`/employees/edit/${row.id}`}>Edit</Link>
              </td>
              <td>
                <Link onClick={() => handleDelete(row.id)}>Delete</Link>
              </td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Employees;
