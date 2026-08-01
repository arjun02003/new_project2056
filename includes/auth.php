<?php
/**
 * HIWIN Authentication Helper
 * Handles session management, CSRF tokens, and access control.
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

class Auth
{
    /**
     * Check if the user is logged in.
     */
    public static function check(): bool
    {
        return isset($_SESSION['admin_id']) && !empty($_SESSION['admin_id']);
    }

    /**
     * Get the logged-in admin's ID.
     */
    public static function id(): ?int
    {
        return $_SESSION['admin_id'] ?? null;
    }

    /**
     * Get the logged-in admin's username.
     */
    public static function username(): ?string
    {
        return $_SESSION['admin_username'] ?? null;
    }

    /**
     * Get the logged-in admin's full name.
     */
    public static function name(): ?string
    {
        return $_SESSION['admin_name'] ?? null;
    }

    /**
     * Get the logged-in admin's role.
     */
    public static function role(): ?string
    {
        return $_SESSION['admin_role'] ?? null;
    }

    /**
     * Log in the admin and set session data.
     */
    public static function login(array $admin): void
    {
        // Regenerate session ID to prevent fixation
        session_regenerate_id(true);

        $_SESSION['admin_id']       = (int) $admin['id'];
        $_SESSION['admin_username'] = $admin['username'];
        $_SESSION['admin_name']     = $admin['full_name'];
        $_SESSION['admin_role']     = $admin['role'];
        $_SESSION['admin_login_at'] = time();
    }

    /**
     * Log out the admin and destroy the session.
     */
    public static function logout(): void
    {
        $_SESSION = [];

        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }

        session_destroy();
    }

    /**
     * Require authentication. Redirect to login if not authenticated.
     */
    public static function requireLogin(): void
    {
        if (!self::check()) {
            header('Location: login.php');
            exit;
        }
    }

    /**
     * Generate a CSRF token and store it in the session.
     */
    public static function generateCsrfToken(): string
    {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    /**
     * Render a hidden CSRF input field.
     */
    public static function csrfField(): string
    {
        $token = self::generateCsrfToken();
        return '<input type="hidden" name="csrf_token" value="' . htmlspecialchars($token, ENT_QUOTES, 'UTF-8') . '">';
    }

    /**
     * Validate the submitted CSRF token.
     */
    public static function validateCsrfToken(?string $token): bool
    {
        if (empty($token) || empty($_SESSION['csrf_token'])) {
            return false;
        }
        return hash_equals($_SESSION['csrf_token'], $token);
    }
}
