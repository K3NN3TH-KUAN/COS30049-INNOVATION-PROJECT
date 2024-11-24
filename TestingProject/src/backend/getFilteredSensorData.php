<?php
// getFilteredSensorData.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

// Query to fetch data where sensor_id is 'redLedStatus' and value is 'ON'
$sensor_id = $_GET['sensor_id'] ?? 'buttonPressed'; // Default value if no input is given
$value = $_GET['value'] ?? 'YES';

$sql = "SELECT sensor_id, value, created_at FROM sensorData WHERE (sensor_id = ? AND value = ?) OR (sensor_id = 'soundValue' AND value > '2000')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $sensor_id, $value);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$conn->close();
?>
