<?php 
include '../include/conn.php';

$sql = "SELECT employee_name, id FROM employees WHERE isDeleted = 0";
$result = $con->query($sql);

// Check if query was successful
if ($result) {
    // Create an array to hold the employee data
    $employees = array();

    // Fetch rows from the result set
    while ($row = $result->fetch_assoc()) {
        $employee = array(
            "employeeName" => $row['employee_name'],
            "employeeId" => $row['id']
        );

        // Add the employee to the array
        $employees[] = $employee;
    }

    // Convert the array to JSON
    $jsonResponse = json_encode($employees);

    // Set the response header to JSON
    header('Content-Type: application/json');

    // Send the JSON response
    echo $jsonResponse;
} else {
    echo "Error: " . $sql . "<br>" . $con->error;
}

// Close the connection
$con->close();
?>