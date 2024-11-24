<?php
// editWildlife.php
$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if (
    isset($data['id']) && isset($data['species_name']) && isset($data['common_name']) &&
    isset($data['scientific_name']) && isset($data['population_estimate']) &&
    isset($data['status'])
) {
    $stmt = $conn->prepare("UPDATE wildlife SET species_name = ?, common_name = ?, 
                            scientific_name = ?, population_estimate = ?, 
                            status = ? WHERE id = ?");
    if ($stmt) {
        $stmt->bind_param("sssisi", $data['species_name'], $data['common_name'], $data['scientific_name'], $data['population_estimate'], $data['status'], $data['id']);
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
