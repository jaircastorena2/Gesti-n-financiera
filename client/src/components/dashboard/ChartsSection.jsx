import styled from 'styled-components';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useSettings } from '../../context/SettingsContext';

function ChartsSection({ stats, totalExpenses, chartType, setChartType }) {
    const { formatMoney } = useSettings();

    // Default colors if category doesn't have color
    const COLORS = ['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

    // Convert totals to numbers since they may come as strings from DB
    const categoryData = (stats.byCategory || [])
        .map(c => ({ ...c, total: Number(c.total) || 0 }))
        .filter(c => c.total > 0);

    const monthData = (stats.byMonth || [])
        .map(m => ({ ...m, total: Number(m.total) || 0 }));

    return (
        <ChartsRow>
            {/* Category Chart */}
            <ChartCard>
                <div className="card-header">
                    <h3>Por Categoría</h3>
                    <div className="chart-type-selector">
                        <button
                            className={chartType === 'pie' ? 'active' : ''}
                            onClick={() => setChartType('pie')}
                            title="Circular"
                        >🥧</button>
                        <button
                            className={chartType === 'donut' ? 'active' : ''}
                            onClick={() => setChartType('donut')}
                            title="Dona"
                        >🍩</button>
                        <button
                            className={chartType === 'bar' ? 'active' : ''}
                            onClick={() => setChartType('bar')}
                            title="Barras"
                        >📊</button>
                    </div>
                </div>
                <div className="chart-area category-chart">
                    {categoryData.length > 0 ? (
                        <>
                            {chartType === 'bar' ? (
                                <ResponsiveContainer width="100%" height={220}>
                                    <BarChart data={categoryData.slice(0, 6)} layout="vertical">
                                        <XAxis type="number" hide />
                                        <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12, fill: 'var(--textMuted)' }} tickLine={false} axisLine={false} />
                                        <Tooltip formatter={(value) => [formatMoney(Number(value)), '']} contentStyle={{ backgroundColor: 'var(--bgSecondary)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                                        <Bar dataKey="total" radius={[0, 6, 6, 0]}>
                                            {categoryData.slice(0, 6).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <ResponsiveContainer width="100%" height={220}>
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={chartType === 'donut' ? 50 : 0}
                                            outerRadius={80}
                                            paddingAngle={3}
                                            dataKey="total"
                                            stroke="none"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color || COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [formatMoney(Number(value)), '']} contentStyle={{ backgroundColor: 'var(--bgSecondary)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                            <div className="pie-legend horizontal">
                                {categoryData.slice(0, 6).map((cat, i) => (
                                    <div key={i} className="legend-chip">
                                        <span className="dot" style={{ background: cat.color }}></span>
                                        <span>{cat.icon}</span>
                                        <span className="percent">{((cat.total / totalExpenses) * 100).toFixed(0)}%</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="no-data"><span>🎯</span><p>Sin datos de categorías</p></div>
                    )}
                </div>
            </ChartCard>

            {/* Monthly Trend Chart */}
            <ChartCard className="wide">
                <div className="card-header">
                    <h3>Tendencia de Gastos</h3>
                    <div className="chart-legend">
                        <span className="legend-item"><span className="dot"></span> Gastos por mes</span>
                    </div>
                </div>
                <div className="chart-area">
                    {monthData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={monthData}>
                                <defs>
                                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                                        <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--textMuted)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--textMuted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                                <Tooltip
                                    formatter={(value) => [formatMoney(Number(value)), 'Total']}
                                    contentStyle={{ backgroundColor: 'var(--bgSecondary)', border: '1px solid var(--border)', borderRadius: '12px' }}
                                />
                                <Area type="monotone" dataKey="total" stroke="var(--accent)" strokeWidth={3} fill="url(#areaGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="no-data"><span>📊</span><p>Agrega gastos para ver la tendencia</p></div>
                    )}
                </div>
            </ChartCard>
        </ChartsRow>
    );
}

const ChartsRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 24px;
    margin-bottom: 28px;
    width: 100%;
    max-width: 100%;
    
    @media (max-width: 1024px) { 
        grid-template-columns: 1fr; 
        gap: 16px;
        margin-bottom: 16px;
    }
`;

const ChartCard = styled.div`
    background: var(--cardBg);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px;
    max-width: 100%;
    overflow: hidden;
    
    @media (max-width: 640px) {
        padding: 12px;
        border-radius: 14px;
    }
    
    .card-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 20px; 
        h3 { font-size: 16px; font-weight: 600; color: var(--text); } 
    }
    
    .chart-type-selector {
        display: flex;
        gap: 6px;
        background: var(--bgTertiary);
        padding: 4px;
        border-radius: 10px;
        
        button {
            width: 36px;
            height: 32px;
            border: none;
            border-radius: 8px;
            background: transparent;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.2s;
            
            &:hover { background: var(--border); }
            &.active { background: var(--accent); }
        }
    }
    
    .chart-legend { display: flex; gap: 16px; }
    .legend-item { 
        display: flex; 
        align-items: center; 
        gap: 6px; 
        font-size: 12px; 
        color: var(--textMuted); 
        .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); } 
    }
    
    .chart-area { 
        &.pie, &.category-chart { display: flex; flex-direction: column; } 
    }
    
    .pie-legend { 
        padding-top: 16px; 
        
        &.horizontal {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            padding-top: 20px;
        }
    }
    
    .legend-chip {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: var(--bgTertiary);
        border-radius: 20px;
        font-size: 12px;
        
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .percent { font-weight: 600; color: var(--text); }
    }
    
    .no-data { 
        height: 200px; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        color: var(--textMuted); 
        span { font-size: 40px; margin-bottom: 12px; } 
    }
`;

export default ChartsSection;
