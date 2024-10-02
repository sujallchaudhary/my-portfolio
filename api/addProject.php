<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');

include "configs.php"; // Include file with database connection.

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $projectName = $data['projectName'];
    $projectDescription = $data['projectDescription'];
    $projectDemo = $data['projectDemo'];
    $projectSourceCode = $data['projectSourceCode'];
    $isLive = $data['isLive'];
    $isSourceCode = $data['isSourceCode'];
    $password = $data['password'];
    if(md5($password) !=="b07aa5b334450f7e3440a7e14fc77cf7") {
        echo json_encode(array("error" => "Invalid password"));
        exit();
    }

    include "uploadFile.php"; // File upload handling
    list($projectImg, $status) = uploadFile($conn);
    
    if ($status !== "success") {
        echo json_encode(array("error" => "Failed to upload image"));
        exit();
    }
    $stmt = $conn->prepare("INSERT INTO projects (projectName, projectDescription, projectImg, projectDemo, projectSourceCode, isLive, isSourceCode) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $projectName, $projectDescription, $projectImg, $projectDemo, $projectSourceCode, $isLive, $isSourceCode);
    if ($stmt->execute()) {
        echo json_encode(array("success" => "Project added successfully"));
    } else {
        echo json_encode(array("error" => "Failed to add project"));
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array("error" => "Method not allowed"));
}
?>
