<?php

header('Content-Type: application/json');
include '../include/conn.php';
$id = $_REQUEST['id'];
//print_r($_REQUEST);
$sql_get_data = "SELECT company_name, company_adress, company_phone, company_contact_name, company_email, status, contract_date, logo FROM companies WHERE id= $id";
//echo $sql_get_data; 
$result = $con->query($sql_get_data);
$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
//        $index++;
    }
}
print json_encode($data);
?>