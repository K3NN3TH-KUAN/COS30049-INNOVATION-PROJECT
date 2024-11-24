<?php
session_start();

// Connect to the database
$conn = @mysqli_connect("localhost", "root", "") or die("Unable to connect to database.");
@mysqli_select_db($conn, "semonggoh_wildlife_database") or die("Unable to select database");

// Check for existing admin account
$adminCheck = "SELECT id FROM users WHERE email='admin@ctip.com'";
$adminCheckResult = mysqli_query($conn, $adminCheck);

if (mysqli_num_rows($adminCheckResult) == 0) {
    $password = ''; // Default password (Only needed for creation of admin account)
    $hashed_password = hash('sha256', $password); // Hash the password

    // Prepare statement to insert new admin
    $stmt = $conn->prepare("INSERT INTO users (username, email, pass, session_id, role_id) VALUES (?, ?, ?, ?, ?)");
    $username = '1q2w3e4@'; // Set username
    $email = 'admin@ctip.com';
    $session_id = NULL; // Default session_id
    $role_id = 1; // Admin role_id

    // Bind parameters
    $stmt->bind_param("sssii", $username, $email, $hashed_password, $session_id, $role_id);

    // Execute statement
    if ($stmt->execute()) {
        echo "Admin user account created successfully.";
    } else {
        echo "Error creating admin account: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Admin account already exists.";
}

mysqli_close($conn);
?>
