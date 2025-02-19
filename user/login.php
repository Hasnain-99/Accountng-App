<?php

header('Content-Type: application/json');
include '../include/conn.php';
// Retrieve the email and password from the request
$email = $_POST['email'];
$password = $_POST['password'];
$email = $con->real_escape_string($email);

// Prepare the SQL query
$query = "SELECT * FROM users WHERE username = '$email'";
$result = $con->query($query);

// Fetch the user record
$user = $result->fetch_assoc();

// Check if the user exists and the password is correct
if ($user && password_verify($password, $user['password'])) {
    // Authentication successful
    $response = array('status' => 'success', 'message' => 'Login successful');
} else {
    // Authentication failed
    $response = array('status' => 'error', 'message' => 'Invalid email or password');
}

// Send the response back to the React application
header('Content-Type: application/json');
echo json_encode($response);

// Close the database connection
$con->close();
?>