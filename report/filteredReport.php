<?php
include '../include/conn.php';
$data = json_decode(file_get_contents("php://input"), true);
$month = $data['month'] ?? '';
$year = $data['year'] ?? '';
$month = mysqli_real_escape_string($con, $month);
$year = mysqli_real_escape_string($con, $year);

$sql = "SELECT
    CASE WHEN EXISTS (SELECT 1 FROM expenses WHERE MONTH(expense_date) = $month AND YEAR(expense_date) = $year AND expense_title = 1 AND isDeleted = 0)
         THEN (SELECT COALESCE(SUM(expense_amount), 0) FROM expenses WHERE MONTH(expense_date) = $month AND YEAR(expense_date) = $year AND expense_title = 1 AND isDeleted = 0)
         ELSE 0
    END AS Fuel,
    CASE WHEN EXISTS (SELECT 1 FROM expenses WHERE MONTH(expense_date) = $month AND YEAR(expense_date) = $year AND expense_title = 2 AND isDeleted = 0)
         THEN (SELECT COALESCE(SUM(expense_amount), 0) FROM expenses WHERE MONTH(expense_date) = $month AND YEAR(expense_date) = $year AND expense_title = 2 AND isDeleted = 0)
         ELSE 0
    END AS Food,
    CASE WHEN EXISTS (SELECT 1 FROM expenses WHERE MONTH(expense_date) = $month AND YEAR(expense_date) = $year AND expense_title = 3 AND isDeleted = 0)
         THEN (SELECT COALESCE(SUM(expense_amount), 0) FROM expenses WHERE MONTH(expense_date) = $month AND YEAR(expense_date) = $year AND expense_title = 3 AND isDeleted = 0)
         ELSE 0
    END AS Transport,
    CASE WHEN EXISTS (SELECT 1 FROM expenses WHERE MONTH(expense_date) = $month AND YEAR(expense_date) = $year AND expense_title = 4 AND isDeleted = 0)
         THEN (SELECT COALESCE(SUM(expense_amount), 0) FROM expenses WHERE MONTH(expense_date) = $month AND YEAR(expense_date) = $year AND expense_title = 4 AND isDeleted = 0)
         ELSE 0
    END AS Others,
    CASE WHEN EXISTS (SELECT 1 FROM employees_salaries WHERE MONTH(date) = $month AND YEAR(date) = $year AND isDeleted = 0)
         THEN (SELECT COALESCE(SUM(total_salary), 0) FROM employees_salaries WHERE MONTH(date) = $month AND YEAR(date) = $year AND isDeleted = 0)
         ELSE 0
    END AS salary_amount,
    CASE WHEN EXISTS (SELECT 1 FROM employees_loans WHERE MONTH(date) = $month AND YEAR(date) = $year AND isDeleted = 0)
         THEN (SELECT COALESCE(SUM(loan_amount), 0) FROM employees_loans WHERE MONTH(date) = $month AND YEAR(date) = $year AND isDeleted = 0)
         ELSE 0
    END AS loan_amount
FROM
    (SELECT 1 AS dummy) AS dummy_table
GROUP BY
    dummy_table.dummy;
"; 

$result = $con->query($sql);
$data = array();
$counter = 1;

if ($result === false) {
    echo "Error executing query: " . mysqli_error($con);
} else {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $row['serial'] = $counter++;
            $data[] = $row;
        }
    }
}

header('Content-Type: application/json');
echo json_encode($data);

?>
