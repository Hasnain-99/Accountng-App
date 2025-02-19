<?php

include '../../include/conn.php';
header('Content-Type: application/json');
$id = $_REQUEST['id'];
$sql_get_loan = "SELECT * from employees_loans WHERE id = $id";
$result = $con->query($sql_get_loan); 
$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
//        $index++;
    }
}
print json_encode($data);
?>