<?php

include '../include/conn.php';

//print_r($_POST);exit;
$employee_name = $_POST['name'];
$employee_email = $_POST['email'];
$employee_phone = $_POST['phone'];
$employee_adress = $_POST['adress'];
$employee_salary = $_POST['salary'];
$employee_status = $_POST['status'];
$employee_job_title = $_POST['jobTitle'];
$employee_img = $_FILES['image'];

$target_dir = "../uploads/";
//$target_dir = "../accounting-app/src/pages/employee/uploads/";
$target_file = $target_dir . basename($_FILES['image']['name']);
move_uploaded_file($_FILES['image']['tmp_name'], $target_file);

$sql_add_employee = "INSERT INTO employees(employee_name, employee_email, employee_phone, employee_adress, status, job_title, employee_img, employee_salary)VALUES('$employee_name', '$employee_email', '$employee_phone', '$employee_adress', '$employee_status', '$employee_job_title', '$target_file', '$employee_salary')";
//echo $sql_add_employee;die;
$result = mysqli_query($con, $sql_add_employee);
?>

I have completed my bachelors degree back in August 2022. 
From the university life I have been working on small projects.
In August 2022, I joined App-Desk Inc, a company in Rawalpindi Pakistan, where I was hired as an internee.
After a period of 3 months, I got promotion to the Role of Junior Frontend Web Developer.
I have knowledge of working in React Js and Php. Adding more, 
I have also knowledge of React Bootstrap, Simple Css, Bootstrap and using Firebase with React JS.

Junior Frontend Developer (Remote Internship – IT)
BRASÍLIA, BRAZILFRONTEND DEVELOPMENTREMOTE INTERNSHIPREMOTE