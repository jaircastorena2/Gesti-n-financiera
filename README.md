# Gestión Financiera - Dashboard de Gastos Personales

**Una aplicación Full Stack moderna para gestionar tus finanzas personales**

**Demo en Vivo:** [https://gesti-n-financiera-euzp.vercel.app](https://gesti-n-financiera-euzp.vercel.app)

---

## Características

- **Autenticación JWT** - Registro y login seguro
- **Dashboard Interactivo** - Visualización de gastos con gráficos dinámicos (Pie, Donut, Barras, Área)
- **Multi-Tema** - 3 temas disponibles (Oscuro, Lavanda, Atardecer)
- **Multi-Moneda** - Soporte para MXN, USD y EUR
- **Filtros Avanzados** - Filtrar por fecha y buscar transacciones
- **Reportes Mensuales** - Análisis detallado por mes
- **Metas de Ahorro** - Establece y rastrea objetivos financieros
- **Responsive** - Funciona en desktop, tablet y móvil

---

## Tech Stack

### Frontend
- React 18
- Vite
- Styled Components
- Recharts
- React Router
- Axios

### Backend
- Node.js
- Express
- MySQL
- JWT
- bcryptjs

---

## Estructura del Proyecto

```
gastos-portfolio-mvp/
├── client/                    # Frontend React
│   └── src/
│       ├── components/        # Componentes reutilizables
│       │   └── dashboard/     # Componentes del dashboard
│       ├── context/           # React Context (Auth, Theme, Settings)
│       ├── pages/             # Páginas (Login, Register, Dashboard)
│       └── services/          # API services
│
└── server/                    # Backend Node.js
    ├── config/               # Configuración BD
    ├── controllers/          # Lógica de negocio
    ├── middleware/           # Auth middleware
    ├── routes/               # Rutas API
    └── index.js              # Entry point
```

---

## Instalación Local

### Requisitos Previos
- Node.js 18+
- MySQL 8+

### 1. Clonar el Repositorio

```bash
git clone https://github.com/jaircastorena2/Gesti-n-financiera.git
cd Gesti-n-financiera
```

### 2. Configurar Backend

```bash
cd server
cp .env.example .env    # Crear archivo de configuración
npm install             # Instalar dependencias
npm run dev             # Iniciar servidor (puerto 5000)
```

### 3. Configurar Frontend

```bash
cd client
npm install             # Instalar dependencias
npm run dev             # Iniciar cliente (puerto 5173)
```

---

## Cuenta Demo

Para probar la aplicación:

| Campo | Valor |
|-------|-------|
| Email | `demo@gastos.com` |
| Password | `Demo2024!` |

---

## API Endpoints

### Autenticación
```
POST   /api/auth/register   - Registrar usuario
POST   /api/auth/login      - Iniciar sesión
GET    /api/auth/me         - Usuario actual
```

### Gastos
```
GET    /api/expenses        - Listar gastos
GET    /api/expenses/stats  - Estadísticas
POST   /api/expenses        - Crear gasto
PUT    /api/expenses/:id    - Actualizar gasto
DELETE /api/expenses/:id    - Eliminar gasto
```

### Categorías
```
GET    /api/categories      - Listar categorías
```

---

## Despliegue

| Servicio | Plataforma |
|----------|------------|
| Frontend | Vercel |
| Backend | Render |
| Base de Datos | Railway (MySQL) |

---

## Autor

**Carlos Jair Castorena**

---

## Licencia

Este proyecto está bajo la Licencia MIT.
