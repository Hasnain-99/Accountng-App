import React from "react";
import * as FaIcons from "react-icons/fa";
export const SidebarData = [
  {
    title: "Clients",
    path: "/clients",
    icon: <FaIcons.FaUserAlt />,
    cName: "nav-text",
  },
  {
    title: "Employees",
    path: "/employees",
    icon: <FaIcons.FaUsers />,
    cName: "nav-text",
  },
  {
    title: "Invoices",
    path: "/invoices",
    icon: <FaIcons.FaFileInvoice />,
    cName: "nav-text",
  },
  {
    title: "Payments",
    path: "/payments",
    icon: <FaIcons.FaMoneyBillAlt />,
    cName: "nav-text",
  },
  {
    title: "Expenses",
    path: "/expenses",
    icon: <FaIcons.FaMoneyCheck />,
    cName: "nav-text",
  },
  {
    title: "Salaries",
    path: "/salary",
    icon: <FaIcons.FaMoneyCheckAlt />,
    cName: "nav-text",
  },
  {
    title: "Loans",
    path: "/loans",
    icon: <FaIcons.FaMoneyBillWaveAlt />,
    cName: "nav-text",
  },
  {
    title: "Report",
    path: "/report",
    icon: <FaIcons.FaChartBar />,
    cName: "nav-text",
  },
  {
    title: "Register",
    path: "/register",
    icon: <FaIcons.FaUserPlus />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/",
    icon: <FaIcons.FaSignOutAlt />,
    cName: "nav-text",
  },
];
