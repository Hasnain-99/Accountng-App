import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

function Report() {
  const [reportData, setReportData] = useState([]);
  const [filteredReport, setFilteredReport] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const fetchYears = () => {
    axios
      .get("https://accounting.app-desk.com/report/getYear.php")
      .then((response) => {
        setYears(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    setSelectedYear(currentYear.toString());
    setSelectedMonth(currentMonth.toString());

    axios
      .get("https://accounting.app-desk.com/report/getReport.php")
      .then((response) => {
        // Transform the response data to include the expense amounts under their corresponding headings
        const transformedData = response.data.map((report) => {
          return {
            ...report,
            Fuel: report.fuel,
            Food: report.food,
            Transport: report.transport,
            Others: report.others,
          };
        });
        setReportData(transformedData);
      })
      .catch((error) => console.log(error));
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
    setIsFiltered(true);
    axios
      .post("https://accounting.app-desk.com/report/filteredReport.php", {
        month: selectedMonth,
        year: selectedYear,
      })
      .then(function (response) {
        setFilteredReport(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      <Row className="mt-5">
        <Col lg="12" md="12" sm="12">
          <Form>
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
                as="select"
                name="year"
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
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Fuel</th>
                <th>Food</th>
                <th>Transport</th>
                <th>Others</th>
                <th>Salaries</th>
                <th>Loans</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {(isFiltered ? filteredReport : reportData).map(
                (report, index) => (
                  <tr key={index}>
                    <td>{report.serial}</td>
                    <td>{report.Fuel}</td>
                    <td>{report.Food}</td>
                    <td>{report.Transport}</td>
                    <td>{report.Others}</td>
                    <td>{report.salary_amount}</td>
                    <td>{report.loan_amount}</td>
                    {/* Calculate and display the total */}
                    <td>
                      {parseFloat(report.Fuel) +
                        parseFloat(report.Food) +
                        parseFloat(report.Transport) +
                        parseFloat(report.Others) +
                        parseFloat(report.salary_amount) +
                        parseFloat(report.loan_amount)}
                    </td>
                  </tr>
                )
              )}
            </tbody>
           
          </Table>
          <Link to="/detailedreport" style={{marginTop:"10rem"}}>Detailed Report</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Report;
