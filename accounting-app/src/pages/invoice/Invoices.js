import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

function Invoices() {
  let { id } = useParams();
  const [display, setDisplay] = useState("default");
  const [defaultInvoices, setDefaultInvoices] = useState([]);
  const [invoices, setInvoices] = useState([""]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };
  useEffect(() => {
    if (display === "default") {
      axios
        .get(`https://accounting.app-desk.com/invoices/getInvoice.php?id=${id}`)
        .then(function (response) {
          setDefaultInvoices(response.data);
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
        "https://accounting.app-desk.com/invoices/getInvoiceFiltered.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setInvoices(response.data);
      })
      .catch((error) => console.log(error));
    setDisplay("other");
  };
  const formatCurrency = (value) => {
    if (
      value === null ||
      value === undefined ||
      isNaN(value) ||
      value === "NaN"
    ) {
      return "";
    }

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "AED",
    });

    return currencyFormatter.format(value);
  };
  return (
    <Container fluid className="mt-5">
      <Form>
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
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Filter
        </Button>
      </Form>

      <Row className="mt-5">
        <Col className=" p-2 float-start" lg="6" md="6" sm="6" xs="6">
          <h3>Invoices</h3>
        </Col>
        <Col lg="6" md="6" sm="6" xs="6">
          <Link className="m-1 float-end" to={`/clients/payments/${id}`}>
            Payments
          </Link>
          <Link className="m-1 float-end" to={`/clients/invoices/addnew/${id}`}>
            Add Invoice
          </Link>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Amount</th>
            <th>Tax</th>
            <th>Invoice Date</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        {display === "default" && (
          <tbody>
            {defaultInvoices.map((invoice) => {
              const status =
                invoice.status === "1" ? "Available" : "Not Available";

              return (
                <tr key={invoice.id}>
                  <td>{invoice.serial}</td>
                  <td>{invoice.company_name}</td>
                  <td>{formatCurrency(invoice.sub_total)}</td>
                  <td>{formatCurrency(invoice.tax)}</td>
                  <td>{formatDate(invoice.invoice_date)}</td>
                  <td>{status}</td>
                  <td>
                    <Link to={`/clients/invoices/edit/${invoice.id}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
        {display === "other" && (
          <tbody>
            {Array.isArray(invoices) &&
              invoices.map((invoice, index) => {
                const status =
                  invoice.status === "1" ? "Available" : "Not Available";

                return (
                  <tr key={index}>
                    <td>{invoice.serial}</td>
                    <td>{invoice.company_name}</td>
                    <td>{invoice.sub_total}</td>
                    <td>{invoice.tax}</td>
                    <td>{invoice.invoice_date}</td>
                    <td>{status}</td>
                    <td>
                      <Link to={`/clients/invoices/edit/${invoice.id}`}>
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </Table>
    </Container>
  );
}

export default Invoices;
