<?php 
include '../../include/conn.php';
$id = $_GET['id'];
$sql_delete = "UPDATE employees SET isDeleted = 1 WHERE id = $id";

if ($con->query($sql_delete) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $con->error;
}

$con->close();

?>