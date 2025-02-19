import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function GenerateSalary() {
  const navigate = useNavigate();
  const [salary, setSalaries] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();
  const yearsToShow = [
    currentYear - 1,
    currentYear,
    currentYear + 1,
    currentYear + 2,
  ];
  useEffect(() => {
    axios
      .get("https://accounting.app-desk.com/salaries/generateSalary.php")
      .then((response) => {
        setSalaries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLoanReturnedChange = (e, index) => {
    const enteredValue = parseFloat(e.target.value) || 0;
    const updatedSalaries = salary.map((item, i) => {
      if (i === index) {
        const loanReturned = enteredValue >= 0 ? enteredValue : 0;
        const loanGet = item.loan_get || 0;
        const netAmount = item.employee_salary - loanReturned + loanGet;

        return {
          ...item,
          loan_returned: loanReturned,
          net_amount: netAmount,
        };
      }
      return item;
    });
    setSalaries(updatedSalaries);
  };

  const handleLoanGetChange = (e, index) => {
    const enteredValue = parseFloat(e.target.value) || 0;
    const updatedSalaries = salary.map((item, i) => {
      if (i === index) {
        const loanReturned = item.loan_returned || 0;
        const loanGet = enteredValue >= 0 ? enteredValue : 0;
        const netAmount = item.employee_salary - loanReturned + loanGet;

        return {
          ...item,
          loan_get: loanGet,
          net_amount: netAmount,
        };
      }
      return item;
    });

    setSalaries(updatedSalaries);
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedMonth || !selectedYear) {
      toast.error("Please select the month and year.");
      return;
    }
    const dataToSubmit = {
      month: selectedMonth,
      year: selectedYear,
      id: salary.map((item) => item.id),
      employee_name: salary.map((item) => item.employee_name),
      employee_salary: salary.map((item) => item.employee_salary),
      loan_amount: salary.map((item) => item.total_loan_amount),
      loan_returned: salary.map((item) => item.loan_returned || 0),
      loan_get: salary.map((item) => item.loan_get || 0),

      net_amount: salary.map(
        (item, index) =>
          item.employee_salary -
          (item.loan_returned || 0) +
          (item.loan_get || 0) // Updated net_amount calculation
      ),
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    axios
      .post(
        "https://accounting.app-desk.com/salaries/addGeneratedSalary.php",
        qs.stringify(dataToSubmit),
        config
      )
      .then((response) => {
        toast.success("Data stored successfully!");
        setTimeout(() => {
          navigate("/salary");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Error storing data. Please try again.");
        console.log(error);
      });
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col lg="12" md="12" sm="12" xs="12">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Month</Form.Label>
            <Form.Select
              as="select"
              name="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              required
            >
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Year</Form.Label>
            <Form.Select
              as="select"
              name="year"
              value={selectedYear}
              onChange={handleYearChange}
              required
            >
              <option value="">Select Year</option>
              {yearsToShow.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Table borderless>
            <thead>
              <tr className="text-center">
                <th>Employee Name</th>
                <th>Salary</th>
                <th>Loan Taken</th>
                <th>Loan Returned</th>
                <th>Loan Get</th>
                <th>Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {salary.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      type="text"
                      name=""
                      value={item.employee_name}
                      required
                      disabled
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name=""
                      value={item.employee_salary}
                      required
                      disabled
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name=""
                      value={item.total_loan_amount}
                      required
                      disabled
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="loanReturned"
                      required
                      placeholder="Loan Returned"
                      value={item.loan_returned || ""}
                      disabled={item.total_loan_amount === "0"}
                      onChange={(e) => handleLoanReturnedChange(e, index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="loan_get"
                      required
                      placeholder="Loan Get"
                      value={item.loan_get || ""}
                      onChange={(e) => handleLoanGetChange(e, index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name=""
                      value={item.net_amount}
                      required
                      disabled
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default GenerateSalary;
