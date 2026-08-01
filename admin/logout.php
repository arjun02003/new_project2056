<?php
/**
 * HIWIN Admin Logout
 */

require_once __DIR__ . '/../config/app.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../functions/helpers.php';

// Clear remember me cookie
if (isset($_COOKIE['hiwin_remember'])) {
    // Remove token from database
    try {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare('UPDATE `admins` SET `remember_token` = NULL WHERE `id` = :id');
        $stmt->execute([':id' => Auth::id()]);
    } catch (Exception $e) {
        error_log('Logout error: ' . $e->getMessage());
    }

    setcookie('hiwin_remember', '', [
        'expires'  => time() - 3600,
        'path'     => '/',
        'httponly'  => true,
        'samesite' => 'Strict',
    ]);
}

appLog("Admin '" . (Auth::username() ?? 'unknown') . "' logged out.");

Auth::logout();

redirect('login.php');
