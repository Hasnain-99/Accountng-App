import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { saveAs } from "file-saver";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import { styles } from "./ReportStyles";

function DetailedReport() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [debitTotal, setDebitTotal] = useState(0);
  const [creditTotal, setCreditTotal] = useState(0);
  const [filteredReport, setFilteredReport] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [exporting, setExporting] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };

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

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    axios
      .get("https://accounting.app-desk.com/report/getDetailedReport.php")
      .then(function (response) {
        setReportData(response.data);
        calculateTotals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchYears();
    setSelectedMonth(currentMonth.toString());
    setSelectedYear(currentYear.toString());
  }, []);

  const calculateTotals = (data) => {
    let debitSum = 0;
    let creditSum = 0;

    data.forEach((item) => {
      if (item.debit) {
        debitSum += parseFloat(item.debit);
      }
      if (item.credit && !isNaN(parseFloat(item.credit))) {
        creditSum += parseFloat(item.credit);
      }
    });

    setDebitTotal(debitSum);
    setCreditTotal(creditSum);
  };

  const calculateProfit = () => {
    return creditTotal - debitTotal;
  };

  const filterHandler = (e) => {
    e.preventDefault();
    setIsFiltered(true);

    axios
      .post(
        "https://accounting.app-desk.com/report/getDetailedReportFiltered.php",
        {
          month: selectedMonth,
          year: selectedYear,
        }
      )
      .then(function (response) {
        setFilteredReport(response.data);
        calculateTotals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const ReportPDF = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Detailed Report</Text>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Serial</Text>
            <Text style={styles.headerCell}>Description</Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Debit</Text>
            <Text style={styles.headerCell}>Credit</Text>
          </View>
          {data.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.cell}>{item.serial}</Text>
              <Text style={styles.cell}>{item.description}</Text>
              <Text style={styles.cell}>{formatDate(item.date)}</Text>
              <Text style={styles.cell}>{formatCurrency(item.debit)}</Text>
              <Text style={styles.cell}>{formatCurrency(item.credit)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalCell} />
            <Text style={styles.totalCell} />
            <Text style={styles.totalCell} />
            <Text style={styles.totalCell}>{formatCurrency(debitTotal)}</Text>
            <Text style={styles.totalCell}>{formatCurrency(creditTotal)}</Text>
          </View>
          <View style={styles.profitRow}>
            <Text style={styles.profitCell} colSpan={5}>
              Profit: {formatCurrency(calculateProfit())}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const exportPDF = async () => {
    setExporting(true);

    const pdfBytes = await pdf(<ReportPDF data={filteredReport} />).toBlob();
    saveAs(pdfBytes, "detailed_report.pdf");

    setExporting(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
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
              style={{ marginLeft: "5px" }}
              type="submit"
              onClick={filterHandler}
              disabled={!selectedMonth || !selectedYear}
            >
              Filter
            </Button>
            <Button
              variant="success"
              style={{ marginLeft: "5px" }}
              onClick={exportPDF}
              disabled={!isFiltered && reportData.length === 0}
            >
              {exporting ? "Exporting..." : "Export as PDF"}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <Card className="mt-4">
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Serial</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Debit</th>
                    <th>Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {isFiltered
                    ? filteredReport.map((item, index) => (
                        <tr key={index}>
                          <td>{item.serial}</td>
                          <td>{item.description}</td>
                          <td>{formatDate(item.date)}</td>
                          <td>{formatCurrency(item.debit)}</td>
                          <td>{formatCurrency(item.credit)}</td>
                        </tr>
                      ))
                    : reportData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.serial}</td>
                          <td>{item.description}</td>
                          <td>{formatDate(item.date)}</td>
                          <td>{formatCurrency(item.debit)}</td>
                          <td>{formatCurrency(item.credit)}</td>
                        </tr>
                      ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end">
                      Total
                    </td>
                    <td>{formatCurrency(debitTotal)}</td>
                    <td>{formatCurrency(creditTotal)}</td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="text-end">
                      Profit: {formatCurrency(calculateProfit())}
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailedReport;
