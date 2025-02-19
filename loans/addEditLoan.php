<?php

include '../include/conn.php';
$id = $_GET['id'];
$loan_amount = $_POST['loanAmount'];
$loan_date = $_POST['loanDate'];
$employee_name = $_POST['employeeName'];

$sql_add_loan = "UPDATE employees_loans SET loan_amount = '$loan_amount', date = '$loan_date', employee_id = '$employee_name' WHERE  id = $id";
$result = mysqli_query($con, $sql_add_loan);
?>