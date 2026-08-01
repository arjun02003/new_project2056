<?php
/**
 * HIWIN Database Seeder
 * Run this script once after importing hiwin_db.sql to set the correct admin password.
 * Usage: php database/seed.php
 */

require_once __DIR__ . '/../config/database.php';

try {
    $db = Database::getInstance()->getConnection();

    // Hash the default admin password
    $password = password_hash('Admin@123', PASSWORD_BCRYPT, ['cost' => 12]);

    // Update or insert the default admin
    $stmt = $db->prepare("UPDATE `admins` SET `password` = :password WHERE `username` = 'admin'");
    $stmt->execute([':password' => $password]);

    if ($stmt->rowCount() === 0) {
        // Admin doesn't exist, insert
        $stmt = $db->prepare("
            INSERT INTO `admins` (`username`, `password`, `full_name`, `email`, `role`, `is_active`)
            VALUES ('admin', :password, 'Administrator', 'admin@hiwin.com', 'super_admin', 1)
        ");
        $stmt->execute([':password' => $password]);
        echo "Default admin created successfully.\n";
    } else {
        echo "Default admin password updated successfully.\n";
    }

    echo "Seeding complete.\n";
} catch (PDOException $e) {
    echo "Seeding failed: " . $e->getMessage() . "\n";
    exit(1);
}
