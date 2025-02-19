<?php

include '../include/conn.php';
$id = $_REQUEST['id'];
$sql_delete_expense = "UPDATE expenses SET isDeleted = 1 WHERE id = $id";
if ($con->query($sql_delete_expense) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $con->error;
}

$con->close();
?>