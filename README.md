# 💰 Gestión Financiera - Dashboard de Gastos Personales

<div align="center">

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Una aplicación Full Stack moderna para gestionar tus finanzas personales**

[Demo en Vivo](#) | [Reportar Bug](../../issues) | [Solicitar Feature](../../issues)

</div>

---

## 📸 Capturas de Pantalla

### Dashboard Principal
Vista general con estadísticas, gráficos interactivos y transacciones recientes.

### Multi-Tema
Soporte para 3 temas: **Oscuro**, **Lavanda** y **Atardecer**.

### Reportes Mensuales
Análisis detallado de gastos por mes con comparativas visuales.

---

## ✨ Características

- 🔐 **Autenticación JWT** - Registro y login seguro
- 📊 **Dashboard Interactivo** - Visualización de gastos con gráficos dinámicos (Pie, Donut, Barras, Área)
- 🎨 **Multi-Tema** - 3 temas disponibles (Oscuro, Lavanda, Atardecer)
- 💱 **Multi-Moneda** - Soporte para MXN, USD y EUR
- 📅 **Filtros Avanzados** - Filtrar por fecha y buscar transacciones
- 📈 **Reportes Mensuales** - Análisis detallado por mes
- 🎯 **Metas de Ahorro** - Establece y rastrea objetivos financieros
- ⚙️ **Configuración** - Personaliza tu experiencia
- 📱 **Responsive** - Funciona en desktop, tablet y móvil

---

## 🛠️ Tech Stack

### Frontend
| Tecnología | Uso |
|------------|-----|
| React 18 | UI Framework |
| Vite | Build Tool |
| Styled Components | Estilos CSS-in-JS |
| Recharts | Gráficos |
| React Router | Navegación SPA |
| Axios | Cliente HTTP |

### Backend
| Tecnología | Uso |
|------------|-----|
| Node.js | Runtime |
| Express | Framework HTTP |
| MySQL | Base de Datos |
| JWT | Autenticación |
| bcryptjs | Hash de contraseñas |

---

## 📁 Estructura del Proyecto

```
gastos-portfolio-mvp/
├── client/                    # Frontend React
│   └── src/
│       ├── components/        # Componentes reutilizables
│       │   └── dashboard/     # Componentes del dashboard
│       ├── context/           # React Context (Auth, Theme, Settings)
│       ├── hooks/             # Custom hooks
│       ├── pages/             # Páginas (Login, Register, Dashboard)
│       └── services/          # API services
│
├── server/                    # Backend Node.js
│   ├── config/               # Configuración BD
│   ├── controllers/          # Lógica de negocio
│   ├── middleware/           # Auth middleware
│   ├── models/               # Modelos de datos
│   ├── routes/               # Rutas API
│   └── schema.sql            # Esquema de BD
│
└── README.md
```

---

## 🚀 Instalación

### Requisitos Previos
- Node.js 18+
- MySQL 8+ (o XAMPP)

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/jaircastorena2/gestion-financiera.git
cd gestion-financiera
```

### 2️⃣ Configurar Base de Datos

```bash
# Importar esquema en MySQL
mysql -u root -p < server/schema.sql

# (Opcional) Importar datos de ejemplo
mysql -u root -p expense_dashboard < server/demo-seed.sql
```

### 3️⃣ Configurar Backend

```bash
cd server
cp .env.example .env    # Crear archivo de configuración
npm install             # Instalar dependencias
npm run dev             # Iniciar servidor (puerto 5000)
```

### 4️⃣ Configurar Frontend

```bash
cd client
npm install             # Instalar dependencias
npm run dev             # Iniciar cliente (puerto 5173)
```

---

## 🔑 Cuenta Demo

Para probar la aplicación sin registrarte:

| Campo | Valor |
|-------|-------|
| Email | `demo@gastos.com` |
| Password | `Demo2024!` |

---

## 📡 API Endpoints

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

## 🎨 Temas Disponibles

| Tema | Descripción |
|------|-------------|
| 🌑 Oscuro | Modo oscuro elegante con acentos cyan |
| 💜 Lavanda | Tema claro con tonos púrpura |
| 🌅 Atardecer | Tonos cálidos oscuros |

---

## 👤 Autor

**Carlos Jair Castorena**

[![GitHub](https://img.shields.io/badge/GitHub-@jaircastorena2-181717?style=flat&logo=github)](https://github.com/jaircastorena2)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-carlos--jair--castorena-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/carlos-jair-castorena)

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
