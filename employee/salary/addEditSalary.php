<?php

include '../../include/conn.php';
$id = $_GET['id'];
$salary_amount = $_POST['salaryAmount'];
$salary_date = $_POST['salaryDate'];
$sql_add_salary = "UPDATE employees SET employee_salary = '$salary_amount', created_date = '$salary_date' WHERE  id = $id";
$result = mysqli_query($con, $sql_add_salary);
?>