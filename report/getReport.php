<?php
include '../include/conn.php';
$sql = "SELECT
    (SELECT COALESCE(SUM(expense_amount), 0) FROM expenses WHERE MONTH(expense_date) = MONTH(employees_loans.date) AND expense_title = 1 AND isDeleted = 0) AS fuel,
    (SELECT COALESCE(SUM(expense_amount), 0) FROM expenses WHERE MONTH(expense_date) = MONTH(employees_loans.date) AND expense_title = 2 AND isDeleted = 0) AS food,
    (SELECT COALESCE(SUM(expense_amount), 0) FROM expenses WHERE MONTH(expense_date) = MONTH(employees_loans.date) AND expense_title = 3 AND isDeleted = 0) AS transport,
    (SELECT COALESCE(SUM(expense_amount), 0) FROM expenses WHERE MONTH(expense_date) = MONTH(employees_loans.date) AND expense_title = 4 AND isDeleted = 0) AS others,
    (SELECT COALESCE(SUM(total_salary), 0) FROM employees_salaries WHERE MONTH(date) = MONTH(employees_loans.date) AND isDeleted = 0) AS salary_amount,
    (SELECT COALESCE(SUM(loan_amount), 0) FROM employees_loans WHERE MONTH(date) = MONTH(employees_loans.date) AND isDeleted = 0) AS loan_amount
FROM employees_loans
WHERE MONTH(employees_loans.date) = MONTH(CURRENT_DATE()) 
AND YEAR(employees_loans.date) = YEAR(CURRENT_DATE())
AND employees_loans.isDeleted = 0
GROUP BY MONTH(employees_loans.date)"; 

$result = $con->query($sql);
$data = array();
$counter = 1;

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $row['serial'] = $counter++;
        $data[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($data);

?>
