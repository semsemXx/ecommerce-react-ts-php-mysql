<?php
session_start();

// Database connection
require_once 'config/db.php';
// Include the user controller functions
require_once 'user.controller.php';

// Handle API requests
if (isset($_GET['action'])) {
    header('Content-Type: application/json');
    $result = [];
    
    switch ($_GET['action']) {
        case 'login':
            if (isset($_POST['email'], $_POST['password'])) {
                $result = loginUser($_POST['email'], $_POST['password']);
            } else {
                $result = ['success' => false, 'message' => 'Missing required fields'];
            }
            break;
            
        case 'register':
            if (isset($_POST['email'], $_POST['username'], $_POST['password'], $_POST['birthdate'])) {
                $result = registerUser($_POST);
            } else {
                $result = ['success' => false, 'message' => 'Missing required fields'];
            }
            break;
            
        case 'verify':
            if (isset($_POST['code'])) {
                $result = verifyUserEmail($_POST['code']);
            } else {
                $result = ['success' => false, 'message' => 'Verification code required'];
            }
            break;
            
        case 'delete':
            if (isset($_POST['table'], $_POST['id'])) {
                $result = deleteRecord($_POST['table'], intval($_POST['id']));
            } else {
                $result = ['success' => false, 'message' => 'Missing required fields'];
            }
            break;
            
        case 'insert':
            if (isset($_POST['table'])) {
                $data = $_POST;
                unset($data['table']);
                $result = insertRecord($_POST['table'], $data);
            } else {
                $result = ['success' => false, 'message' => 'Table name required'];
            }
            break;
            
        case 'update':
            if (isset($_POST['table'], $_POST['id'])) {
                $data = $_POST;
                unset($data['table'], $data['id']);
                $result = updateRecord($_POST['table'], intval($_POST['id']), $data);
            } else {
                $result = ['success' => false, 'message' => 'Missing required fields'];
            }
            break;
            
        case 'profile':
            if (isset($_GET['user_id'])) {
                $result = getUserProfile(intval($_GET['user_id']));
            } else {
                $result = ['success' => false, 'message' => 'User ID required'];
            }
            break;
            
        default:
            $result = ['success' => false, 'message' => 'Invalid action'];
    }
    
    echo json_encode($result);
    exit;
}
?>