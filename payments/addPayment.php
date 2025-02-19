<?php 
include '../include/conn.php';

$transaction_id = $_POST['transactionId'];
$clients = $_POST['clients'];
$invoices = $_POST['invoices'];
$amount = $_POST['amount'];
$payment_mode = $_POST['paymentMode'];
$payment_notes = $_POST['paymentNotes'];
$payment_file = $_FILES['paymentFile'];
$payment_date = $_POST['paymentDate'];

$target_dir = "../uploads/";
$target_file = $target_dir . basename($_FILES['paymentFile']['name']);
move_uploaded_file($_FILES['paymentFile']['tmp_name'], $target_file);

$sql_add_payment = "INSERT INTO payments ( transaction_id, client_id, invoice_id, payment_amount, payment_mode, payment_notes, payment_file, payment_date ) VALUES( '$transaction_id', '$clients', '$invoices', '$amount', '$payment_mode', '$payment_notes', '$target_file', '$payment_date' )";
echo $sql_add_payment;
$result = mysqli_query($con, $sql_add_payment);
?>