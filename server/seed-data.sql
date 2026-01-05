-- =============================================
-- SAMPLE DATA FOR DEMO
-- Run this after creating the database
-- =============================================

-- First, create a demo user (password: demo123)
INSERT INTO users (name, email, password) VALUES 
('Carlos Demo', 'demo@demo.com', '$2a$10$rL8.q8qQVPvBvxYFf8FLxu8Z6vHJj1qPPZxJvVlD.hv7j1VYNxAam');

-- Get the user ID (assuming it's 1)
SET @user_id = LAST_INSERT_ID();

-- Insert sample expenses for the last 3 months
INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES
-- Enero 2026
(@user_id, 1, 250.00, 'Despensa semanal', '2026-01-02'),
(@user_id, 1, 180.50, 'Cena con amigos', '2026-01-05'),
(@user_id, 2, 500.00, 'Gasolina', '2026-01-03'),
(@user_id, 3, 199.00, 'Netflix y Spotify', '2026-01-01'),
(@user_id, 4, 850.00, 'Recibo de luz', '2026-01-04'),
(@user_id, 5, 1200.00, 'Ropa nueva', '2026-01-06'),
(@user_id, 6, 350.00, 'Consulta médica', '2026-01-07'),
(@user_id, 7, 450.00, 'Curso online', '2026-01-08'),
(@user_id, 1, 320.00, 'Despensa semanal', '2026-01-09'),
(@user_id, 2, 150.00, 'Uber', '2026-01-10'),

-- Diciembre 2025
(@user_id, 1, 450.00, 'Cena navideña', '2025-12-24'),
(@user_id, 5, 2500.00, 'Regalos de navidad', '2025-12-20'),
(@user_id, 3, 350.00, 'Cine y boliche', '2025-12-15'),
(@user_id, 4, 1200.00, 'Renta', '2025-12-01'),
(@user_id, 2, 600.00, 'Gasolina', '2025-12-10'),
(@user_id, 1, 280.00, 'Despensa', '2025-12-05'),
(@user_id, 8, 150.00, 'Regalo sorpresa', '2025-12-18'),

-- Noviembre 2025
(@user_id, 1, 290.00, 'Despensa', '2025-11-01'),
(@user_id, 4, 1200.00, 'Renta', '2025-11-01'),
(@user_id, 2, 480.00, 'Gasolina', '2025-11-15'),
(@user_id, 6, 800.00, 'Dentista', '2025-11-10'),
(@user_id, 3, 250.00, 'Concierto', '2025-11-20'),
(@user_id, 5, 650.00, 'Zapatos', '2025-11-25'),

-- Octubre 2025
(@user_id, 1, 310.00, 'Despensa', '2025-10-05'),
(@user_id, 4, 1200.00, 'Renta', '2025-10-01'),
(@user_id, 7, 1500.00, 'Libros universidad', '2025-10-08'),
(@user_id, 2, 520.00, 'Gasolina', '2025-10-12'),
(@user_id, 3, 180.00, 'Streaming services', '2025-10-01');

SELECT 'Datos de ejemplo insertados correctamente!' as Mensaje;
