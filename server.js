<?php
$host = 'dpg-d4pkjdadbo4c73bck9og-a'; // e.g., 'dpg-example-render.com'
$port = 5432; // Default PostgreSQL port
$dbname = 'test1_pol5';
$user = 'gael';
$password = 'pm7uB2Cyadoht2Rpc57dE96rFL4t0ght';

try {
    $dbInfo = sprintf("pgsql:host=%s;port=%d;dbname=%s;user=%s;password=%s",
                      $host, $port, $dbname, $user, $password);
    $pdo = new PDO($dbInfo);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to Render PostgreSQL successfully using PDO!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>