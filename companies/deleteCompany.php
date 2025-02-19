<?php

include '../include/conn.php';

$id = $_GET['id'];
$sql_delete = "UPDATE companies SET isDeleted = 1 WHERE id = $id";
//echo $sql_delete;
//exit;
if ($con->query($sql_delete) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $con->error;
}

$con->close();
?>