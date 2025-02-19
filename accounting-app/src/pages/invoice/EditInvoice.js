import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function EditInvoice() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clients, setClients] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [subTotal, setSubTotal] = useState("");
  const [tax, setTax] = useState("");
  const [total, setTotal] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceNote, setInvoiceNote] = useState("");
  const [invoiceFile, setInvoiceFile] = useState("");
  const [status, setStatus] = useState("");
  const fileChangeHandler = (event) => {
    setInvoiceFile(event.target.files[0]);
  };

  useEffect(() => {
    axios
      .get("https://accounting.app-desk.com/invoices/getCompanyName.php")
      .then((response) => {
        setClientData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://accounting.app-desk.com/invoices/editInvoice.php?id=${id}`
      )
      .then((response) => {
        setInvoiceNumber(response.data[0].invoice_number);
        setClients(response.data[0].client);
        setSubTotal(response.data[0].sub_total);
        setTax(response.data[0].tax);
        setTotal(response.data[0].total);
        setInvoiceDate(response.data[0].invoice_date);
        setInvoiceNote(response.data[0].invoice_notes);
        setInvoiceFile(response.data[0].invoice_file);
        setStatus(response.data[0].status);
      });
  }, [id]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("invoiceNumber", invoiceNumber);
    formData.append("clients", clients);
    formData.append("subTotal", subTotal);
    formData.append("tax", tax);
    formData.append("total", total);
    formData.append("invoiceDate", invoiceDate);
    formData.append("invoiceNote", invoiceNote);
    formData.append("invoiceFile", invoiceFile);
    formData.append("status", status);
    axios
      .post(
        `https://accounting.app-desk.com/invoices/addEditInvoice.php?id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        toast.success("Data stored successfully!");
        setTimeout(() => {
          navigate("/invoices");
        }, 2000);
        console.log(response.data);
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
          Invoice - Add New
        </Col>
      </Row>
      <Row>
        <Col col-12>
          <Form className="mt-5" encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Invoice Number</Form.Label>
              <Form.Control
                type="text"
                name="invoiceNumber"
                placeholder="Invoice Number"
                defaultValue={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Client</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="clients"
                defaultValue={clients}
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
              <Form.Label>Subtotal</Form.Label>
              <Form.Control
                type="text"
                name="subTotal"
                defaultValue={subTotal}
                placeholder="Subtotal"
                onChange={(e) => setSubTotal(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tax</Form.Label>
              <Form.Control
                type="text"
                name="tax"
                defaultValue={tax}
                onChange={(e) => setTax(e.target.value)}
                placeholder="Tax"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="text"
                name="total"
                defaultValue={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="Total"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Invoice Date</Form.Label>
              <Form.Control
                type="date"
                name="invoiceDate"
                defaultValue={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Invoice Notes</Form.Label>
              <Form.Control
                type="text"
                name="invoiceNote"
                defaultValue={invoiceNote}
                onChange={(e) => setInvoiceNote(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Invoice File</Form.Label>
              <Form.Control
                type="file"
                name="invoiceFile"
                defaultValue={invoiceFile}
                onChange={fileChangeHandler}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="status"
                defaultValue={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option>Select Status</option>
                <option value="1">Paid</option>
                <option value="2">Unpaid</option>
              </Form.Select>
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

export default EditInvoice;
