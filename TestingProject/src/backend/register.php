<?php

// register.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
session_start();

$input = json_decode(file_get_contents('php://input'), true); // Read JSON input

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($input['username']) && !empty($input['email']) && !empty($input['pass']) && !empty($input['c_pass'])) {

        // Check if passwords match
        if ($input['pass'] !== $input['c_pass']) {
            echo json_encode(['status' => 'error', 'message' => 'Passwords do not match.']);
            exit;
        }

        // Check password length
        if (strlen($input['pass']) < 8) {
            echo json_encode(['status' => 'error', 'message' => 'Password must be at least 8 characters long.']);
            exit;
        }

        // Database connection
        $conn = mysqli_connect("localhost", "root", "", "semonggoh_wildlife_database");

        if (!$conn) {
            echo json_encode(['status' => 'error', 'message' => 'Unable to connect to database.']);
            exit;
        }

        $username = htmlspecialchars($input['username'], ENT_QUOTES, 'UTF-8');
        $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
        $pass = hash('sha256', $input['pass']);
        $session_id = "none";
        $role_id = ($email === 'admin@ctip.com') ? 1 : 2;

        $validateUsername = "SELECT username FROM users WHERE username = ?";
        $stmt = mysqli_prepare($conn, $validateUsername);
        mysqli_stmt_bind_param($stmt, 's', $username);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);

        if (mysqli_stmt_num_rows($stmt) > 0) {
            echo json_encode(['status' => 'error', 'message' => 'Username already exists.']);
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
            exit;
        }
        mysqli_stmt_close($stmt);

        // Check if user already exists using a prepared statement
        $validate = "SELECT email FROM users WHERE email = ?";
        $stmt = mysqli_prepare($conn, $validate);
        mysqli_stmt_bind_param($stmt, 's', $email);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);

        if (mysqli_stmt_num_rows($stmt) === 0) {
            mysqli_stmt_close($stmt); // Close previous statement

            // Insert new user using a prepared statement, excluding the 'time' field
            $query = "INSERT INTO users (username, email, pass, session_id, role_id) 
                      VALUES (?, ?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, 'ssssi', $username, $email, $pass, $session_id, $role_id);

            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['status' => 'success', 'message' => 'Registration successful']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Registration failed.']);
            }
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Email already exists.']);
        }

        mysqli_close($conn);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Incomplete input fields.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
