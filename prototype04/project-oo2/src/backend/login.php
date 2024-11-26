<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Max-Age: 86400');
    exit(0); // End the request
}

// Secure session setup
session_set_cookie_params([
    'lifetime' => 86400,  // 1 day
    'path' => '/',
    'secure' => isset($_SERVER['HTTPS']), // Only if HTTPS is used
    'httponly' => true,
    'samesite' => 'Lax'
]);

// Connect to the database
$conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Login process
    if (!empty($input['email']) && !empty($input['password'])) {
        session_unset();
        session_destroy();
        session_write_close(); // Ensure no carryover

        session_start();
        session_regenerate_id(true); // Regenerate session ID for new session

        $email = $input['email'];
        $password = hash('sha256', $input['password']);

        // Use prepared statement to prevent SQL injection
        $query = "SELECT id, username, role_id FROM users WHERE email = ? AND pass = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, 'ss', $email, $password);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $id, $username, $role_id);
        mysqli_stmt_fetch($stmt);
        mysqli_stmt_close($stmt);

        if ($id) {
            // Store user session data
            $_SESSION['id'] = $id;
            $_SESSION['username'] = $username;
            $_SESSION['role_id'] = $role_id;

            // Update session_id in the database
            $session_id = session_id();
            $update_query = "UPDATE users SET session_id = ? WHERE id = ?";
            $update_stmt = mysqli_prepare($conn, $update_query);
            mysqli_stmt_bind_param($update_stmt, 'si', $session_id, $id);
            mysqli_stmt_execute($update_stmt);
            mysqli_stmt_close($update_stmt);

            // Send success response with session information
            echo json_encode([
                'status' => 'success',
                'role_id' => $role_id,
                'session_id' => $session_id,
                'username' => $username
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid credentials.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Incomplete input fields.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

mysqli_close($conn);
?>
