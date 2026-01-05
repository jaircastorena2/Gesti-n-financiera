import styled from 'styled-components';
import { useSettings } from '../../context/SettingsContext';

function MetasSection({ goals, onAddGoal, onEditGoal, onDeleteGoal }) {
    const { formatMoney } = useSettings();

    const tips = [
        { icon: '☕', title: 'Reduce gastos hormiga', desc: 'Pequeños gastos diarios pueden sumar $2,000+ al mes' },
        { icon: '📱', title: 'Revisa suscripciones', desc: 'Cancela servicios que no usas regularmente' },
        { icon: '🛒', title: 'Planifica tus compras', desc: 'Haz una lista antes de ir al supermercado' }
    ];

    return (
        <>
            <GoalsSection>
                <div className="goals-grid">
                    {goals.map((goal) => {
                        const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                        return (
                            <div key={goal.id} className="goal-card">
                                <div className="goal-header">
                                    <span className="goal-icon">{goal.icon}</span>
                                    <span className="goal-name">{goal.name}</span>
                                    <div className="goal-actions">
                                        <button onClick={() => onEditGoal(goal)} title="Editar">
                                            <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
                                        </button>
                                        <button onClick={() => onDeleteGoal(goal.id)} title="Eliminar">
                                            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="goal-progress">
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${progress}%`, background: goal.color }}></div>
                                    </div>
                                    <div className="progress-info">
                                        <span>{formatMoney(goal.currentAmount)} / {formatMoney(goal.targetAmount)}</span>
                                        <span>{progress.toFixed(0)}%</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button className="add-goal-btn" onClick={onAddGoal}>
                    <span>+</span> Agregar nueva meta
                </button>
            </GoalsSection>

            <TipsSection>
                <h3>💡 Consejos para ahorrar</h3>
                <div className="tips-list">
                    {tips.map((tip, i) => (
                        <div key={i} className="tip-item">
                            <span className="tip-icon">{tip.icon}</span>
                            <div className="tip-content">
                                <span className="tip-title">{tip.title}</span>
                                <span className="tip-desc">{tip.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </TipsSection>
        </>
    );
}

const GoalsSection = styled.div`
    margin-bottom: 24px;
    
    .goals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
    
    .goal-card { 
        background: var(--cardBg); 
        border: 1px solid var(--border); 
        border-radius: 20px; 
        padding: 24px; 
        transition: all 0.3s; 
        &:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); } 
    }
    
    .goal-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .goal-icon { font-size: 28px; }
    .goal-name { font-size: 16px; font-weight: 600; color: var(--text); flex: 1; }
    
    .goal-actions { 
        display: flex; 
        gap: 6px;
        button {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            background: var(--bgTertiary);
            color: var(--textMuted);
            svg { width: 14px; height: 14px; fill: currentColor; }
            &:hover { color: var(--accent); transform: scale(1.1); }
            &:last-child:hover { color: #ef4444; }
        }
    }
    
    .progress-bar { height: 10px; background: var(--bgTertiary); border-radius: 5px; overflow: hidden; margin-bottom: 12px; }
    .progress-fill { height: 100%; border-radius: 5px; transition: width 0.5s ease; }
    .progress-info { display: flex; justify-content: space-between; font-size: 13px; color: var(--textMuted); }
    
    .add-goal-btn { 
        width: 100%; 
        padding: 16px; 
        background: var(--bgTertiary); 
        border: 2px dashed var(--border); 
        border-radius: 16px; 
        color: var(--textMuted); 
        font-size: 14px; 
        font-weight: 600; 
        cursor: pointer; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        gap: 8px; 
        transition: all 0.2s; 
        span { font-size: 20px; } 
        &:hover { border-color: var(--accent); color: var(--accent); } 
    }
    
    @media (max-width: 900px) { .goals-grid { grid-template-columns: 1fr; } }
`;

const TipsSection = styled.div`
    background: var(--cardBg);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px;
    
    h3 { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 20px; }
    
    .tips-list { display: flex; flex-direction: column; gap: 12px; }
    .tip-item { display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--bgTertiary); border-radius: 12px; }
    .tip-icon { font-size: 24px; }
    .tip-content { display: flex; flex-direction: column; gap: 4px; }
    .tip-title { font-size: 14px; font-weight: 600; color: var(--text); }
    .tip-desc { font-size: 13px; color: var(--textMuted); }
`;

export default MetasSection;
