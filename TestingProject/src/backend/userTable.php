<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Disable caching
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "semonggoh_wildlife_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

// Handle adding or updating users
if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (!isset($data['username'], $data['email'], $data['role_id'], $data['pass'])) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input.']);
        exit;
    }  

    // Hash the password and sanitize the username and email for XSS prevention
    $hashedPassword = password_hash($data['pass'], PASSWORD_BCRYPT);
    $username = htmlspecialchars($data['username'], ENT_QUOTES, 'UTF-8'); // Prevent XSS in username
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL); // Ensure email is valid and sanitized

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Add new user
        $stmt = $conn->prepare("INSERT INTO users (username, email, role_id, pass) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssis", $data['username'], $data['email'], $data['role_id'], $hashedPassword);
        
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'User added successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Could not add user.']);
        }
        
        $stmt->close();
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        // Update existing user
        if (!isset($data['id'])) {
            echo json_encode(['status' => 'error', 'message' => 'User ID is required for update.']);
            exit;
        }

        $stmt = $conn->prepare("UPDATE users SET username = ?, email = ?, role_id = ?, pass = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $data['username'], $data['email'], $data['role_id'], $hashedPassword, $data['id']);
        
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'User updated successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Could not update user.']);
        }

        $stmt->close();
    }
}

// Fetch data from the `users` table
$sql = "SELECT id, username, email, role_id FROM users"; // Note: don't select the password
$result = $conn->query($sql);

$users = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = [
            'id' => $row['id'],
            'username' => htmlspecialchars($row['username'], ENT_QUOTES, 'UTF-8'),
            'email' => htmlspecialchars($row['email'], ENT_QUOTES, 'UTF-8'),
            'role_id' => $row['role_id']
        ]; // Store each sanitized row in the $users array
    }
}

// Output user data as JSON
echo json_encode($users);

$conn->close(); // Close the database connection
?>
