<?php

include '../include/conn.php';
$sql_get_companies = "SELECT I.id, I.sub_total, I.tax ,I.invoice_date,I.invoice_date, I.invoice_file, I.status, C.company_name FROM invoices I "
        . "JOIN companies C ON I.client_id = C.id;";
$result = $con->query($sql_get_companies);
$data = array();
$counter = 1;
//$index = 0;
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
         $row['serial'] = $counter++;
        $data[] = $row;
//        $index++;
    } 
}
header('Content-Type: application/json');
//echo json_encode($data);
print json_encode($data);
?>