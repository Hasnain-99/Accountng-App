<?php

include '../include/conn.php';
$sql_get_salaries = "SELECT employee_name, employee_salary from employees WHERE isDeleted = 0";
//echo $sql_get_salaries;
$result = $con->query($sql_get_salaries);
$data = array();
$counter = 1;

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['serial'] = $counter++;
        $data[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($data);
?>