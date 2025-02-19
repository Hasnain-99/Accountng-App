<?php

include '../include/conn.php';
$start_date = $_POST['startDate'];
$id = $_GET['id'];
//echo 'here';
//echo $start_date;
$end_date = $_POST['endDate'];
$sql_get_payments = "SELECT P.transaction_id, P.id, P.payment_amount, P.payment_date, P.payment_file, C.company_name 
FROM payments P 
JOIN companies C ON P.client_id = C.id 
WHERE P.client_id = " . $id . " 
AND P.payment_date BETWEEN '" . $start_date . "' AND '" . $end_date . "'";
//echo $sql_get_payments;
$result = $con->query($sql_get_payments);
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