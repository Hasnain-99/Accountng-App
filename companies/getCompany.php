<?php

include '../include/conn.php';
$sql_get_companies = "SELECT * FROM companies WHERE isDeleted = 0";
$result = $con->query($sql_get_companies);
$data = array();
//$index = 0;
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
//        $index++;
    }
}
header('Content-Type: application/json');
//echo json_encode($data);
print json_encode($data);

?>