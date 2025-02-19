<?php
header('Content-Type: application/json');
include '../include/conn.php';
$id = $_REQUEST['id'];
//print_r($_REQUEST);
$sql_get_data = "SELECT employee_name, employee_email, employee_phone, employee_adress, status, job_title, employee_img, employee_salary FROM employees WHERE id= $id";
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