import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "./components/SideBar";
import Welcome from "./pages/Welcome";
import Invoices from "./pages/invoice/Invoices";
import Payments from "./pages/payment/Payments";
import Employees from "./pages/employee/Employees";
import Companies from "./pages/company/Companies";
import AddEmployee from "./pages/employee/AddEmployee";
import EditEmployee from "./pages/employee/EditEmployee";
import ViewEmployee from "./pages/employee/ViewEmployee";
import AddCompany from "./pages/company/AddCompany";
import EditCompany from "./pages/company/EditCompany";
import AddInvoice from "./pages/invoice/AddInvoice";
import AddPayments from "./pages/payment/AddPayments";
import EditInvoice from "./pages/invoice/EditInvoice";
import EditPayments from "./pages/payment/EditPayments";
import Expenses from "./pages/expenses/Expenses";
import AddExpense from "./pages/expenses/AddExpense";
import EditExpense from "./pages/expenses/EditExpense";
import AddLoan from "./pages/loans/AddLoan";
import AddSalary from "./pages/employee/salary/AddSalary";
import EditLoan from "./pages/loans/EditLoan";
import EditSalary from "./pages/employee/salary/EditSalary";
import Login from "./components/Login";
import Register from "./components/Register";
import LoansList from "./pages/loans/LoansList";
import Salaries from "./pages/salary/Salaries";
import GenerateSalary from "./pages/salary/GenerateSalary";
import GetAllPayments from "./pages/payment/GetAllPayments";
import AddPayment from "./pages/payment/AddPayment";
import AllInvoices from "./pages/invoice/AllInvoices";
import AddInvoices from "./pages/invoice/AddInvoices";
import DetailedReport from "./pages/reports/DetailedReport";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [sidebar, setSidebar] = useState(true);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const navigate = useNavigate();
  const SESSION_TIMEOUT = 30 * 60 * 1000;
  useEffect(() => {
    const isLargeScreen = window.innerWidth >= 992;
    setSidebar(isLargeScreen);
  }, []);
  useEffect(() => {
    const handleUserActivity = () => {
      setLastActiveTime(Date.now());
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, []);
  const checkSessionTimeout = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastActiveTime;

    if (elapsedTime > SESSION_TIMEOUT) {
      handleLogout();
    }
  };
  useEffect(() => {
    const intervalId = setInterval(checkSessionTimeout, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [lastActiveTime]);

  const showSidebar = () => {
    if (window.innerWidth < 992) {
      setSidebar(!sidebar);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    setLastActiveTime(Date.now());
    navigate("/");
  };

  const requireAuth = (to) => {
    if (!isAuthenticated && to !== "/") {
      navigate("/");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 992;
      if (isLargeScreen && !sidebar) {
        setSidebar(true);
      } else if (!isLargeScreen && sidebar) {
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebar]);

  return (
    <div>
      <Container fluid style={{ paddingRight: "10px" }}>
        <Row>
          {isAuthenticated && (
            <Col lg="3" md="4" sm="2" xs="2">
              <SideBar
                sidebar={sidebar}
                showSidebar={showSidebar}
                handleLogout={handleLogout}
              />
            </Col>
          )}
          <Col
            style={{ fontSize: "12px" }}
            lg={isAuthenticated || !sidebar ? "9" : "12"}
            md={isAuthenticated || !sidebar ? "8" : "12"}
            sm={isAuthenticated || !sidebar ? "10" : "12"}
            xs={isAuthenticated || !sidebar ? "10" : "12"}
          >
            <Routes>
              {!isAuthenticated && (
                <>
                  <Route path="/" element={<Login onLogin={handleLogin} />} />
                </>
              )}
              {isAuthenticated && (
                <>
                  <Route
                    path="/welcome"
                    element={<Welcome />}
                    beforeEnter={() => requireAuth("/welcome")}
                  />
                  <Route
                    path="/clients"
                    element={<Companies />}
                    beforeEnter={() => requireAuth("/clients")}
                  />
                  <Route
                    path="/employees"
                    element={<Employees />}
                    beforeEnter={() => requireAuth("/employees")}
                  />
                  <Route
                    path="/report"
                    element={<DetailedReport />}
                    beforeEnter={() => requireAuth("/report")}
                  />
                  <Route
                    path="/expenses"
                    element={<Expenses />}
                    beforeEnter={() => requireAuth("/expenses")}
                  />
                  <Route
                    path="/loans"
                    element={<LoansList />}
                    beforeEnter={() => requireAuth("/loans")}
                  />
                  <Route
                    path="/addemployee"
                    element={<AddEmployee />}
                    beforeEnter={() => requireAuth("/addemployee")}
                  />
                  <Route
                    path="/employees/edit/:id"
                    element={<EditEmployee />}
                    beforeEnter={() => requireAuth("/employees/edit/:id")}
                  />
                  <Route
                    path="/employees/view/:id"
                    element={<ViewEmployee />}
                    beforeEnter={() => requireAuth("/employees/view/:id")}
                  />
                  <Route
                    path="/clients/addnew"
                    element={<AddCompany />}
                    beforeEnter={() => requireAuth("/clients/addnew")}
                  />
                  <Route
                    path="/clients/edit/:id"
                    element={<EditCompany />}
                    beforeEnter={() => requireAuth("/clients/edit/:id")}
                  />
                  <Route
                    path="/clients/invoices/:id"
                    element={<Invoices />}
                    beforeEnter={() => requireAuth("/clients/invoices/:id")}
                  />
                  <Route
                    path="/clients/payments/:id"
                    element={<Payments />}
                    beforeEnter={() => requireAuth("/clients/payments/:id")}
                  />
                  <Route
                    path="/clients/invoices/addnew/:id"
                    element={<AddInvoice />}
                    beforeEnter={() =>
                      requireAuth("/clients/invoices/addnew/:id")
                    }
                  />
                  <Route
                    path="/clients/payments/addnew/:id"
                    element={<AddPayments />}
                    beforeEnter={() =>
                      requireAuth("/clients/payments/addnew/:id")
                    }
                  />
                  <Route
                    path="/clients/invoices/edit/:id"
                    element={<EditInvoice />}
                    beforeEnter={() =>
                      requireAuth("/clients/invoices/edit/:id")
                    }
                  />
                  <Route
                    path="/clients/payments/edit/:id"
                    element={<EditPayments />}
                    beforeEnter={() =>
                      requireAuth("/clients/payments/edit/:id")
                    }
                  />
                  <Route
                    path="/expenses/addnew"
                    element={<AddExpense />}
                    beforeEnter={() => requireAuth("/expenses/addnew")}
                  />
                  <Route
                    path="/expenses/edit/:id"
                    element={<EditExpense />}
                    beforeEnter={() => requireAuth("/expenses/edit/:id")}
                  />
                  <Route
                    path="/addloan"
                    element={<AddLoan />}
                    beforeEnter={() => requireAuth("/addloan")}
                  />
                  <Route
                    path="/employees/addsalary/:id"
                    element={<AddSalary />}
                    beforeEnter={() => requireAuth("/employees/addsalary/:id")}
                  />
                  <Route
                    path="/editloan/:id"
                    element={<EditLoan />}
                    beforeEnter={() => requireAuth("/editloan/:id")}
                  />
                  <Route
                    path="/employees/editsalary/:id"
                    element={<EditSalary />}
                    beforeEnter={() => requireAuth("/employees/editsalary/:id")}
                  />
                  <Route
                    path="/salary"
                    element={<Salaries />}
                    beforeEnter={() => requireAuth("/salary")}
                  />
                  <Route
                    path="/generatesalary"
                    element={<GenerateSalary />}
                    beforeEnter={() => requireAuth("/generatesalary")}
                  />
                  <Route
                    path="/payments"
                    element={<GetAllPayments />}
                    beforeEnter={() => requireAuth("/payments")}
                  />
                  <Route
                    path="/payments/addnew"
                    element={<AddPayment />}
                    beforeEnter={() => requireAuth("/payments/addnew")}
                  />
                  <Route
                    path="/invoices"
                    element={<AllInvoices />}
                    beforeEnter={() => requireAuth("/invoices")}
                  />
                  <Route
                    path="/invoices/addnew"
                    element={<AddInvoices />}
                    beforeEnter={() => requireAuth("/invoices/addnew")}
                  />
                  <Route
                    path="/register"
                    element={<Register />}
                    beforeEnter={() => requireAuth("/register")}
                  />
                </>
              )}
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
