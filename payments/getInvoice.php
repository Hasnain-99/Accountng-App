<?php

header('Content-Type: application/json');
include '../include/conn.php';

$sql_get_invoice = "SELECT id, invoice_number FROM invoices";
$result = $con->query($sql_get_invoice);
$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
//        $index++;
    }
}
print json_encode($data);
?>