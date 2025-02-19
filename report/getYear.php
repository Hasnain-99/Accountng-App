<?php 
include '../include/conn.php';
$sql = "SELECT DISTINCT YEAR(expense_date) AS year FROM expenses";
$result = mysqli_query($con, $sql);
$years = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $years[] = $row['year'];
    }
}

// Close the connection
mysqli_close($con);

// Return the unique years as JSON
header('Content-Type: application/json');
echo json_encode($years);

?>
