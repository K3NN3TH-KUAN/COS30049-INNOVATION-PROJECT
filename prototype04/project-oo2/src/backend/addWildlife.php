<?php
// addWildlife.php
$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

// Sanitize input data
$species_name = htmlspecialchars($data['species_name'] ?? '', ENT_QUOTES, 'UTF-8');
$common_name = htmlspecialchars($data['common_name'] ?? '', ENT_QUOTES, 'UTF-8');
$scientific_name = htmlspecialchars($data['scientific_name'] ?? '', ENT_QUOTES, 'UTF-8');
$population_estimate = htmlspecialchars($data['population_estimate'] ?? '', ENT_QUOTES, 'UTF-8');
$status = htmlspecialchars($data['status'] ?? '', ENT_QUOTES, 'UTF-8');
$last_seen = htmlspecialchars($data['last_seen'] ?? '', ENT_QUOTES, 'UTF-8');

if (
    isset($data['species_name']) && isset($data['common_name']) &&
    isset($data['scientific_name']) && isset($data['population_estimate']) &&
    isset($data['status']) && isset($data['last_seen'])
) {
    $stmt = $conn->prepare("INSERT INTO wildlife (species_name, common_name, scientific_name, population_estimate, status, last_seen) 
                             VALUES (?, ?, ?, ?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("ssssss", $species_name, $common_name, $scientific_name, $population_estimate, $status, $last_seen);
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
