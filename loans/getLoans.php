<?php

include '../include/conn.php';
$currentMonth = $_GET['month'];
$currentYear = $_GET['year'];

$sql_get_loans = "SELECT L.loan_amount, L.id , L.date, E.employee_name 
                  FROM employees_loans L 
                  JOIN employees E ON L.employee_id = E.id 
                  WHERE L.isDeleted = 0 
                  AND MONTH(L.date) = $currentMonth 
                  AND YEAR(L.date) = $currentYear 
                  AND L.is_returned = 0
                  AND L.loan_amount > 0";

$result = $con->query($sql_get_loans);
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

?>
