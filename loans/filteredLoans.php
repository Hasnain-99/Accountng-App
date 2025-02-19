<?php
include '../include/conn.php';
$data = json_decode(file_get_contents("php://input"), true);
$month = $data['month'] ?? '';
$year = $data['year'] ?? '';
$month = mysqli_real_escape_string($con, $month);
$year = mysqli_real_escape_string($con, $year);
$query = "SELECT L.loan_amount, L.id, L.date, E.employee_name 
                    FROM employees_loans L 
                    JOIN employees E ON L.employee_id = E.id 
                    WHERE L.isDeleted = 0 
                    AND MONTH(L.date) = $month 
                    AND YEAR(L.date) = $year AND L.is_returned = 0 AND L.loan_amount > 0";
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