-- =============================================
-- DATABASE SCHEMA: Personal Expense Dashboard
-- Author: Carlos Jair Castorena
-- =============================================

-- Create database (skip if using phpMyAdmin)
-- CREATE DATABASE IF NOT EXISTS expense_dashboard;
-- USE expense_dashboard;

-- =============================================
-- USERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- CATEGORIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(50) DEFAULT '📦',
    color VARCHAR(7) DEFAULT '#6366f1',
    user_id INT NULL
) ENGINE=InnoDB;

-- Insert default categories
INSERT INTO categories (name, icon, color, user_id) VALUES
    ('Comida', '🍔', '#ef4444', NULL),
    ('Transporte', '🚗', '#f59e0b', NULL),
    ('Entretenimiento', '🎬', '#8b5cf6', NULL),
    ('Servicios', '💡', '#3b82f6', NULL),
    ('Compras', '🛍️', '#ec4899', NULL),
    ('Salud', '💊', '#10b981', NULL),
    ('Educación', '📚', '#6366f1', NULL),
    ('Otro', '📦', '#64748b', NULL);

-- =============================================
-- EXPENSES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS expenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
