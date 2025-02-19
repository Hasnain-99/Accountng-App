<?php 
include '../include/conn.php';
$start_date = $_POST['startDate'];
$end_date = $_POST['endDate'];
$sql_get_invoices = "SELECT I.id, I.sub_total, I.tax, I.invoice_date, I.invoice_file, I.status, C.company_name 
FROM invoices I
JOIN companies C ON I.client_id = C.id 
WHERE I.invoice_date BETWEEN '" . $start_date . "' AND '" . $end_date . "'";
//echo $sql_get_invoices;
$result = $con->query($sql_get_invoices);

if ($result === false) {
    die("Error executing query: " . $con->error);
}

$data = array();
$counter = 1;

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['serial'] = $counter++;
        $data[] = $row;
    }
}

header('Content-Type: application/json');
print json_encode($data);
//include '../include/conn.php';
//$start_date = $_POST['startDate'];
////echo 'here';
////echo $start_date;
//$end_date = $_POST['endDate'];
//$sql_get_invoices = "SELECT * FROM invoices WHERE payment_date BETWEEN '$start_date' AND '$end_date'";
////echo $sql_get_payments;
//$result = $con->query($sql_get_invoices);
//$data = array();
//$counter = 1;
////$index = 0;
//if ($result->num_rows > 0) {
//    while ($row = $result->fetch_assoc()) {
//        $row['serial'] = $counter++;
//        $data[] = $row;
////        $index++;
//    }
//}
//header('Content-Type: application/json');
////echo json_encode($data);
//print json_encode($data);
//<?php


?>
