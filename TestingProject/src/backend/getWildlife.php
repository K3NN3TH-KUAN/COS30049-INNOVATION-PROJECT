<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");

// Check connection
if (!$conn) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

// Prepare a statement to select wildlife data
$stmt = $conn->prepare("SELECT id, species_name, common_name, scientific_name, population_estimate, status FROM wildlife");

if (!$stmt) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare statement.', 'error' => $conn->error]);
    mysqli_close($conn);
    exit;
}

// Execute the prepared statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();

if (!$result) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['status' => 'error', 'message' => 'Failed to execute query.', 'error' => $stmt->error]);
    mysqli_close($conn);
    exit;
}

$wildlifeData = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $wildlifeData[] = [ // Populate $wildlifeData instead of $wildlife
            'id' => $row['id'],
            'species_name' => htmlspecialchars($row['species_name'], ENT_QUOTES, 'UTF-8'),
            'common_name' => htmlspecialchars($row['common_name'], ENT_QUOTES, 'UTF-8'),
            'scientific_name' => htmlspecialchars($row['scientific_name'], ENT_QUOTES, 'UTF-8'),
            'population_estimate' => htmlspecialchars($row['population_estimate'], ENT_QUOTES, 'UTF-8'),
            'status' => htmlspecialchars($row['status'], ENT_QUOTES, 'UTF-8'),
        ];
    }
}

http_response_code(200); // OK
echo json_encode($wildlifeData); // Now returns $wildlifeData

$stmt->close();
mysqli_close($conn);
?>
