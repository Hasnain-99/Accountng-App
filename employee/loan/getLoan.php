<?php

include '../../include/conn.php';
$employee_id = $_GET['id'];

// Fetch loan records
$sql_get_loan = "SELECT loan_amount, date FROM employees_loans WHERE employee_id = $employee_id AND isDeleted = 0 AND loan_amount > 0";
$result_loan = $con->query($sql_get_loan);
$loan_records = array();
if ($result_loan->num_rows > 0) {
    while ($row = $result_loan->fetch_assoc()) {
        $row['type'] = 'Loan Taken';
        $loan_records[] = $row;
    }
}

// Fetch returned loan records
$sql_get_returned_loan = "SELECT loan_amount, date FROM employees_loans WHERE employee_id = $employee_id AND isDeleted = 0 AND is_returned = 1 AND loan_amount > 0";
$result_returned_loan = $con->query($sql_get_returned_loan);
$returned_loan_records = array();
if ($result_returned_loan->num_rows > 0) {
    while ($row = $result_returned_loan->fetch_assoc()) {
        $row['type'] = 'Loan Returned';
        $returned_loan_records[] = $row;
    }
}

// Combine loan records and returned loan records into a single array
$combined_records = array_merge($loan_records, $returned_loan_records);

// Sort the combined array based on the date in ascending order
usort($combined_records, function ($a, $b) {
    return strtotime($a['date']) - strtotime($b['date']);
});

header('Content-Type: application/json');
echo json_encode($combined_records);

?>