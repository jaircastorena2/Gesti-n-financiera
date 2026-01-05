import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useTheme, themes } from '../../context/ThemeContext';
import { useSettings } from '../../context/SettingsContext';

function AjustesSection() {
    const { user } = useAuth();
    const { currentTheme, setTheme } = useTheme();
    const { currency, setCurrency, currencies, dateFormat, setDateFormat, dateFormats } = useSettings();

    return (
        <SettingsSection>
            <div className="settings-group">
                <h3>👤 Perfil</h3>
                <div className="settings-card">
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">Nombre</span>
                            <span className="setting-value">{user?.name}</span>
                        </div>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">Email</span>
                            <span className="setting-value">{user?.email}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="settings-group">
                <h3>🎨 Apariencia</h3>
                <div className="settings-card">
                    <div className="theme-options">
                        {Object.entries(themes).map(([key, t]) => (
                            <button
                                key={key}
                                className={`theme-card ${currentTheme === key ? 'active' : ''}`}
                                onClick={() => setTheme(key)}
                            >
                                <span className="theme-icon">{t.icon}</span>
                                <span className="theme-name">{t.name}</span>
                                {currentTheme === key && <span className="theme-check">✓</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="settings-group">
                <h3>💰 Preferencias</h3>
                <div className="settings-card">
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">Moneda</span>
                            <select
                                className="setting-select"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            >
                                {Object.entries(currencies).map(([code, curr]) => (
                                    <option key={code} value={code}>
                                        {curr.symbol} {curr.code} - {curr.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">Formato de fecha</span>
                            <select
                                className="setting-select"
                                value={dateFormat}
                                onChange={(e) => setDateFormat(e.target.value)}
                            >
                                {Object.entries(dateFormats).map(([key, fmt]) => (
                                    <option key={key} value={key}>
                                        {fmt.format} (Ej: {fmt.example})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </SettingsSection>
    );
}

const SettingsSection = styled.div`
    .settings-group { 
        margin-bottom: 32px; 
        h3 { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 16px; } 
    }
    
    .settings-card { background: var(--cardBg); border: 1px solid var(--border); border-radius: 20px; padding: 8px; }
    
    .setting-item { 
        padding: 16px 20px; 
        border-bottom: 1px solid var(--border); 
        &:last-child { border-bottom: none; } 
    }
    
    .setting-info { display: flex; flex-direction: column; gap: 8px; }
    .setting-label { font-size: 13px; color: var(--textMuted); }
    .setting-value { font-size: 15px; font-weight: 500; color: var(--text); }
    
    .setting-select {
        width: 100%;
        padding: 14px 18px;
        background: var(--bgTertiary);
        border: 1px solid var(--border);
        border-radius: 12px;
        color: var(--text);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%2364748b'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
        
        &:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
        }
        &:hover { border-color: var(--accent); }
        option { background: var(--bgSecondary); color: var(--text); padding: 10px; }
    }
    
    .theme-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 16px; }
    
    .theme-card { 
        padding: 20px; 
        background: var(--bgTertiary); 
        border: 2px solid transparent; 
        border-radius: 16px; 
        cursor: pointer; 
        transition: all 0.2s; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        gap: 8px; 
        &.active { border-color: var(--accent); } 
        &:hover { border-color: var(--accent); } 
    }
    
    .theme-icon { font-size: 28px; }
    .theme-name { font-size: 13px; font-weight: 600; color: var(--text); }
    .theme-check { color: var(--accent); font-size: 16px; }
`;

export default AjustesSection;
