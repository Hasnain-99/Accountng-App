<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
error_reporting(E_ALL);
if (!session_start()) {
    session_start();
}
$dbhostname = 'localhost';
$dbusername = 'root';
$dbpassword = '';
$dbname = 'accountingdb';

$con = mysqli_connect($dbhostname, $dbusername, $dbpassword, $dbname);
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
$basepath = 'http://accounting.oo/';

//echo 'here';
?>