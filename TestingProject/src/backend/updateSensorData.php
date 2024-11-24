<?php
// updateSensorData.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

// Get the input data
$data = json_decode(file_get_contents('php://input'), true);

// Log received data for debugging
file_put_contents('php://stderr', print_r($data, true));

if (isset($data['sensor_id']) && isset($data['value'])) {
    // Prepare and execute the insert statement
    $stmt = $conn->prepare("INSERT INTO sensorData (sensor_id, value) VALUES (?, ?)");
    $stmt->bind_param("ss", $data['sensor_id'], $data['value']);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to insert data']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input data']);
}

// Close the database connection
mysqli_close($conn);
?>
