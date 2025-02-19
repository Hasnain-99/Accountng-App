<?php

include '../include/conn.php';

$invoice_number = $_POST['invoiceNumber']; 
$client= $_POST['clients'];
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

$sql_add_invoice = "INSERT INTO invoices (invoice_number, client_id, sub_total, tax, total, invoice_date, invoice_notes, invoice_file, status) VALUES( '$invoice_number', '$client', '$sub_total', '$tax', '$total', '$invoice_date', '$invoice_note', '$target_file', '$status' ) ";
//echo $sql_add_invoice;
$result = mysqli_query($con, $sql_add_invoice);
?>