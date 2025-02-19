<?php
header('Content-Type: application/json');
include '../include/conn.php';

$sql_get_data = "SELECT id, company_name FROM companies WHERE isDeleted = 0";
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