<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include '../include/conn.php';
$employeeNames = $_POST["id"] ?? [];
$salaryAmounts = $_POST["employee_salary"] ?? [];
$loanAmounts = $_POST["loan_amount"] ?? [];
$loanReturneds = $_POST["loan_returned"] ?? [];
$loanGets = $_POST["loan_get"] ?? [];

$netAmounts = $_POST["net_amount"] ?? [];
$months = $_POST["month"] ?? [];
$years = $_POST["year"] ?? [];
if (!empty($employeeNames)) {
    $values = [];
    foreach ($employeeNames as $index => $employeeName) {
        $employeeName = mysqli_real_escape_string($con, $employeeName);
        $salaryAmount = mysqli_real_escape_string($con, $salaryAmounts[$index]);
        $loanAmount = mysqli_real_escape_string($con, $loanAmounts[$index]);
        $loanReturned = mysqli_real_escape_string($con, $loanReturneds[$index]);
        $loanGet = isset($loanGets[$index]) ? mysqli_real_escape_string($con, $loanGets[$index]) : "";

        $netAmount = mysqli_real_escape_string($con, $netAmounts[$index]);
        $month = isset($months) ? mysqli_real_escape_string($con, $months) : "";
        $year = isset($years) ? mysqli_real_escape_string($con, $years) : "";

        $values[] = "('$employeeName', '$salaryAmount', '$loanAmount', '$loanReturned', '$loanGet', '$netAmount', '$month', '$year')";
    }

    $sql = "INSERT INTO employees_salaries (employee_id, total_salary, loan_taken, loan_returned, get_loan, net_amount, month, year) VALUES " . implode(", ", $values);
//    echo $sql;
    if (mysqli_query($con, $sql)) {
        // Get the generated salaries' IDs
        $generatedSalariesIds = mysqli_insert_id($con);

        // Store the loan_returned values in the employees_loans table
        $loanReturnedValues = array_combine($employeeNames, $loanReturneds);
        $currentDate = date('Y-m-d');
        foreach ($loanReturnedValues as $employeeId => $loanReturned) {
            $employeeId = mysqli_real_escape_string($con, $employeeId);
            $loanReturned = mysqli_real_escape_string($con, $loanReturned);

            // Perform the database insert operation for each employee's loan_returned
            $loanSql = "INSERT INTO employees_loans (employee_id, loan_amount, date, is_returned) VALUES ('$employeeId', '$loanReturned', '$currentDate', '1')";
//            echo $loanSql;
            if (!mysqli_query($con, $loanSql)) {
                echo "Error inserting loan data for employee ID: $employeeId. " . mysqli_error($con);
            }

            // Insert the new loan_get data with current date and is_returned set to 0
            $loanGet = isset($loanGets[$index]) ? mysqli_real_escape_string($con, $loanGets[$index]) : "";
            echo $loanGet;
            $insertLoanGetSql = "INSERT INTO employees_loans (employee_id, loan_amount, date, is_returned) VALUES ('$employeeId', '$loanGet', '$currentDate', '0')";
            echo $insertLoanGetSql;
            if (!mysqli_query($con, $insertLoanGetSql)) {
                echo "Error inserting loan get data for employee ID: $generatedSalariesIds. " . mysqli_error($con);
            }
        }

        echo "Generated salaries, loan data, and loan get data added successfully.";
    } else {
        echo "Error inserting generated salaries: " . mysqli_error($con);
    }
} else {
    echo "No salary data received.";
}

mysqli_close($con);
?>
