<?php

include '../include/conn.php';
$id = $_GET['id'];
//print_r($_GET);

$employee_name = $_POST['name'];
$employee_email = $_POST['email'];
$employee_phone = $_POST['phone'];
$employee_adress = $_POST['adress'];
$employee_salary = $_POST['salary'];
$employee_status = $_POST['status'];
$employee_job_title = $_POST['jobTitle'];
$employee_img = $_FILES['image'];

// Upload image file to server
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES['image']['name']);
move_uploaded_file($_FILES['image']['tmp_name'], $target_file);

$sql_add_employee = "UPDATE employees SET employee_name= '$employee_name', employee_email='$employee_email', employee_phone = '$employee_phone', employee_adress = '$employee_adress', employee_salary = '$employee_salary', status = '$employee_status', job_title = '$employee_job_title', employee_img = '$target_file' WHERE  id = $id";
$result1 = mysqli_query($con, $sql_add_employee);
?>
