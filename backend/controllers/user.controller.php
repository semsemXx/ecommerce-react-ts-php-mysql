<?php
/**
 * User Controller Functions
 * Contains all user management functionality
 */

/**
 * User Login Function
 */
function loginUser($email, $password) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if user exists AND password is correct
    if (!$user || !password_verify($password, $user['password'])) {
        return [
            'success' => false, 
            'message' => "Adresse e-mail ou mot de passe invalide."
        ];
    }

    // Check if user is verified
    if (!$user['is_verified']) {
        return [
            'success' => false, 
            'message' => "Veuillez vérifier votre adresse e-mail avant de vous connecter."
        ];
    }

    // Successful login - create session
    if($user['role'] == 'admin') {
        $_SESSION['admin'] = [
            'id' => $user['id'],
            'username' => $user['username'],
            'first_name' => $user['first_name'],
            'last_name' => $user['last_name'],
            'email' => $user['email'],
            'role' => $user['role']
        ];
    } else {
        $_SESSION['regular_user'] = [
            'id' => $user['id'],
            'username' => $user['username'],
            'first_name' => $user['first_name'],
            'last_name' => $user['last_name'],
            'email' => $user['email'],
            'role' => $user['role']
        ];
    }

    return ['success' => true, 'user' => $user];
}

/** 
 * User Registration Function
 */
function registerUser($userData) {
    global $pdo;
    
    $email = filter_var($userData['email'], FILTER_SANITIZE_EMAIL);
    $username = filter_var($userData['username'], FILTER_SANITIZE_STRING);
    $birthdate = filter_var($userData['birthdate'], FILTER_SANITIZE_STRING);
    $first_name = filter_var($userData['first_name'], FILTER_SANITIZE_STRING);
    $last_name = filter_var($userData['last_name'], FILTER_SANITIZE_STRING);
    $country = filter_var($userData['country'], FILTER_SANITIZE_STRING);
    $password = $userData['password'];

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return [
            'success' => false, 
            'message' => 'Adresse e-mail invalide.'
        ];
    }

    // Validate birthdate
    $date = DateTime::createFromFormat('Y-m-d', $birthdate);
    if (!$date || $date->format('Y-m-d') !== $birthdate) {
        return [
            'success' => false, 
            'message' => 'Date de naissance invalide.'
        ];
    }
    
    $age = $date->diff(new DateTime())->y;
    if ($age < 13) {
        return [
            'success' => false, 
            'message' => 'Vous devez avoir au moins 13 ans.'
        ];
    }

    // Check if email or username already exists
    $checkEmail = $pdo->prepare("SELECT id FROM users WHERE email = :email");
    $checkEmail->execute(['email' => $email]);
    if ($checkEmail->rowCount() > 0) {
        return [
            'success' => false, 
            'message' => 'Email déjà utilisé.'
        ];
    }

    $checkUsername = $pdo->prepare("SELECT id FROM users WHERE username = :username");
    $checkUsername->execute(['username' => $username]);
    if ($checkUsername->rowCount() > 0) {
        return [
            'success' => false, 
            'message' => 'Nom d\'utilisateur déjà utilisé.'
        ];
    }

    // Insert user into database
    $stmt = $pdo->prepare("INSERT INTO users (role, username, first_name, last_name, email, password, birthdate, country)
        VALUES ('regular_user', :username, :first_name, :last_name, :email, :password, :birthdate, :country)");

    try {
        $stmt->execute([
            'username' => $username,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'birthdate' => $birthdate,
            'country' => $country
        ]);
    } catch (PDOException $e) {
        return [
            'success' => false, 
            'message' => 'Erreur lors de l\'inscription: ' . $e->getMessage()
        ];
    }

    $userId = $pdo->lastInsertId();
    $code = rand(100000, 999999);
    $expiresAt = date('Y-m-d H:i:s', strtotime('+30 minutes'));

    // Create verification token
    $insertToken = $pdo->prepare("INSERT INTO tokens (user_id, token, type, expires_at)
        VALUES (:user_id, :token, 'signup', :expires_at)");

    try {
        $insertToken->execute([
            'user_id' => $userId,
            'token' => $code,
            'expires_at' => $expiresAt
        ]);
    } catch (PDOException $e) {
        // Rollback user creation if token creation fails
        $pdo->prepare("DELETE FROM users WHERE id = :id")->execute(['id' => $userId]);
        return [
            'success' => false, 
            'message' => 'Erreur création token: ' . $e->getMessage()
        ];
    }

    // Send verification email
    require_once '../services/sendVerificationEmail.php';
    if (sendVerificationEmail($email, $code)) {
        return [
            'success' => true, 
            'message' => 'Un code de vérification vous a été envoyé.',
            'user_id' => $userId
        ];
    } else {
        // Rollback if email sending fails
        $pdo->prepare("DELETE FROM users WHERE id = :id")->execute(['id' => $userId]);
        return [
            'success' => false, 
            'message' => 'Erreur d\'envoi d\'e-mail.'
        ];
    }
}

/**
 * Verify user email with verification code
 */
function verifyUserEmail($code) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM tokens WHERE token = :token AND type = 'signup' AND expires_at > NOW()");
    $stmt->execute(['token' => $code]);
    $token = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$token) {
        return [
            'success' => false,
            'message' => 'Code invalide ou expiré.'
        ];
    }
    
    // Update user verification status
    $updateUser = $pdo->prepare("UPDATE users SET is_verified = 1 WHERE id = :user_id");
    $updateUser->execute(['user_id' => $token['user_id']]);
    
    // Delete used token
    $deleteToken = $pdo->prepare("DELETE FROM tokens WHERE id = :id");
    $deleteToken->execute(['id' => $token['id']]);
    
    return [
        'success' => true,
        'message' => 'Votre compte a été vérifié avec succès.'
    ];
}

/**
 * Delete record function (for admin use)
 */
function deleteRecord($table, $id) {
    global $pdo;
    
    // Admin check
    if (!isset($_SESSION['admin']) || !$_SESSION['admin']) {
        return [
            'success' => false,
            'message' => 'Access denied. Admins only.'
        ];
    }
    
    // List of allowed tables to prevent SQL injection
    $allowedTables = ['products', 'users', 'orders', 'categories'];
    
    if (!in_array($table, $allowedTables)) {
        return [
            'success' => false,
            'message' => 'Invalid table name.'
        ];
    }
    
    try {
        // Check if the ID exists
        $checkStmt = $pdo->prepare("SELECT * FROM $table WHERE id = :id");
        $checkStmt->execute(['id' => $id]);
        
        if ($checkStmt->rowCount() === 0) {
            return [
                'success' => false,
                'message' => "ID $id not found in table '$table'."
            ];
        }
        
        // Delete the record
        $deleteStmt = $pdo->prepare("DELETE FROM $table WHERE id = :id");
        $deleteStmt->execute(['id' => $id]);
        
        return [
            'success' => true,
            'message' => "Record with ID $id successfully deleted from '$table'."
        ];
    } catch (PDOException $e) {
        return [
            'success' => false,
            'message' => "Database error: " . $e->getMessage()
        ];
    }
}

/**
 * Insert record function (for admin use)
 */
function insertRecord($table, $data) {
    global $pdo;
    
    // Admin check
    if (!isset($_SESSION['admin']) || !$_SESSION['admin']) {
        return [
            'success' => false,
            'message' => 'Access denied. Admins only.'
        ];
    }
    
    // List of allowed tables to prevent SQL injection
    $allowedTables = ['products', 'users', 'orders', 'categories'];
    
    if (!in_array($table, $allowedTables)) {
        return [
            'success' => false,
            'message' => 'Invalid table name.'
        ];
    }
    
    try {
        // Get table columns to validate keys
        $stmt = $pdo->prepare("DESCRIBE `$table`");
        $stmt->execute();
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        // Filter valid columns and prepare for insert
        $filteredData = array_intersect_key($data, array_flip($columns));
        if (empty($filteredData)) {
            return [
                'success' => false,
                'message' => 'No valid fields to insert.'
            ];
        }
        
        $fields = array_keys($filteredData);
        $placeholders = array_map(fn($f) => ':' . $f, $fields);
        
        $sql = "INSERT INTO `$table` (" . implode(',', $fields) . ") VALUES (" . implode(',', $placeholders) . ")";
        $insertStmt = $pdo->prepare($sql);
        
        foreach ($filteredData as $key => $value) {
            $insertStmt->bindValue(":$key", $value);
        }
        
        $insertStmt->execute();
        $insertedId = $pdo->lastInsertId();
        
        return [
            'success' => true,
            'message' => 'Record inserted successfully',
            'id' => $insertedId
        ];
    } catch (PDOException $e) {
        return [
            'success' => false,
            'message' => "Database error: " . $e->getMessage()
        ];
    }
}

/**
 * Update record function (for admin use)
 */
function updateRecord($table, $id, $data) {
    global $pdo;
    
    // Admin check
    if (!isset($_SESSION['admin']) || !$_SESSION['admin']) {
        return [
            'success' => false,
            'message' => 'Access denied. Admins only.'
        ];
    }
    
    // List of allowed tables to prevent SQL injection
    $allowedTables = ['products', 'users', 'orders', 'categories'];
    
    if (!in_array($table, $allowedTables)) {
        return [
            'success' => false,
            'message' => 'Invalid table name.'
        ];
    }
    
    if (empty($data)) {
        return [
            'success' => false,
            'message' => 'No data provided to update.'
        ];
    }
    
    try {
        // Get table columns to validate keys
        $stmt = $pdo->prepare("DESCRIBE `$table`");
        $stmt->execute();
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        // Filter valid columns and prepare for update
        $filteredData = array_intersect_key($data, array_flip($columns));
        if (empty($filteredData)) {
            return [
                'success' => false,
                'message' => 'No valid fields to update.'
            ];
        }
        
        $setClause = implode(", ", array_map(fn($key) => "$key = :$key", array_keys($filteredData)));
        
        $sql = "UPDATE $table SET $setClause WHERE id = :id";
        $updateStmt = $pdo->prepare($sql);
        
        // Add ID for binding
        $filteredData['id'] = $id;
        
        $updateStmt->execute($filteredData);
        
        if ($updateStmt->rowCount() === 0) {
            return [
                'success' => false,
                'message' => "Record with ID $id not found or no changes made."
            ];
        }
        
        return [
            'success' => true,
            'message' => "Record with ID $id successfully updated."
        ];
    } catch (PDOException $e) {
        return [
            'success' => false,
            'message' => "Database error: " . $e->getMessage()
        ];
    }
}

/**
 * Get user profile
 */
function getUserProfile($userId) {
    global $pdo;
    
    // Ensure user is authenticated or admin
    if (
        (!isset($_SESSION['regular_user']) || $_SESSION['regular_user']['id'] != $userId) && 
        (!isset($_SESSION['admin']))
    ) {
        return [
            'success' => false,
            'message' => 'Unauthorized access to user profile.'
        ];
    }
    
    try {
        $stmt = $pdo->prepare("SELECT id, username, first_name, last_name, email, birthdate, country, created_at 
                              FROM users WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            return [
                'success' => false,
                'message' => 'User not found.'
            ];
        }
        
        return [
            'success' => true,
            'user' => $user
        ];
    } catch (PDOException $e) {
        return [
            'success' => false,
            'message' => "Database error: " . $e->getMessage()
        ];
    }
}
?>