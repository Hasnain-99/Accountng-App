<?php

include '../include/conn.php';
$id = $_GET['id'];
//print_r($_POST);
$company_name = $_POST['companyName'];
$company_contact_person = $_POST['contactPerson'];
$company_phone = $_POST['phone'];
$company_email = $_POST['email'];
$company_adress = $_POST['adress'];
$company_contract = $_POST['contract'];
$company_logo = $_FILES['logo'];
$company_status = $_POST['status'];

//$company_owner_name = $_POST['ownerName'];
$target_dir = "../uploads/";
$target_file = $target_dir . basename($_FILES['logo']['name']);
move_uploaded_file($_FILES['logo']['tmp_name'], $target_file);

$sql_add_company = "UPDATE companies SET company_name= '$company_name', company_adress = '$company_adress', company_phone = '$company_phone', company_contact_name = '$company_contact_person', company_email = '$company_email', status = '$company_status', contract_date = '$company_contract', logo = '$target_file' WHERE id = $id";
echo $sql_add_company;
//exit();
$result = mysqli_query($con, $sql_add_company);
?>