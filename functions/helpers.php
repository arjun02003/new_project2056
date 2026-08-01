<?php
/**
 * HIWIN Helper Functions
 * Reusable utility functions for the backend.
 */

/**
 * Sanitize a string for safe HTML output.
 */
function esc(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

/**
 * Redirect to a URL and exit.
 */
function redirect(string $url): void
{
    header('Location: ' . $url);
    exit;
}

/**
 * Set a flash message in the session.
 */
function setFlash(string $type, string $message): void
{
    $_SESSION['flash'] = [
        'type'    => $type,
        'message' => $message,
    ];
}

/**
 * Get and clear a flash message from the session.
 */
function getFlash(): ?array
{
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}

/**
 * Render a flash message as HTML.
 */
function renderFlash(): string
{
    $flash = getFlash();
    if (!$flash) {
        return '';
    }
    $type    = esc($flash['type']);
    $message = esc($flash['message']);
    return '<div class="alert alert-' . $type . '">' . $message . '</div>';
}

/**
 * Get the current page name from the URL.
 */
function currentPage(): string
{
    return basename($_SERVER['PHP_SELF'], '.php');
}

/**
 * Check if the current page matches the given name.
 */
function isActivePage(string $page): string
{
    return currentPage() === $page ? 'active' : '';
}

/**
 * Log a message to the application log file.
 */
function appLog(string $message, string $level = 'INFO'): void
{
    $logFile = defined('LOGS_PATH') ? LOGS_PATH . '/app.log' : __DIR__ . '/../logs/app.log';
    $logDir  = dirname($logFile);
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    $timestamp = date('Y-m-d H:i:s');
    $entry     = "[{$timestamp}] [{$level}] {$message}" . PHP_EOL;
    file_put_contents($logFile, $entry, FILE_APPEND | LOCK_EX);
}
