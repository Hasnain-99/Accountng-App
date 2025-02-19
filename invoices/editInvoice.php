<?php

header('Content-Type: application/json');
include '../include/conn.php';
$id = $_REQUEST['id'];
//print_r($_REQUEST);
$sql_get_data = "SELECT invoice_number, client_id, sub_total, tax, total, invoice_date, invoice_notes, invoice_file, status FROM invoices WHERE id= $id";
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