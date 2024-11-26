<?php
header('Content-Type: application/json');

// Connect to the database
$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Sanitize and validate input
$name = htmlspecialchars($data['name'] ?? '', ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($data['email'] ?? '', ENT_QUOTES, 'UTF-8');
$amount = $data['amount'] ?? 0;
$message = htmlspecialchars($data['message'] ?? '', ENT_QUOTES, 'UTF-8');
$donation_date = htmlspecialchars($data['donation_date'] ?? '', ENT_QUOTES, 'UTF-8');

// Validate input
if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || $amount <= 0) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input. Please check your data.']);
    exit;
}

// Prepare and execute the insertion
$insertQuery = "INSERT INTO donations (name, email, amount, message, donation_date) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($insertQuery);
$stmt->bind_param("ssiss", $name, $email, $amount, $message, $donation_date);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to process donation.']);
}

$stmt->close();
mysqli_close($conn);
?>
