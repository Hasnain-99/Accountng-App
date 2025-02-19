<?php
include '../include/conn.php';
$data = json_decode(file_get_contents("php://input"), true);
$month = $data['month'] ?? '';
$year = $data['year'] ?? '';
//echo $year;die;
$query = "SELECT * FROM expenses WHERE MONTH(expense_date) = $month AND YEAR(expense_date) = $year";
//echo $query;
$result = $con->query($query);
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