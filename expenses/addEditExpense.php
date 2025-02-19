<?php

include '../include/conn.php';
$id = $_GET['id'];
//print_r($_GET);

$expense_title = $_POST['title'];
$expense_amount = $_POST['amount'];
$expense_date = $_POST['date'];

$sql_add_employee = "UPDATE expenses SET expense_title= '$expense_title', expense_amount='$expense_amount', expense_date = '$expense_date' WHERE  id = $id";
$result1 = mysqli_query($con, $sql_add_employee);
?>