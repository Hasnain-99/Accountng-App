<?php
include '../../include/conn.php';
$employee_id = $_GET['id'];
$loan_amount = $_POST['loanAmount'];
$loan_date = $_POST['loanDate'];
$sql_add_loan = "INSERT INTO employees_loans (employee_id, loan_amount, date) VALUES ('$employee_id', '$loan_amount', '$loan_date')";
echo $sql_add_loan;
$result = mysqli_query($con, $sql_add_loan);
?>