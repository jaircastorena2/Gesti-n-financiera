import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

function MobileNav({ activeSection, setActiveSection }) {
    const { logout } = useAuth();

    const navItems = [
        { key: 'dashboard', label: 'Inicio', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
        { key: 'reportes', label: 'Reportes', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
        { key: 'metas', label: 'Metas', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
        { key: 'ajustes', label: 'Ajustes', icon: 'M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z' },
    ];

    return (
        <MobileNavWrapper>
            {navItems.map(item => (
                <button
                    key={item.key}
                    className={`nav-btn ${activeSection === item.key ? 'active' : ''}`}
                    onClick={() => setActiveSection(item.key)}
                >
                    <svg viewBox="0 0 24 24"><path d={item.icon} /></svg>
                    <span>{item.label}</span>
                </button>
            ))}
            <button className="nav-btn logout" onClick={logout}>
                <svg viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
                <span>Salir</span>
            </button>
        </MobileNavWrapper>
    );
}

const MobileNavWrapper = styled.nav`
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--sidebar);
    border-top: 1px solid var(--border);
    padding: 8px 12px;
    padding-bottom: env(safe-area-inset-bottom, 8px);
    z-index: 1000;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 1024px) {
        display: flex;
    }

    .nav-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 12px;
        border-radius: 10px;
        background: transparent;
        border: none;
        color: rgba(255,255,255,0.5);
        font-size: 10px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;

        svg {
            width: 22px;
            height: 22px;
            fill: currentColor;
        }

        &:hover {
            color: rgba(255,255,255,0.8);
        }

        &.active {
            color: var(--accent);
            background: rgba(255,255,255,0.1);
        }

        &.logout {
            color: #f87171;
        }
    }
`;

export default MobileNav;
