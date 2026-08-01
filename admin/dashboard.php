<?php
/**
 * HIWIN Admin Dashboard
 */

require_once __DIR__ . '/../config/app.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../functions/helpers.php';

// Require authentication
Auth::requireLogin();

$adminName = Auth::name() ?? 'Admin';
$currentPage = currentPage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HIWIN Admin - Dashboard</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: #0d1b2a;
            color: #e0e6f0;
            min-height: 100vh;
            display: flex;
        }
        /* ---- Sidebar ---- */
        .sidebar {
            width: 260px;
            background: linear-gradient(180deg, #10233f 0%, #0d1b2a 100%);
            border-right: 1px solid rgba(255, 255, 255, 0.06);
            min-height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            z-index: 100;
        }
        .sidebar-brand {
            padding: 28px 24px 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .sidebar-brand h2 {
            font-size: 1.4rem;
            font-weight: 700;
            letter-spacing: 2px;
            color: #ffffff;
        }
        .sidebar-brand span {
            font-size: 0.75rem;
            color: rgba(224, 230, 240, 0.4);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .sidebar-nav {
            flex: 1;
            padding: 16px 0;
            list-style: none;
        }
        .sidebar-nav li a {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 24px;
            color: rgba(224, 230, 240, 0.7);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s;
            border-left: 3px solid transparent;
        }
        .sidebar-nav li a:hover {
            background: rgba(255, 255, 255, 0.04);
            color: #ffffff;
        }
        .sidebar-nav li a.active {
            background: rgba(74, 144, 217, 0.1);
            color: #4a90d9;
            border-left-color: #4a90d9;
        }
        .sidebar-nav li a .nav-icon {
            font-size: 1.1rem;
            width: 24px;
            text-align: center;
        }
        .sidebar-footer {
            padding: 16px 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .sidebar-footer a {
            display: flex;
            align-items: center;
            gap: 10px;
            color: rgba(220, 53, 69, 0.8);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: color 0.2s;
        }
        .sidebar-footer a:hover {
            color: #dc3545;
        }
        /* ---- Main Content ---- */
        .main-content {
            margin-left: 260px;
            flex: 1;
            padding: 0;
            min-height: 100vh;
        }
        .top-bar {
            background: rgba(16, 35, 63, 0.6);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            padding: 16px 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .top-bar h1 {
            font-size: 1.3rem;
            font-weight: 600;
        }
        .top-bar .admin-info {
            font-size: 0.85rem;
            color: rgba(224, 230, 240, 0.6);
        }
        .dashboard-content {
            padding: 32px;
        }
        .welcome-card {
            background: linear-gradient(135deg, rgba(74, 144, 217, 0.12), rgba(74, 144, 217, 0.04));
            border: 1px solid rgba(74, 144, 217, 0.15);
            border-radius: 12px;
            padding: 32px;
            margin-bottom: 32px;
        }
        .welcome-card h2 {
            font-size: 1.5rem;
            margin-bottom: 8px;
        }
        .welcome-card p {
            color: rgba(224, 230, 240, 0.6);
            font-size: 0.95rem;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
        }
        .stat-card {
            background: rgba(16, 35, 63, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            transition: border-color 0.3s, transform 0.2s;
        }
        .stat-card:hover {
            border-color: rgba(74, 144, 217, 0.25);
            transform: translateY(-2px);
        }
        .stat-card .stat-icon {
            font-size: 2rem;
            margin-bottom: 12px;
        }
        .stat-card h3 {
            font-size: 0.9rem;
            font-weight: 600;
            color: rgba(224, 230, 240, 0.8);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-brand">
            <h2>HIWIN</h2>
            <span>Admin Panel</span>
        </div>
        <ul class="sidebar-nav">
            <li><a href="dashboard.php" class="<?= isActivePage('dashboard') ?>"><span class="nav-icon">📊</span> Dashboard</a></li>
            <li><a href="#" class="<?= isActivePage('slider') ?>"><span class="nav-icon">🖼️</span> Hero Slider</a></li>
            <li><a href="#" class="<?= isActivePage('categories') ?>"><span class="nav-icon">📁</span> Categories</a></li>
            <li><a href="#" class="<?= isActivePage('series') ?>"><span class="nav-icon">📦</span> Series</a></li>
            <li><a href="#" class="<?= isActivePage('products') ?>"><span class="nav-icon">🏭</span> Products</a></li>
            <li><a href="#" class="<?= isActivePage('downloads') ?>"><span class="nav-icon">📥</span> Downloads</a></li>
            <li><a href="#" class="<?= isActivePage('about') ?>"><span class="nav-icon">ℹ️</span> About</a></li>
            <li><a href="#" class="<?= isActivePage('messages') ?>"><span class="nav-icon">✉️</span> Messages</a></li>
            <li><a href="#" class="<?= isActivePage('settings') ?>"><span class="nav-icon">⚙️</span> Settings</a></li>
        </ul>
        <div class="sidebar-footer">
            <a href="logout.php"><span class="nav-icon">🚪</span> Logout</a>
        </div>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
        <div class="top-bar">
            <h1>Dashboard</h1>
            <div class="admin-info">Welcome, <?= esc($adminName) ?></div>
        </div>

        <div class="dashboard-content">
            <?= renderFlash() ?>

            <div class="welcome-card">
                <h2>Welcome to HIWIN Admin Panel</h2>
                <p>Manage your products, categories, hero slider, and website content from here. Select a module from the sidebar to get started.</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">🖼️</div>
                    <h3>Hero Slider</h3>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📁</div>
                    <h3>Categories</h3>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📦</div>
                    <h3>Series</h3>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏭</div>
                    <h3>Products</h3>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📥</div>
                    <h3>Downloads</h3>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">ℹ️</div>
                    <h3>About</h3>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">✉️</div>
                    <h3>Messages</h3>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⚙️</div>
                    <h3>Settings</h3>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
