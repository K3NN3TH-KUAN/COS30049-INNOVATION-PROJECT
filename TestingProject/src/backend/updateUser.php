<?php
('Content-Type: application/json');

// Include database connection
$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

// Get the input data
$data = json_decode(file_get_contents("php://input"), true);

// Validate input data
$id = isset($data['id']) ? intval($data['id']) : 0; // Ensure id is an integer
$username = isset($data['username']) ? $data['username'] : '';
$email = isset($data['email']) ? $data['email'] : '';
$role_id = isset($data['role_id']) ? intval($data['role_id']) : 0; // Ensure role_id is an integer
$pass = isset($data['pass']) ? $data['pass'] : '';

// Hash the password if it's provided
$hashedPass = !empty($pass) ? hash('sha256', $pass) : null;

// Validate password (minimum 8 characters)
if ($hashedPass && strlen($pass) < 8) {
    echo json_encode(['status' => 'error', 'message' => 'Password must be at least 8 characters long.']);
    exit;
}

// Prepare the SQL query
if ($hashedPass) {
    // If the password is provided, update it
    $stmt = $conn->prepare("UPDATE users SET username = ?, email = ?, role_id = ?, pass = ? WHERE id = ?");
    $stmt->bind_param("ssisi", $username, $email, $role_id, $hashedPass, $id);
} else {
    // If the password is not provided, update without changing it
    $stmt = $conn->prepare("UPDATE users SET username = ?, email = ?, role_id = ? WHERE id = ?");
    $stmt->bind_param("ssii", $username, $email, $role_id, $id);
}

// Execute the prepared statement and check for success
if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update user: ' . $stmt->error]);
}

// Close the statement and database connection
$stmt->close();
mysqli_close($conn);
?>
