<?php
declare(strict_types=1);
 
// Suit inquiry handler for Orbit Explorer (form on medical.html).
$host = getenv('ORBIT_DB_HOST') ?: '127.0.0.1';
$db   = getenv('ORBIT_DB_NAME') ?: 'orbit_explorer';
$user = getenv('ORBIT_DB_USER') ?: 'root';
$pass = getenv('ORBIT_DB_PASS') ?: '';
 
function respond(string $title, string $message, int $status = 200): never {
    http_response_code($status);
    $t = htmlspecialchars($title, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $m = htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . $t . ' | Orbit Explorer</title><link rel="stylesheet" href="css/style.css"></head><body><main class="container" style="padding:80px 0"><section class="form-shell"><div class="eyebrow">Suit inquiry</div><h1 style="font-family:Space Grotesk,sans-serif">' . $t . '</h1><p class="muted" style="line-height:1.8">' . $m . '</p><a class="btn btn-primary" href="medical.html">Back to suit designs</a> <a class="btn" href="store.html">Visit store</a></section></main></body></html>';
    exit;
}
 
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond('Method not allowed', 'Please send your inquiry using the form on the suit designs page.', 405);
}
 
$name    = trim((string)($_POST['customer_name'] ?? ''));
$suit    = trim((string)($_POST['suit'] ?? ''));
$contact = trim((string)($_POST['contact'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$allowed = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
 
if (
    $name === '' || mb_strlen($name) > 120 ||
    !in_array($suit, $allowed, true) ||
    $contact === '' || mb_strlen($contact) > 255 || !filter_var($contact, FILTER_VALIDATE_EMAIL) ||
    mb_strlen($message) > 2000
) {
    respond('Please check your information', 'Some fields are missing, too long, or the email address is not valid. Please go back and try again.', 400);
}
 
try {
    $pdo = new PDO("mysql:host={$host};dbname={$db};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $q = $pdo->prepare('INSERT INTO suit_inquiries (customer_name, suit, contact, message) VALUES (:name, :suit, :contact, :message)');
    $q->execute([
        ':name'    => $name,
        ':suit'    => $suit,
        ':contact' => $contact,
        ':message' => $message !== '' ? $message : null,
    ]);
    respond('Inquiry received', 'Thank you! Your question about the ' . $suit . ' suit has been saved. These suits are concept designs, so this is not an order and no payment was taken.');
} catch (Throwable $e) {
    error_log('Orbit Explorer suit inquiry insert failed: ' . $e->getMessage());
    respond('Unable to submit right now', 'Your inquiry could not be saved. Please try again later.', 500);
}