import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Companies() {
  const [company, setCompany] = useState([]);
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmDelete) {
      axios
        .delete(
          `https://accounting.app-desk.com/companies/deleteCompany.php?id=${id}`
        )
        .then((response) => {
          const updatedRecords = company.filter((row) => row.id !== id);
          setCompany(updatedRecords);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("clicked!!!");
    }
  };
  useEffect(() => {
    axios
      .get("https://accounting.app-desk.com/companies/getCompany.php")
      .then(function (response) {
        setCompany(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col className=" p-2 float-start" lg="6" md="6" sm="6" xs="6">
          <h3>Clients</h3>
        </Col>
        <Col lg="6" md="6" sm="6" xs="6">
          <Link className="float-end" to="/clients/addnew">
            Add New
          </Link>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Contact Person</th>
            <th>Contact Phone</th>
            <th>Contact Email</th>
            <th>Invoices</th>
            <th>Payments</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {company.map((row) => (
            <tr>
              <td>{row.company_name}</td>
              <td>{row.company_contact_name}</td>
              <td>{row.company_phone}</td>
              <td>{row.company_email}</td>
              <td>
                <Link to={`/clients/invoices/${row.id}`}>Invoices</Link>
              </td>
              <td>
                <Link to={`/clients/payments/${row.id}`}>Payments</Link>
              </td>
              <td>
                <Link to={`/clients/edit/${row.id}`}>Edit</Link>
              </td>
              <td>
                <Link onClick={() => handleDelete(row.id)}>Delete</Link>
              </td>

              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Companies;
