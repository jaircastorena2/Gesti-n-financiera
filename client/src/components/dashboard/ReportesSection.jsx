import styled from 'styled-components';
import { useSettings } from '../../context/SettingsContext';
import ExpenseList from '../ExpenseList';

function ReportesSection({ expenses, stats, totalExpenses, topCategories, onEdit, onDelete }) {
    const { formatMoney } = useSettings();
    const monthlyAvg = totalExpenses / Math.max(stats.byMonth?.length || 1, 1);

    // Get monthly data sorted by date (most recent first)
    const monthlyData = (stats.byMonth || [])
        .map(m => ({ ...m, total: Number(m.total) || 0 }))
        .sort((a, b) => {
            const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            return months.indexOf(b.month) - months.indexOf(a.month);
        });

    // Get max for chart scaling
    const maxMonthTotal = Math.max(...monthlyData.map(m => m.total), 1);

    return (
        <>
            <ReportSection>
                <h3>📊 Resumen General</h3>
                <div className="report-grid">
                    <div className="report-card">
                        <span className="report-icon">💰</span>
                        <div className="report-info">
                            <span className="report-label">Total gastado</span>
                            <span className="report-value">{formatMoney(totalExpenses)}</span>
                        </div>
                    </div>
                    <div className="report-card">
                        <span className="report-icon">📅</span>
                        <div className="report-info">
                            <span className="report-label">Promedio mensual</span>
                            <span className="report-value">{formatMoney(monthlyAvg)}</span>
                        </div>
                    </div>
                    <div className="report-card">
                        <span className="report-icon">🏷️</span>
                        <div className="report-info">
                            <span className="report-label">Categoría más usada</span>
                            <span className="report-value">{topCategories[0]?.name || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </ReportSection>

            <ReportSection>
                <h3>📆 Gastos por Mes</h3>
                <div className="monthly-grid">
                    {monthlyData.map((month, i) => {
                        const percentage = (month.total / maxMonthTotal) * 100;
                        const isHighest = month.total === maxMonthTotal;

                        return (
                            <div key={i} className={`month-card ${isHighest ? 'highest' : ''}`}>
                                <div className="month-header">
                                    <span className="month-name">{month.month}</span>
                                    {isHighest && <span className="highest-badge">Mayor gasto</span>}
                                </div>
                                <div className="month-amount">{formatMoney(month.total)}</div>
                                <div className="month-bar">
                                    <div
                                        className="month-bar-fill"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <div className="month-comparison">
                                    {percentage >= 100 ? '📈' : percentage >= 80 ? '➡️' : '📉'}
                                    {' '}{percentage.toFixed(0)}% del máximo
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ReportSection>

            <ReportSection>
                <h3>🏆 Top Categorías por Gasto</h3>
                <div className="category-bars">
                    {topCategories.slice(0, 5).map((cat, i) => (
                        <div key={i} className="category-bar-item">
                            <div className="bar-header">
                                <span>{cat.icon} {cat.name}</span>
                                <span className="bar-amount">{formatMoney(Number(cat.total))}</span>
                            </div>
                            <div className="bar-track">
                                <div
                                    className="bar-fill"
                                    style={{
                                        width: `${(cat.total / topCategories[0].total) * 100}%`,
                                        background: cat.color
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </ReportSection>

            <Section>
                <div className="section-header">
                    <h3>Todas las Transacciones</h3>
                </div>
                <ExpenseList expenses={expenses} onEdit={onEdit} onDelete={onDelete} />
            </Section>
        </>
    );
}

const Section = styled.section`
    .section-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 20px; 
        h3 { font-size: 18px; font-weight: 600; color: var(--text); } 
    }
`;

const ReportSection = styled.div`
    background: var(--cardBg);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 24px;
    
    h3 { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 20px; }
    
    .report-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .report-card { background: var(--bgTertiary); border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px; }
    .report-icon { font-size: 32px; }
    .report-info { display: flex; flex-direction: column; gap: 4px; }
    .report-label { font-size: 13px; color: var(--textMuted); }
    .report-value { font-size: 18px; font-weight: 700; color: var(--text); }
    
    /* Monthly Grid Styles */
    .monthly-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }
    
    .month-card {
        background: var(--bgTertiary);
        border-radius: 16px;
        padding: 20px;
        transition: transform 0.2s, box-shadow 0.2s;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        &.highest {
            border: 2px solid var(--accent);
            background: linear-gradient(135deg, var(--bgTertiary) 0%, rgba(var(--accentRgb, 139, 92, 246), 0.1) 100%);
        }
    }
    
    .month-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }
    
    .month-name {
        font-size: 14px;
        font-weight: 600;
        color: var(--textMuted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .highest-badge {
        font-size: 10px;
        padding: 4px 8px;
        background: var(--accent);
        color: white;
        border-radius: 12px;
        font-weight: 600;
    }
    
    .month-amount {
        font-size: 24px;
        font-weight: 700;
        color: var(--text);
        margin-bottom: 12px;
    }
    
    .month-bar {
        height: 6px;
        background: var(--border);
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 8px;
    }
    
    .month-bar-fill {
        height: 100%;
        background: var(--gradient);
        border-radius: 3px;
        transition: width 0.5s ease;
    }
    
    .month-comparison {
        font-size: 12px;
        color: var(--textMuted);
    }
    
    /* Category bars */
    .category-bars { display: flex; flex-direction: column; gap: 16px; }
    .category-bar-item { 
        .bar-header { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: var(--text); } 
        .bar-amount { font-weight: 600; } 
    }
    .bar-track { height: 8px; background: var(--bgTertiary); border-radius: 4px; overflow: hidden; }
    .bar-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
    
    @media (max-width: 900px) { 
        .report-grid { grid-template-columns: 1fr; }
        .monthly-grid { grid-template-columns: repeat(2, 1fr); }
    }
    
    @media (max-width: 600px) {
        .monthly-grid { grid-template-columns: 1fr; }
    }
`;

export default ReportesSection;
