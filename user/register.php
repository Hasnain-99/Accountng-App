<?php 
header('Content-Type: application/json');
include '../include/conn.php';
$email = $_POST['email'];
$name = $_POST['name'];
$role = $_POST['role'];
$password = $_POST['password'];

// Validate the form data
if (empty($email) || empty($name) || empty($role) || empty($password)) {
    $response = array('status' => 'error', 'message' => 'Please provide the credentials');
} else {
    // Check if the username already exists in the database
    $query = "SELECT * FROM users WHERE username = '$email'";
    $result = $con->query($query);

    if ($result->num_rows > 0) {
        $response = array('status' => 'error', 'message' => 'Username already exists');
    } else {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert the user into the database
        $insertQuery = "INSERT INTO users (username, name, role,  password) VALUES ('$email', '$name' , '$role' ,'$hashedPassword')";
        if ($con->query($insertQuery) === TRUE) {
            $response = array('status' => 'success', 'message' => 'User registered successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error registering user');
        }
    }
}

// Send the response back to the React application
header('Content-Type: application/json');
echo json_encode($response);

// Close the database connection
$con->close();
?>