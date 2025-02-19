<?php

include '../include/conn.php';
$id = $_GET['id'];
//echo $id;
$invoice_number = $_POST['invoiceNumber'];
$client = $_POST['clients'];
$sub_total = $_POST['subTotal'];
$tax = $_POST['tax'];
$total = $_POST['total'];
$invoice_date = $_POST['invoiceDate'];
$invoice_note = $_POST['invoiceNote'];
$invoice_file = $_FILES['invoiceFile'];
$status = $_POST['status'];

$target_dir = "../uploads/";
$target_file = $target_dir . basename($_FILES['invoiceFile']['name']);
move_uploaded_file($_FILES['invoiceFile']['tmp_name'], $target_file);

$sql_add_invoice = "UPDATE invoices SET invoice_number = '$invoice_number', client_id ='$client', sub_total = '$sub_total', tax = '$tax', total = '$total', invoice_date = '$invoice_date', invoice_notes = '$invoice_note', invoice_file = '$target_file', status = '$status'  WHERE  id = $id ";
//echo $sql_add_invoice;
$result = mysqli_query($con, $sql_add_invoice);
?>