<?php
include '../../include/conn.php';
$employee_id = $_GET['id'];
$salary_amount = $_POST['salaryAmount'];
$salary_date = $_POST['salaryDate'];
$sql_add_salary = "INSERT INTO employes_salary (employee_id, salary_amount, date) VALUES ('$employee_id', '$salary_amount', '$salary_date')";
echo $sql_add_salary;
$result = mysqli_query($con, $sql_add_salary);
?>