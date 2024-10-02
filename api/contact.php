<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');
include "configs.php"; // include file with database connection.
if($_SERVER['REQUEST_METHOD']==="POST"){
$data = json_decode(file_get_contents("php://input"));
$name=$data->name;
$email=$data->email;
$phoneNo=$data->phoneNo;
$subject=$data->subject;
$message=$data->message;
$sql=mysqli_query($conn,"INSERT INTO contact(name,email,phoneNo,subject,message) VALUES('$name','$email','$phoneNo','$subject','$message')");
if($sql){
    echo json_encode(array("success"=>"Message sent successfully"));
}
else{
    echo json_encode(array("error"=>"Failed to send message"));
}
}
else{
    echo json_encode(array("error"=>"Method not allowed"));
}
?>