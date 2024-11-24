<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

session_start();

// Check if the user is logged in and has a user ID in session
if (isset($_SESSION['id'])) {
    // Database connection settings
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "semonggoh_wildlife_database"; // Replace with your actual database name

    // Create a connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind
    $stmt = $conn->prepare("UPDATE users SET session_id = NULL WHERE id = ?");
    $stmt->bind_param("i", $_SESSION['id']);

    // Execute the statement
    if ($stmt->execute()) {
        // Clear session data after updating the database
        $stmt->close();
        $conn->close();

        // Unset all session variables and destroy the session
        session_unset();
        session_destroy();

        // Optionally, remove the session cookie
        setcookie(session_name(), '', time() - 3600, '/'); // Expire the session cookie

        // Send a JSON response indicating success
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    } else {
        // Send an error response if database update fails
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Failed to update session in database.']);
    }
} else {
    // If no user is logged in, just destroy the session
    session_unset();
    session_destroy();
    
    // Optionally, remove the session cookie
    setcookie(session_name(), '', time() - 3600, '/'); // Expire the session cookie

    // Send a JSON response indicating the user was logged out
    header('Content-Type: application/json');
    echo json_encode(['success' => true]);
}
?>
