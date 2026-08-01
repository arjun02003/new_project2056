<?php
/**
 * HIWIN Application Configuration
 * Global constants and settings.
 */

// Prevent direct access
if (!defined('HIWIN_APP')) {
    define('HIWIN_APP', true);
}

// Path constants
define('ROOT_PATH', dirname(__DIR__));
define('CONFIG_PATH', __DIR__);
define('ADMIN_PATH', ROOT_PATH . '/admin');
define('UPLOADS_PATH', ROOT_PATH . '/uploads');
define('INCLUDES_PATH', ROOT_PATH . '/includes');
define('FUNCTIONS_PATH', ROOT_PATH . '/functions');
define('LOGS_PATH', ROOT_PATH . '/logs');

// Session configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_samesite', 'Strict');

// Error reporting based on environment
require_once __DIR__ . '/database.php';

$appDebug = $_ENV['APP_DEBUG'] ?? 'false';
if ($appDebug === 'true') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Error log file
ini_set('log_errors', 1);
ini_set('error_log', LOGS_PATH . '/error.log');

// Timezone
date_default_timezone_set('Asia/Kolkata');
