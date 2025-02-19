import React, { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import {  useParams } from "react-router-dom";
import axios from "axios";

function Loan() {
  let { id } = useParams();
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://accounting.app-desk.com/employee/loan/getLoan.php?id=${id}`
      )
      .then(function (response) {
        setLoans(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };
  const loanTakenSum = loans
    .filter((loan) => loan.type === "Loan Taken")
    .reduce((total, loan) => total + parseInt(loan.loan_amount), 0);

  const loanReturnedSum = loans
    .filter((loan) => loan.type === "Loan Returned")
    .reduce((total, loan) => total + parseInt(loan.loan_amount), 0);

  const outstandingAmount = loanTakenSum - loanReturnedSum;
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
    <Card className="mt-5" lg="12" md="12" sm="12" xs="12">
      <Card.Body>
        <Card.Title>Employee Loan History</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Loan taken</th>
              <th>Loan Returned</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={index}>
                <td>{formatCurrency(loan.type === "Loan Taken" ? loan.loan_amount : "")}</td>
                <td>{formatCurrency(loan.type === "Loan Returned" ? loan.loan_amount : "")}</td>
                <td>{formatDate(loan.date)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <p>Sum of Loan Taken: {formatCurrency(loanTakenSum)}</p>
          <p>Sum of Loan Returned: {formatCurrency(loanReturnedSum)}</p>
          <p>Outstanding Amount: {formatCurrency(outstandingAmount)}</p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Loan;
