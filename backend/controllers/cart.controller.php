<?php
session_start();
require_once '../config/db.php';
require_once 'utils.php';

$user_id = $_SESSION['user']['id'];
$product_id = $_POST['product_id'];
$quantity = 1;

// 1. Prevent adding if already purchased
if (hasUserPurchasedGame($pdo, $user_id, $product_id)) {
    echo "Vous avez déjà acheté ce jeu.";
    exit;
}

// 2. Prevent adding if already in cart
$stmt = $pdo->prepare("SELECT * FROM carts WHERE user_id = ?");
$stmt->execute([$user_id]);
$cart = $stmt->fetch(PDO::FETCH_ASSOC);
$cart_items = $cart ? json_decode($cart['products'], true) : [];

foreach ($cart_items as $item) {
    if ($item['product_id'] == $product_id) {
        echo "Ce jeu est déjà dans votre panier.";
        exit;
    }
}

// 3. Fetch product
$stmt = $pdo->prepare("SELECT id, name, price FROM products WHERE id = ?");
$stmt->execute([$product_id]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$product) {
    echo "Produit introuvable.";
    exit;
}

// 4. Add to cart
$cart_items[] = [
    'product_id' => $product_id,
    'name' => $product['name'],
    'price' => $product['price'],
    'quantity' => 1
];

$subtotal = array_reduce($cart_items, function ($carry, $item) {
    return $carry + $item['price'] * $item['quantity'];
}, 0);

$products_json = json_encode($cart_items);

if ($cart) {
    $stmt = $pdo->prepare("UPDATE carts SET products = ?, subtotal = ? WHERE user_id = ?");
    $stmt->execute([$products_json, $subtotal, $user_id]);
} else {
    $stmt = $pdo->prepare("INSERT INTO carts (user_id, products, subtotal) VALUES (?, ?, ?)");
    $stmt->execute([$user_id, $products_json, $subtotal]);
}

echo "Produit ajouté au panier.";
?>

<?php
session_start();
require_once '../config/db.php';

$user_id = $_SESSION['user']['id'];

$stmt = $pdo->prepare("SELECT * FROM carts WHERE user_id = ?");
$stmt->execute([$user_id]);
$cart = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$cart) {
    echo "Aucun article dans le panier.";
    exit;
}

$stmt = $pdo->prepare("INSERT INTO orders (user_id, products, subtotal, payment_details)
VALUES (?, ?, ?, ?)");
$stmt->execute([
    $user_id,
    $cart['products'],
    $cart['subtotal'],
    json_encode(['status' => 'paid', 'method' => 'dummy']) // For testing
]);

$pdo->prepare("DELETE FROM carts WHERE user_id = ?")->execute([$user_id]);

echo "Commande passée avec succès.";
?>

<?php
session_start();
require_once '../config/db.php';

$user_id = $_SESSION['user']['id'];
$product_id = $_POST['product_id'];

$stmt = $pdo->prepare("SELECT products FROM carts WHERE user_id = ?");
$stmt->execute([$user_id]);
$cart = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$cart) {
    echo "Aucun panier trouvé.";
    exit;
}

$items = json_decode($cart['products'], true);

// Supprime l'article du tableau
$items = array_filter($items, function($item) use ($product_id) {
    return $item['product_id'] != $product_id;
});

$newSubtotal = 0;
foreach ($items as $item) {
    $newSubtotal += $item['price'] * $item['quantity'];
}

$pdo->prepare("UPDATE carts SET products = ?, subtotal = ? WHERE user_id = ?")
    ->execute([json_encode(array_values($items)), $newSubtotal, $user_id]);

header('Location: ../controllers/view_cart.php');
exit;
?>

<?php
session_start();
require_once '../config/db.php';
require_once 'utils.php';

if (!isset($_SESSION['user'])) {
    header("Location: ../public/login.php");
    exit;
}

$user_id = $_SESSION['user']['id'];

// Récupération du panier
$stmt = $pdo->prepare("SELECT * FROM carts WHERE user_id = ?");
$stmt->execute([$user_id]);
$cart = $stmt->fetch(PDO::FETCH_ASSOC);
$items = $cart ? json_decode($cart['products'], true) : [];
?>