<?php

include '../../include/conn.php';
$id = $_GET['id'];
$loan_amount = $_POST['loanAmount'];
$loan_date = $_POST['loanDate'];
$sql_add_loan = "UPDATE employees_loans SET loan_amount = '$loan_amount', date = '$loan_date' WHERE  id = $id";
$result = mysqli_query($con, $sql_add_loan);
?>