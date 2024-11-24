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
$username = isset($data['username']) ? mysqli_real_escape_string($conn, $data['username']) : '';
$email = isset($data['email']) ? mysqli_real_escape_string($conn, $data['email']) : '';
$role_id = isset($data['role_id']) ? intval($data['role_id']) : 0; // Ensure role_id is an integer
$pass = isset($data['pass']) ? $data['pass'] : '';

// Hash the password
$hashedPass = hash('sha256', $pass);

// Prepare the SQL query
$query = "INSERT INTO users (username, email, role_id, pass) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, 'ssis', $username, $email, $role_id, $hashedPass);

if (mysqli_stmt_execute($stmt)) {
    // Escape output for XSS prevention when sending the response
    $safe_username = htmlspecialchars($username, ENT_QUOTES, 'UTF-8');
    $safe_email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    
    echo json_encode([
        'status' => 'success',
        'username' => $safe_username, // Send escaped username
        'email' => $safe_email, // Send escaped email
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to insert user: ' . mysqli_error($conn)]);
}

mysqli_stmt_close($stmt);

// Close the database connection
mysqli_close($conn);
?>
