<?php

include '../include/conn.php';

$expense_title = $_POST['title'];
$expense_amount = $_POST['amount'];
$expense_date = $_POST['date'];

$sql_add_expense = "INSERT INTO expenses(expense_title, expense_amount, expense_date) VALUES('$expense_title', '$expense_amount', '$expense_date') ";
echo $sql_add_expense;
$result = mysqli_query($con, $sql_add_expense);
?>