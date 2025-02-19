<?php
include '../include/conn.php';

// Get the current month and date
$currentMonth = date('m');
$currentDate = date('Y');

$descriptionMap = [
    1 => 'Fuel',
    2 => 'Food',
    3 => 'Transport',
    4 => 'Others'
];

$query = "
    SELECT DATE(expense_date) AS date,
       CASE expense_title 
            WHEN 1 THEN 'Fuel'
            WHEN 2 THEN 'Food'
            WHEN 3 THEN 'Transport'
            WHEN 4 THEN 'Others'
            ELSE ''
       END AS description,
       expense_amount AS debit,
       NULL AS credit
FROM expenses
WHERE MONTH(expense_date) = '$currentMonth' AND YEAR(expense_date) = '$currentDate' AND isDeleted = 0
UNION
SELECT DATE(date) AS date, 'Employee Salary' AS description, total_salary AS debit, NULL AS credit
FROM employees_salaries
WHERE MONTH(date) = '$currentMonth' AND YEAR(date) = '$currentDate' AND isDeleted = 0
UNION
SELECT DATE(date) AS date, 'Loan Taken' AS description, loan_amount AS debit, NULL AS credit
FROM employees_loans
WHERE is_returned = 0 AND loan_amount > 0 AND MONTH(date) = '$currentMonth' AND YEAR(date) = '$currentDate' AND isDeleted = 0
UNION
SELECT DATE(date) AS date, 'Loan Returned' AS description, NULL AS debit, loan_amount AS credit
FROM employees_loans
WHERE is_returned = 1 AND loan_amount > 0 AND MONTH(date) = '$currentMonth' AND YEAR(date) = '$currentDate' AND isDeleted = 0
UNION
SELECT DATE(payment_date) AS date, 'Payment' AS description, NULL AS debit, payment_amount AS credit
FROM payments
WHERE payment_amount > 0 AND MONTH(payment_date) = '$currentMonth' AND YEAR(payment_date) = '$currentDate' AND isDeleted = 0
ORDER BY date ASC

";
//echo $query;die;

$result = mysqli_query($con, $query);
if (!$result) {
    echo "Query execution failed: " . mysqli_error($con);
    exit;
}

$response = array();
$serial = 1;

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        // Check if the description is a numeric value
        if (is_numeric($row['description'])) {
            // Replace the numeric value with the corresponding description
            $row['description'] = $descriptionMap[$row['description']];
        }

        $response[] = array(
            'serial' => $serial,
            'date' => $row['date'],
            'description' => $row['description'],
            'debit' => $row['debit'],
            'credit' => $row['credit']
        );
        $serial++;
    }
}

echo json_encode($response);

mysqli_close($con);
?>
