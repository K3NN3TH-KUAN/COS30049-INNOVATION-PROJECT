<?php
// Include database connection
$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'An error occurred. Please try again.']);
    exit;
}

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    if ($stmt) {
        $stmt->bind_param("i", $data['id']);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'An error occurred. Please try again.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'An error occurred. Please try again.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
}

mysqli_close($conn);
?>
