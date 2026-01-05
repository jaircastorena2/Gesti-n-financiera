import styled from 'styled-components';
import { useSettings } from '../../context/SettingsContext';

function StatsCards({ thisMonthExpenses, totalExpenses, expensesCount, avgPerTransaction }) {
    const { formatMoney } = useSettings();

    const stats = [
        { icon: '💳', label: 'Mes', value: formatMoney(thisMonthExpenses), gradient: 'gradient-1' },
        { icon: '📊', label: 'Total', value: formatMoney(totalExpenses), gradient: 'gradient-2' },
        { icon: '📝', label: 'Txns', value: expensesCount, gradient: 'gradient-3' },
        { icon: '📈', label: 'Prom', value: formatMoney(avgPerTransaction), gradient: 'gradient-4' }
    ];

    return (
        <StatsRow>
            {stats.map((stat, i) => (
                <StatCard key={i} className={stat.gradient}>
                    <span className="stat-icon">{stat.icon}</span>
                    <div className="stat-details">
                        <span className="label">{stat.label}</span>
                        <span className="value">{stat.value}</span>
                    </div>
                </StatCard>
            ))}
        </StatsRow>
    );
}

const StatsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
    width: 100%;
    max-width: 100%;
    
    @media (max-width: 1200px) { 
        grid-template-columns: repeat(2, 1fr); 
    }
    
    @media (max-width: 640px) { 
        grid-template-columns: repeat(2, 1fr); 
        gap: 8px;
        margin-bottom: 12px;
    }
`;

const StatCard = styled.div`
    background: var(--cardBg);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s;
    min-width: 0;
    overflow: hidden;

    &.gradient-1 { border-left: 3px solid #8b5cf6; }
    &.gradient-2 { border-left: 3px solid #06b6d4; }
    &.gradient-3 { border-left: 3px solid #ec4899; }
    &.gradient-4 { border-left: 3px solid #f59e0b; }

    .stat-icon { 
        font-size: 24px; 
        flex-shrink: 0;
    }
    
    .stat-details { 
        display: flex; 
        flex-direction: column; 
        gap: 2px;
        min-width: 0;
        overflow: hidden;
    }
    
    .label { 
        font-size: 11px; 
        color: var(--textMuted); 
        font-weight: 500; 
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .value { 
        font-size: 18px; 
        font-weight: 700; 
        color: var(--text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (max-width: 640px) {
        padding: 10px;
        border-radius: 12px;
        gap: 8px;
        
        .stat-icon { font-size: 18px; }
        .label { font-size: 9px; }
        .value { font-size: 14px; }
    }
`;

export default StatsCards;
