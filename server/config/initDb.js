const pool = require('./db');
const bcrypt = require('bcryptjs');

const initDatabase = async () => {
    try {
        // Test connection first
        const connection = await pool.getConnection();
        console.log('✅ Database connection successful!');
        connection.release();

        // Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB
        `);

        // Create categories table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                icon VARCHAR(50) DEFAULT '📦',
                color VARCHAR(7) DEFAULT '#6366f1',
                user_id INT NULL
            ) ENGINE=InnoDB
        `);

        // Check if categories exist
        const [catRows] = await pool.query('SELECT COUNT(*) as count FROM categories');
        if (catRows[0].count === 0) {
            await pool.query(`
                INSERT INTO categories (name, icon, color, user_id) VALUES
                    ('Comida', '🍔', '#ef4444', NULL),
                    ('Transporte', '🚗', '#f59e0b', NULL),
                    ('Entretenimiento', '🎬', '#8b5cf6', NULL),
                    ('Servicios', '💡', '#3b82f6', NULL),
                    ('Compras', '🛍️', '#ec4899', NULL),
                    ('Salud', '💊', '#10b981', NULL),
                    ('Educación', '📚', '#6366f1', NULL),
                    ('Otro', '📦', '#64748b', NULL)
            `);
        }

        // Create expenses table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS expenses (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                category_id INT NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                description VARCHAR(255),
                expense_date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB
        `);

        // Create demo user if not exists
        const [demoUser] = await pool.query('SELECT id FROM users WHERE email = ?', ['demo@gastos.com']);
        if (demoUser.length === 0) {
            console.log('📝 Creating demo user...');
            const hashedPassword = await bcrypt.hash('Demo2024!', 10);
            const [result] = await pool.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                ['Usuario Demo', 'demo@gastos.com', hashedPassword]
            );
            const demoUserId = result.insertId;

            // Get category IDs
            const [categories] = await pool.query('SELECT id, name FROM categories WHERE user_id IS NULL');
            const catMap = {};
            categories.forEach(c => catMap[c.name] = c.id);

            // Insert sample expenses for demo user (6 months of data)
            const expenses = [
                // January 2026
                [demoUserId, catMap['Comida'], 245.50, 'Despensa semanal Walmart', '2026-01-02'],
                [demoUserId, catMap['Transporte'], 850.00, 'Gasolina del mes', '2026-01-03'],
                [demoUserId, catMap['Servicios'], 1200.00, 'Renta departamento', '2026-01-01'],
                [demoUserId, catMap['Servicios'], 450.00, 'Luz CFE', '2026-01-05'],
                [demoUserId, catMap['Entretenimiento'], 189.00, 'Netflix + Spotify', '2026-01-01'],
                [demoUserId, catMap['Comida'], 320.00, 'Restaurante italiano', '2026-01-04'],
                [demoUserId, catMap['Compras'], 599.00, 'Audífonos Bluetooth', '2026-01-02'],
                // December 2025
                [demoUserId, catMap['Comida'], 890.50, 'Cena navideña familiar', '2025-12-24'],
                [demoUserId, catMap['Compras'], 2450.00, 'Regalos de Navidad', '2025-12-20'],
                [demoUserId, catMap['Transporte'], 920.00, 'Gasolina del mes', '2025-12-05'],
                [demoUserId, catMap['Servicios'], 1200.00, 'Renta departamento', '2025-12-01'],
                [demoUserId, catMap['Entretenimiento'], 450.00, 'Boletos cine + palomitas', '2025-12-15'],
                [demoUserId, catMap['Salud'], 350.00, 'Consulta médica', '2025-12-12'],
                // November 2025
                [demoUserId, catMap['Comida'], 310.00, 'Despensa Costco', '2025-11-08'],
                [demoUserId, catMap['Transporte'], 780.00, 'Gasolina del mes', '2025-11-03'],
                [demoUserId, catMap['Servicios'], 1200.00, 'Renta departamento', '2025-11-01'],
                [demoUserId, catMap['Servicios'], 299.00, 'Internet Telmex', '2025-11-10'],
                [demoUserId, catMap['Compras'], 1299.00, 'Chamarra de invierno', '2025-11-25'],
                [demoUserId, catMap['Educación'], 450.00, 'Curso Udemy', '2025-11-20'],
                // October 2025
                [demoUserId, catMap['Comida'], 420.00, 'Fiesta Halloween', '2025-10-31'],
                [demoUserId, catMap['Transporte'], 850.00, 'Gasolina del mes', '2025-10-04'],
                [demoUserId, catMap['Servicios'], 1200.00, 'Renta departamento', '2025-10-01'],
                [demoUserId, catMap['Entretenimiento'], 280.00, 'Disfraz Halloween', '2025-10-28'],
                [demoUserId, catMap['Salud'], 890.00, 'Dentista limpieza', '2025-10-15'],
                // September 2025
                [demoUserId, catMap['Comida'], 580.00, 'Cena día de independencia', '2025-09-15'],
                [demoUserId, catMap['Transporte'], 720.00, 'Gasolina del mes', '2025-09-02'],
                [demoUserId, catMap['Servicios'], 1200.00, 'Renta departamento', '2025-09-01'],
                [demoUserId, catMap['Educación'], 2500.00, 'Inscripción curso', '2025-09-10'],
                [demoUserId, catMap['Compras'], 450.00, 'Útiles escolares', '2025-09-08'],
                // August 2025
                [demoUserId, catMap['Comida'], 285.00, 'Despensa semanal', '2025-08-10'],
                [demoUserId, catMap['Transporte'], 690.00, 'Gasolina del mes', '2025-08-03'],
                [demoUserId, catMap['Servicios'], 1200.00, 'Renta departamento', '2025-08-01'],
                [demoUserId, catMap['Entretenimiento'], 850.00, 'Vacaciones playa', '2025-08-15'],
                [demoUserId, catMap['Compras'], 980.00, 'Ropa verano', '2025-08-12'],
            ];

            for (const exp of expenses) {
                await pool.query(
                    'INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES (?, ?, ?, ?, ?)',
                    exp
                );
            }
            console.log('✅ Demo user created with sample data');
        }

        console.log('✅ Database initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing database:', error.message);
    }
};

module.exports = initDatabase;
