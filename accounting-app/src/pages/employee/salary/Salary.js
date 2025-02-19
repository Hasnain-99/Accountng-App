import React, { useState, useEffect } from "react";
import { Col, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Salary() {
  let { id } = useParams();
  const [salaries, setSalaries] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://accounting.app-desk.com/employee/salary/getSalary.php?id=${id}`
      )
      .then(function (response) {
        setSalaries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmDelete) {
      axios
        .delete(
          `https://accounting.app-desk.com/employee/salary/deleteSalary.php?id=${id}`
        )
        .then((response) => {
          const updatedRecords = salaries.filter((row) => row.id !== id);
          setSalaries(updatedRecords);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("clicked!!!");
    }
  };
  return (
    <Col lg="6" md="6" sm="12" xs="12" className="mt-5">
      <Col lg="6" md="6" sm="5" xs="6">
        <h3>Employee Salary</h3>
      </Col>
      <Col lg="6" md="6" sm="5" xs="6">
        <Link className="float-end" to={`/employees/addsalary/${id}`}>
          Add New
        </Link>
      </Col>
      <Table>
        <thead>
          <tr>
            <th>Salary</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr>
              <td> {salary.employee_salary} </td>
              <td> {salary.created_date} </td>
              <td>
                <Link to={`/employees/editsalary/${salary.id}`}>Edit</Link>
              </td>
              <td>
                <Link onClick={() => handleDelete(salary.id)}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}

export default Salary;
