<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');

// Database connection
$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

// Prepare the SQL statement
$stmt = $conn->prepare("SELECT id, email, amount, donation_date, message FROM donations");

if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare SQL statement.', 'error' => $conn->error]);
    mysqli_close($conn);
    exit;
}

// Execute the statement
$stmt->execute();

if ($stmt->errno) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to execute query.', 'error' => $stmt->error]);
    mysqli_close($conn);
    exit;
}

// Get the result
$result = $stmt->get_result();

// Fetch donations into an array
$donations = [];
while ($row = $result->fetch_assoc()) {
    $donations[] = [
        'id' => $row['id'],
        'email' => htmlspecialchars($row['email'], ENT_QUOTES, 'UTF-8'),
        'amount' => $row['amount'],
        'donation_date' => htmlspecialchars($row['donation_date'], ENT_QUOTES, 'UTF-8'),
        'message' => htmlspecialchars($row['message'], ENT_QUOTES, 'UTF-8')
    ];
}

// Return the donations as JSON
echo json_encode(['status' => 'success', 'data' => $donations]);

// Close statement and connection
$stmt->close();
mysqli_close($conn);
?>
