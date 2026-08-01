<?php
/**
 * HIWIN Admin Login
 */

require_once __DIR__ . '/../config/app.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../functions/helpers.php';

// If already logged in, redirect to dashboard
if (Auth::check()) {
    redirect('dashboard.php');
}

$errors = [];

// Handle login form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate CSRF
    if (!Auth::validateCsrfToken($_POST['csrf_token'] ?? null)) {
        $errors[] = 'Invalid request. Please try again.';
    } else {
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';

        // Input validation
        if (empty($username)) {
            $errors[] = 'Username is required.';
        }
        if (empty($password)) {
            $errors[] = 'Password is required.';
        }

        if (empty($errors)) {
            try {
                $db   = Database::getInstance()->getConnection();
                $stmt = $db->prepare('SELECT * FROM `admins` WHERE `username` = :username AND `is_active` = 1 LIMIT 1');
                $stmt->execute([':username' => $username]);
                $admin = $stmt->fetch();

                if ($admin && password_verify($password, $admin['password'])) {
                    // Login successful
                    Auth::login($admin);

                    // Update last login
                    $update = $db->prepare('UPDATE `admins` SET `last_login` = NOW() WHERE `id` = :id');
                    $update->execute([':id' => $admin['id']]);

                    // Handle "Remember Me"
                    if (!empty($_POST['remember'])) {
                        $token = bin2hex(random_bytes(32));
                        $hashedToken = hash('sha256', $token);

                        $stmt = $db->prepare('UPDATE `admins` SET `remember_token` = :token WHERE `id` = :id');
                        $stmt->execute([':token' => $hashedToken, ':id' => $admin['id']]);

                        setcookie('hiwin_remember', $token, [
                            'expires'  => time() + (86400 * 30),
                            'path'     => '/',
                            'httponly'  => true,
                            'samesite' => 'Strict',
                        ]);
                    }

                    appLog("Admin '{$username}' logged in successfully.");
                    redirect('dashboard.php');
                } else {
                    $errors[] = 'Invalid username or password.';
                    appLog("Failed login attempt for username: {$username}", 'WARNING');
                }
            } catch (Exception $e) {
                $errors[] = 'An error occurred. Please try again.';
                error_log('Login error: ' . $e->getMessage());
            }
        }
    }
}

// Generate CSRF token for the form
$csrfToken = Auth::generateCsrfToken();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HIWIN Admin - Login</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #0a1628 0%, #10233f 50%, #162d50 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #e0e6f0;
        }
        .login-container {
            background: rgba(16, 35, 63, 0.85);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 48px 40px;
            width: 100%;
            max-width: 420px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }
        .login-logo {
            text-align: center;
            margin-bottom: 32px;
        }
        .login-logo h1 {
            font-size: 1.8rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 2px;
        }
        .login-logo p {
            color: rgba(224, 230, 240, 0.6);
            font-size: 0.9rem;
            margin-top: 6px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: rgba(224, 230, 240, 0.8);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .form-group input[type="text"],
        .form-group input[type="password"] {
            width: 100%;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 8px;
            color: #ffffff;
            font-size: 0.95rem;
            outline: none;
            transition: border-color 0.3s, box-shadow 0.3s;
        }
        .form-group input:focus {
            border-color: #4a90d9;
            box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.15);
        }
        .remember-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 24px;
            font-size: 0.85rem;
            color: rgba(224, 230, 240, 0.7);
        }
        .remember-row input[type="checkbox"] {
            accent-color: #4a90d9;
        }
        .btn-login {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #4a90d9, #357abd);
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
        }
        .btn-login:hover {
            background: linear-gradient(135deg, #357abd, #2a6cb5);
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(74, 144, 217, 0.3);
        }
        .btn-login:active {
            transform: translateY(0);
        }
        .alert {
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 0.85rem;
        }
        .alert-danger {
            background: rgba(220, 53, 69, 0.15);
            border: 1px solid rgba(220, 53, 69, 0.3);
            color: #ff6b7a;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-logo">
            <h1>HIWIN</h1>
            <p>Admin Control Panel</p>
        </div>

        <?php if (!empty($errors)): ?>
            <div class="alert alert-danger">
                <?php foreach ($errors as $error): ?>
                    <div><?= esc($error) ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <?= renderFlash() ?>

        <form method="POST" action="login.php" autocomplete="off">
            <?= Auth::csrfField() ?>

            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" value="<?= esc($_POST['username'] ?? '') ?>" placeholder="Enter username" required autofocus>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password" required>
            </div>

            <div class="remember-row">
                <input type="checkbox" id="remember" name="remember" value="1">
                <label for="remember" style="margin-bottom:0; text-transform:none; font-weight:400; font-size:0.85rem;">Remember me</label>
            </div>

            <button type="submit" class="btn-login">Sign In</button>
        </form>
    </div>
</body>
</html>
