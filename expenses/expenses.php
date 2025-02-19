<?php

include '../include/conn.php';
$currentMonth = date('m');
$sql_get_expenses = "SELECT * FROM expenses WHERE MONTH(expense_date) = $currentMonth AND isDeleted = 0";

$result = $con->query($sql_get_expenses);
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