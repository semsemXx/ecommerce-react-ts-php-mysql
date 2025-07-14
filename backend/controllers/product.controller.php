<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo json_encode(["error" => "Missing or invalid ID parameter"]);
    exit;
}

$id = intval($_GET['id']);

try {
    $pdo = new PDO("mysql:host=localhost;dbname=ecommerce", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([$id]);
    $game = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($game) {
        echo json_encode($game, JSON_PRETTY_PRINT);
    } else {
        echo json_encode(["error" => "Game not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>

<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $pdo = new PDO("mysql:host=localhost;dbname=ecommerce", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM products ORDER BY id ASC");
    $games = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($games, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>