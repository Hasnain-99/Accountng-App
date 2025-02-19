import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function AddPayments() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState("");
  const [clients, setClients] = useState([""]);
  const [clientData, setClientData] = useState([]);
  const [invoices, setInvoices] = useState([""]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [paymentFile, setPaymentFile] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const fileChangeHandler = (event) => {
    setPaymentFile(event.target.files[0]);
  };
  useEffect(() => {
    axios
      .get("https://accounting.app-desk.com/payments/getCompanyName.php")
      .then((response) => {
        setClientData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://accounting.app-desk.com/payments/getInvoice.php")
      .then((response) => {
        setInvoiceData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("transactionId", transactionId);
    formData.append("clients", clients);
    formData.append("invoices", invoices);
    formData.append("amount", amount);
    formData.append("paymentMode", paymentMode);
    formData.append("paymentNotes", paymentNotes);
    formData.append("paymentFile", paymentFile);
    formData.append("paymentDate", paymentDate);
    axios
      .post(
        "https://accounting.app-desk.com/payments/addPayment.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        toast.success("Data stored successfully!");
        setTimeout(() => {
          navigate(`/clients/payments/${id}`);
        }, 2000);
      })
      .catch((error) => {
        toast.error("Error storing data. Please try again.");
        console.log(error);
      });
   
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col col-12 className="h3">
          Payment - Add New
        </Col>
      </Row>
      <Row>
        <Col col-12>
          <Form className="mt-5" encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Transaction ID/Cheque Number</Form.Label>
              <Form.Control
                type="text"
                name="transactionId"
                placeholder="Transaction ID"
                onChange={(e) => setTransactionId(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Client</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="clients"
                onChange={(e) => setClients(e.target.value)}
                required
              >
                <option>Select Client</option>
                {clientData.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.company_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Invoice</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="invoices"
                onChange={(e) => setInvoices(e.target.value)}
                required
              >
                <option>Select Invoice</option>
                {invoiceData.map((invoice) => (
                  <option key={invoice.id} value={invoice.id}>
                    {invoice.invoice_number}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                name="amount"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payment Mode</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="paymentMode"
                onChange={(e) => setPaymentMode(e.target.value)}
                required
              >
                <option>Select Mode</option>
                <option value="1">Cheque</option>
                <option value="2">Cash</option>
                <option value="3">Online Transfer</option>
                <option value="4">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payment Notes</Form.Label>
              <Form.Control
                type="text"
                name="paymentNotes"
                placeholder="Company Phone Number"
                onChange={(e) => setPaymentNotes(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payment File</Form.Label>
              <Form.Control
                type="file"
                name="paymentFile"
                onChange={fileChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date"
                name="paymentDate"
                placeholder="Payment Date"
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={formSubmitHandler}>
              Submit
            </Button>
          </Form>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default AddPayments;
