<?php
include '../include/conn.php';
$loan_amount = $_POST['loanAmount'];
$loan_date = $_POST['loanDate'];
$employee_name = $_POST['employeeName'];
$loan_returned = $_POST['returnedAmount'];
$sql_add_loan = "INSERT INTO employees_loans ( employee_id, loan_amount, date) VALUES ('$employee_name', '$loan_amount', '$loan_date')";
//echo $sql_add_loan;
$result = mysqli_query($con, $sql_add_loan);
?>