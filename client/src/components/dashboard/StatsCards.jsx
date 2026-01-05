import styled from 'styled-components';
import { useSettings } from '../../context/SettingsContext';

function StatsCards({ thisMonthExpenses, totalExpenses, expensesCount, avgPerTransaction }) {
    const { formatMoney } = useSettings();

    const stats = [
        { icon: '💳', label: 'Gasto Este Mes', value: formatMoney(thisMonthExpenses), badge: 'Este mes', gradient: 'gradient-1' },
        { icon: '📊', label: 'Total Gastado', value: formatMoney(totalExpenses), badge: 'Histórico', gradient: 'gradient-2' },
        { icon: '📝', label: 'Transacciones', value: expensesCount, badge: 'Total', gradient: 'gradient-3' },
        { icon: '📈', label: 'Promedio', value: formatMoney(avgPerTransaction), badge: 'Por gasto', gradient: 'gradient-4' }
    ];

    return (
        <StatsRow>
            {stats.map((stat, i) => (
                <StatCard key={i} className={stat.gradient}>
                    <div className="stat-content">
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-details">
                            <span className="label">{stat.label}</span>
                            <span className="value">{stat.value}</span>
                        </div>
                    </div>
                    <div className="stat-badge">{stat.badge}</div>
                </StatCard>
            ))}
        </StatsRow>
    );
}

const StatsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 28px;
    @media (max-width: 1200px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const StatCard = styled.div`
    background: var(--cardBg);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px;
    position: relative;
    transition: all 0.3s;

    &.gradient-1 { border-top: 3px solid #8b5cf6; }
    &.gradient-2 { border-top: 3px solid #06b6d4; }
    &.gradient-3 { border-top: 3px solid #ec4899; }
    &.gradient-4 { border-top: 3px solid #f59e0b; }

    &:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
    
    .stat-content { display: flex; align-items: flex-start; gap: 16px; }
    .stat-icon { font-size: 28px; }
    .stat-details { display: flex; flex-direction: column; gap: 6px; }
    .label { font-size: 13px; color: var(--textMuted); font-weight: 500; }
    .value { font-size: 26px; font-weight: 700; color: var(--text); }
    .stat-badge { 
        position: absolute; 
        top: 20px; 
        right: 20px; 
        padding: 4px 10px; 
        background: var(--bgTertiary); 
        border-radius: 20px; 
        font-size: 11px; 
        color: var(--textMuted); 
        font-weight: 500; 
    }
`;

export default StatsCards;
