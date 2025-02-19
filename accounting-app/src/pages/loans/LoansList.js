import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
function LoansList() {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);
  const [isFilterButtonClicked, setIsFilterButtonClicked] = useState(false);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
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
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    axios
      .get("https://accounting.app-desk.com/loans/getLoans.php", {
        params: {
          month: currentMonth,
          year: currentYear,
        },
      })
      .then(function (response) {
        setLoans(response.data);
      })
      .catch((error) => console.log(error));
    setSelectedMonth(currentMonth.toString());
    setSelectedYear(currentYear.toString());
    fetchYears();
  }, []);
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const filterHandler = (e) => {
    e.preventDefault();
    setIsFilterButtonClicked(true);
    setFilterTrigger(!filterTrigger);
    axios
      .post("https://accounting.app-desk.com/loans/filteredLoans.php", {
        month: selectedMonth,
        year: selectedYear,
      })
      .then(function (response) {
        setFilteredLoans(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchYears = () => {
    axios
      .get("https://accounting.app-desk.com/loans/getYear.php")
      .then((response) => {
        setYears(response.data);
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
        .delete(`https://accounting.app-desk.com/loans/deleteLoan.php?id=${id}`)
        .then((response) => {
          const updatedRecords = loans.filter((row) => row.id !== id);
          setLoans(updatedRecords);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("clicked!!!");
    }
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
            <option value="">Select Year</option>
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
          <h3>Loans Details:</h3>
        </Col>
        <Col lg="6" md="6" sm="6" xs="6" className="text-end">
          <Link to="/addloan">Add New Loan</Link>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col lg="12" md="12" sm="12" xs="12">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Taken By</th>
                <th>Loan Amount</th>
                <th>Date</th>

                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {isFilterButtonClicked ? (
                filteredLoans.length > 0 ? (
                  filteredLoans.map((loan, index) => (
                    <tr key={loan.id}>
                      <td>{loan.serial}</td>
                      <td>{loan.employee_name}</td>
                      <td>{formatCurrency(loan.loan_amount)}</td>
                      <td>{formatDate(loan.date)}</td>
                      <td>
                        <Link to={`/editloan/${loan.id}`}>Edit</Link>
                      </td>
                      <td>
                        <Link onClick={() => handleDelete(loan.id)}>
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      No loans found for the selected month and year.
                    </td>
                  </tr>
                )
              ) : (
                loans
                  .filter((loan) => {
                    // Filter loans for the current month and year
                    const currentDate = new Date();
                    const currentMonth = currentDate.getMonth() + 1;
                    const currentYear = currentDate.getFullYear();
                    const loanDate = new Date(loan.date);
                    const loanMonth = loanDate.getMonth() + 1;
                    const loanYear = loanDate.getFullYear();
                    return (
                      loanMonth === currentMonth && loanYear === currentYear
                    );
                  })
                  .map((loan, index) => (
                    <tr key={loan.id}>
                      <td>{loan.serial}</td>
                      <td>{loan.employee_name}</td>
                      <td>{formatCurrency(loan.loan_amount)}</td>
                      <td>{loan.date}</td>
                      <td>
                        <Link to={`/editloan/${loan.id}`}>Edit</Link>
                      </td>
                      <td>
                        <Link onClick={() => handleDelete(loan.id)}>
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

export default LoansList;
