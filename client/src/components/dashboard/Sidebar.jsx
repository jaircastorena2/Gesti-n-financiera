import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useTheme, themes } from '../../context/ThemeContext';

function Sidebar({ activeSection, setActiveSection, showThemeMenu, setShowThemeMenu }) {
    const { logout } = useAuth();
    const { theme, currentTheme, setTheme } = useTheme();

    const navItems = [
        { key: 'dashboard', label: 'Dashboard', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
        { key: 'reportes', label: 'Reportes', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
        { key: 'metas', label: 'Metas', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
        { key: 'ajustes', label: 'Ajustes', icon: 'M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z' }
    ];

    return (
        <SidebarWrapper>
            <div className="logo">
                <div className="logo-icon">💰</div>
                <div className="logo-text">
                    <span>Gestión</span>
                    <span className="sub">Financiera</span>
                </div>
            </div>

            <nav className="nav">
                {navItems.map(item => (
                    <button
                        key={item.key}
                        className={`nav-item ${activeSection === item.key ? 'active' : ''}`}
                        onClick={() => setActiveSection(item.key)}
                    >
                        <div className="nav-icon">
                            <svg viewBox="0 0 24 24"><path d={item.icon} /></svg>
                        </div>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-bottom">
                <div className="theme-selector">
                    <button className="theme-btn" onClick={() => setShowThemeMenu(!showThemeMenu)}>
                        <span>{theme.icon}</span>
                        <span>{theme.name}</span>
                        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                    </button>
                    {showThemeMenu && (
                        <div className="theme-menu">
                            {Object.entries(themes).map(([key, t]) => (
                                <button
                                    key={key}
                                    className={`theme-option ${currentTheme === key ? 'active' : ''}`}
                                    onClick={() => { setTheme(key); setShowThemeMenu(false); }}
                                >
                                    <span>{t.icon}</span>
                                    <span>{t.name}</span>
                                    {currentTheme === key && <span className="check">✓</span>}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button className="logout-btn" onClick={logout}>
                    <svg viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
                    Cerrar Sesión
                </button>
            </div>
        </SidebarWrapper>
    );
}

const SidebarWrapper = styled.aside`
    width: 240px;
    background: var(--sidebar);
    border-right: 1px solid var(--border);
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    transition: all 0.3s ease;

    .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 12px;
        margin-bottom: 40px;

        .logo-icon {
            width: 44px;
            height: 44px;
            background: var(--gradient);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
        }

        .logo-text {
            display: flex;
            flex-direction: column;
            span { font-size: 16px; font-weight: 700; color: #fff; line-height: 1.2; }
            .sub { font-size: 13px; font-weight: 500; opacity: 0.8; }
        }
    }

    .nav { flex: 1; }

    .nav-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
        border-radius: 12px;
        color: rgba(255,255,255,0.6);
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
        transition: all 0.2s;
        background: transparent;
        border: none;
        cursor: pointer;
        text-align: left;

        .nav-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(255,255,255,0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            svg { width: 18px; height: 18px; fill: currentColor; }
        }

        &:hover { color: #fff; background: rgba(255,255,255,0.05); }

        &.active {
            color: #fff;
            background: rgba(255,255,255,0.1);
            .nav-icon { background: var(--gradient); svg { fill: #fff; } }
        }
    }

    .sidebar-bottom { display: flex; flex-direction: column; gap: 8px; }

    .theme-selector { position: relative; }

    .theme-btn {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 14px;
        border-radius: 12px;
        background: rgba(255,255,255,0.05);
        border: none;
        color: #fff;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        svg { width: 18px; height: 18px; fill: currentColor; margin-left: auto; }
        &:hover { background: rgba(255,255,255,0.1); }
    }

    .theme-menu {
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        background: var(--bgSecondary);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 8px;
        margin-bottom: 8px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }

    .theme-option {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 8px;
        background: transparent;
        border: none;
        color: var(--text);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s;
        .check { margin-left: auto; color: var(--accent); }
        &:hover { background: var(--bgTertiary); }
        &.active { background: var(--bgTertiary); }
    }

    .logout-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
        background: rgba(239, 68, 68, 0.15);
        color: #f87171;
        svg { width: 18px; height: 18px; fill: currentColor; }
        &:hover { background: rgba(239, 68, 68, 0.25); }
    }

    @media (max-width: 1024px) { display: none; }
`;

export default Sidebar;
