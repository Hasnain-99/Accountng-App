<?php

include '../include/conn.php';

$sql_get_salaries = "SELECT e.id, e.employee_name, e.employee_salary, 
    SUM(CASE WHEN el.is_returned = 0 THEN COALESCE(el.loan_amount, 0) ELSE 0 END) - 
    SUM(CASE WHEN el.is_returned = 1 THEN COALESCE(el.loan_amount, 0) ELSE 0 END) AS total_loan_amount
    FROM employees AS e
    LEFT JOIN employees_loans AS el ON e.id = el.employee_id AND el.isDeleted = 0
    WHERE e.isDeleted = 0
    GROUP BY e.id, e.employee_name, e.employee_salary";
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