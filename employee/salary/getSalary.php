<?php
include '../../include/conn.php';
$employee_id = $_GET['id'];
$sql_get_salary = "SELECT * FROM employees WHERE id = $employee_id AND isDeleted = 0";
$result = $con->query($sql_get_salary);
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