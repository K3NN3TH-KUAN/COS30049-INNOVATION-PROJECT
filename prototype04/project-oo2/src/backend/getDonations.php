<?php
header("Content-Type: application/json");

// Database connection
$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

// Fetch donations
$stmt = $conn->prepare("SELECT id, email, amount, donation_date, message FROM donations");
$stmt->execute();
$result = $stmt->get_result();

// Fetch donations into an array
$donations = [];
while ($row = $result->fetch_assoc()) {
    $donations[] = [
        'id' => $row['id'],
        'email' => htmlspecialchars($row['email'], ENT_QUOTES, 'UTF-8'),
        'amount' => $row['amount'],
        'donation_date' => $row['donation_date'],
        'message' => htmlspecialchars($row['message'], ENT_QUOTES, 'UTF-8')
    ];
}

// Return the donations as JSON
echo json_encode(['status' => 'success', 'data' => $donations]);

mysqli_close($conn);
?>
