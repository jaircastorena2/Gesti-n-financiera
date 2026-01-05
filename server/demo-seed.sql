-- =============================================
-- DEMO USER SAMPLE EXPENSES
-- Run this AFTER registering demo@gastos.com
-- =============================================

-- Get demo user ID
SET @demo_user_id = (SELECT id FROM users WHERE email = 'demo@gastos.com' LIMIT 1);

-- Get category IDs
SET @cat_comida = (SELECT id FROM categories WHERE name = 'Comida' AND user_id IS NULL LIMIT 1);
SET @cat_transporte = (SELECT id FROM categories WHERE name = 'Transporte' AND user_id IS NULL LIMIT 1);
SET @cat_entretenimiento = (SELECT id FROM categories WHERE name = 'Entretenimiento' AND user_id IS NULL LIMIT 1);
SET @cat_servicios = (SELECT id FROM categories WHERE name = 'Servicios' AND user_id IS NULL LIMIT 1);
SET @cat_compras = (SELECT id FROM categories WHERE name = 'Compras' AND user_id IS NULL LIMIT 1);
SET @cat_salud = (SELECT id FROM categories WHERE name = 'Salud' AND user_id IS NULL LIMIT 1);
SET @cat_educacion = (SELECT id FROM categories WHERE name = 'Educación' AND user_id IS NULL LIMIT 1);

-- JANUARY 2026
INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES
(@demo_user_id, @cat_comida, 245.50, 'Despensa semanal Walmart', '2026-01-02'),
(@demo_user_id, @cat_transporte, 850.00, 'Gasolina del mes', '2026-01-03'),
(@demo_user_id, @cat_servicios, 1200.00, 'Renta departamento', '2026-01-01'),
(@demo_user_id, @cat_servicios, 450.00, 'Luz CFE', '2026-01-05'),
(@demo_user_id, @cat_entretenimiento, 189.00, 'Netflix + Spotify', '2026-01-01'),
(@demo_user_id, @cat_comida, 320.00, 'Restaurante italiano', '2026-01-04'),
(@demo_user_id, @cat_compras, 599.00, 'Audífonos Bluetooth', '2026-01-02');

-- DECEMBER 2025
INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES
(@demo_user_id, @cat_comida, 890.50, 'Cena navideña familiar', '2025-12-24'),
(@demo_user_id, @cat_compras, 2450.00, 'Regalos de Navidad', '2025-12-20'),
(@demo_user_id, @cat_transporte, 920.00, 'Gasolina del mes', '2025-12-05'),
(@demo_user_id, @cat_servicios, 1200.00, 'Renta departamento', '2025-12-01'),
(@demo_user_id, @cat_servicios, 520.00, 'Luz CFE (calefacción)', '2025-12-06'),
(@demo_user_id, @cat_entretenimiento, 450.00, 'Boletos cine + palomitas', '2025-12-15'),
(@demo_user_id, @cat_comida, 278.00, 'Despensa semanal', '2025-12-10'),
(@demo_user_id, @cat_salud, 350.00, 'Consulta médica', '2025-12-12'),
(@demo_user_id, @cat_entretenimiento, 189.00, 'Streaming mensual', '2025-12-01');

-- NOVEMBER 2025
INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES
(@demo_user_id, @cat_comida, 310.00, 'Despensa Costco', '2025-11-08'),
(@demo_user_id, @cat_comida, 185.00, 'Comida rápida', '2025-11-15'),
(@demo_user_id, @cat_transporte, 780.00, 'Gasolina del mes', '2025-11-03'),
(@demo_user_id, @cat_servicios, 1200.00, 'Renta departamento', '2025-11-01'),
(@demo_user_id, @cat_servicios, 380.00, 'Luz CFE', '2025-11-05'),
(@demo_user_id, @cat_servicios, 299.00, 'Internet Telmex', '2025-11-10'),
(@demo_user_id, @cat_entretenimiento, 189.00, 'Streaming mensual', '2025-11-01'),
(@demo_user_id, @cat_compras, 1299.00, 'Chamarra de invierno', '2025-11-25'),
(@demo_user_id, @cat_educacion, 450.00, 'Curso Udemy', '2025-11-20');

-- OCTOBER 2025
INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES
(@demo_user_id, @cat_comida, 265.00, 'Despensa semanal', '2025-10-07'),
(@demo_user_id, @cat_comida, 420.00, 'Fiesta Halloween', '2025-10-31'),
(@demo_user_id, @cat_transporte, 850.00, 'Gasolina del mes', '2025-10-04'),
(@demo_user_id, @cat_servicios, 1200.00, 'Renta departamento', '2025-10-01'),
(@demo_user_id, @cat_servicios, 340.00, 'Luz CFE', '2025-10-06'),
(@demo_user_id, @cat_entretenimiento, 189.00, 'Streaming mensual', '2025-10-01'),
(@demo_user_id, @cat_entretenimiento, 280.00, 'Disfraz Halloween', '2025-10-28'),
(@demo_user_id, @cat_salud, 890.00, 'Dentista limpieza', '2025-10-15'),
(@demo_user_id, @cat_compras, 750.00, 'Decoración hogar', '2025-10-12');

-- SEPTEMBER 2025
INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES
(@demo_user_id, @cat_comida, 298.00, 'Despensa quincenal', '2025-09-05'),
(@demo_user_id, @cat_comida, 580.00, 'Cena día de independencia', '2025-09-15'),
(@demo_user_id, @cat_transporte, 720.00, 'Gasolina del mes', '2025-09-02'),
(@demo_user_id, @cat_servicios, 1200.00, 'Renta departamento', '2025-09-01'),
(@demo_user_id, @cat_servicios, 310.00, 'Luz CFE', '2025-09-05'),
(@demo_user_id, @cat_entretenimiento, 189.00, 'Streaming mensual', '2025-09-01'),
(@demo_user_id, @cat_educacion, 2500.00, 'Inscripción curso', '2025-09-10'),
(@demo_user_id, @cat_compras, 450.00, 'Útiles escolares', '2025-09-08');

-- AUGUST 2025
INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES
(@demo_user_id, @cat_comida, 285.00, 'Despensa semanal', '2025-08-10'),
(@demo_user_id, @cat_comida, 195.00, 'Almuerzo trabajo', '2025-08-18'),
(@demo_user_id, @cat_transporte, 690.00, 'Gasolina del mes', '2025-08-03'),
(@demo_user_id, @cat_transporte, 350.00, 'Viaje fin de semana', '2025-08-22'),
(@demo_user_id, @cat_servicios, 1200.00, 'Renta departamento', '2025-08-01'),
(@demo_user_id, @cat_servicios, 420.00, 'Luz CFE (AC)', '2025-08-06'),
(@demo_user_id, @cat_entretenimiento, 189.00, 'Streaming mensual', '2025-08-01'),
(@demo_user_id, @cat_entretenimiento, 850.00, 'Vacaciones playa', '2025-08-15'),
(@demo_user_id, @cat_salud, 200.00, 'Vitaminas', '2025-08-20'),
(@demo_user_id, @cat_compras, 980.00, 'Ropa verano', '2025-08-12');

-- =============================================
-- VERIFICATION: Count inserted expenses
-- =============================================
SELECT 
    CONCAT('Total expenses: ', COUNT(*)) as result,
    CONCAT('Months covered: ', COUNT(DISTINCT DATE_FORMAT(expense_date, '%Y-%m'))) as months
FROM expenses 
WHERE user_id = @demo_user_id;
