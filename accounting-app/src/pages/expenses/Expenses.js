import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);
  const [filterClicked, setFilterClicked] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };
  const fetchYears = () => {
    axios
      .get("https://accounting.app-desk.com/expenses/getYear.php")
      .then((response) => {
        setYears(response.data);
        setSelectedYear(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://accounting.app-desk.com/expenses/expenses.php")
      .then(function (response) {
        setExpenses(response.data);
      })
      .catch((error) => console.log(error));
    fetchYears();
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1);
    setSelectedMonth(currentMonth);
  }, []);

  const expenseMapping = {
    1: "Food",
    2: "Fuel",
    3: "Transport",
    4: "Other",
  };

  const filterHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://accounting.app-desk.com/expenses/filteredExpenses.php", {
        month: selectedMonth,
        year: selectedYear,
      })
      .then((response) => {
        setFilteredExpenses(response.data);
        setFilterClicked(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmDelete) {
      axios
        .delete(
          `https://accounting.app-desk.com/expenses/deleteExpense.php?id=${id}`
        )
        .then((response) => {
          const updatedRecords = expenses.filter((row) => row.id !== id);
          setExpenses(updatedRecords);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
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
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Month</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="selectedMonth"
            value={selectedMonth}
            onChange={handleMonthChange}
            required
          >
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Year</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="selectedYear"
            value={selectedYear}
            onChange={handleYearChange}
            required
          >
            <option value="" selected>
              Select Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={filterHandler}
          disabled={!selectedMonth || !selectedYear}
        >
          Filter
        </Button>
      </Form>
      <Row className="mt-5">
        <Col lg="6" md="6" sm="6" xs="6">
          <h3>Expenses Details:</h3>
        </Col>
        <Col lg="6" md="6" sm="6" xs="6" className="text-end">
          <Link to="/expenses/addnew">Add New Expense</Link>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col lg="12" md="12" sm="12" xs="12">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filterClicked ? (
                filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense, index) => (
                    <tr key={index}>
                      <td>{expense.serial}</td>
                      <td>{expenseMapping[expense.expense_title]}</td>
                      <td>{formatCurrency(expense.expense_amount)}</td>
                      <td>{formatDate(expense.expense_date)}</td>
                      <td>
                        <Link to={`/expenses/edit/${expense.id}`}>Edit</Link>
                      </td>
                      <td>
                        <Link onClick={() => handleDelete(expense.id)}>
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      No expenses found for the selected month and year.
                    </td>
                  </tr>
                )
              ) : (
                expenses
                  .filter((expense) => {
                    const expenseDate = new Date(expense.expense_date);
                    const expenseMonth = expenseDate.getMonth() + 1;
                    const expenseYear = expenseDate.getFullYear();
                    const currentMonth = new Date().getMonth() + 1;
                    const currentYear = new Date().getFullYear();
                    return (
                      expenseMonth === currentMonth &&
                      expenseYear === currentYear
                    );
                  })
                  .map((expense, index) => (
                    <tr key={index}>
                      <td>{expense.serial}</td>
                      <td>{expenseMapping[expense.expense_title]}</td>
                      <td>{formatCurrency(expense.expense_amount)}</td>
                      <td>{expense.expense_date}</td>
                      <td>
                        <Link to={`/expenses/edit/${expense.id}`}>Edit</Link>
                      </td>
                      <td>
                        <Link onClick={() => handleDelete(expense.id)}>
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Expenses;
