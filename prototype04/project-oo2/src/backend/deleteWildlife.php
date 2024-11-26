<?php
// deleteWildlife.php
$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $stmt = $conn->prepare("DELETE FROM wildlife WHERE id = ?");
    if ($stmt) {
        $stmt->bind_param("i", $data['id']);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error executing statement']);
        }
        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Statement preparation failed']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
}

mysqli_close($conn);
?>
