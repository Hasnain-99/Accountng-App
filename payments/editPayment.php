<?php

header('Content-Type: application/json');
include '../include/conn.php';
$id = $_REQUEST['id'];
//print_r($_REQUEST);
$sql_get_data = "SELECT transaction_id, client_id, invoice_id, payment_amount, payment_mode, payment_notes, payment_file, payment_date FROM payments WHERE id= $id";
//echo $sql_get_data; 
$result = $con->query($sql_get_data);
$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
//        $index++;
    }
}
print json_encode($data);
?>