import styled from 'styled-components';
import { useSettings } from '../context/SettingsContext';

function ExpenseList({ expenses, onEdit, onDelete }) {
    const { formatMoney } = useSettings();

    if (expenses.length === 0) {
        return (
            <EmptyState>
                <span className="icon">📭</span>
                <h3>No hay transacciones</h3>
                <p>Agrega tu primer gasto para comenzar</p>
            </EmptyState>
        );
    }

    return (
        <TableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={expense.id} style={{ animationDelay: `${index * 0.05}s` }}>
                            <td>
                                <div className="category">
                                    <span
                                        className="cat-icon"
                                        style={{ background: `${expense.color}15`, color: expense.color }}
                                    >
                                        {expense.icon}
                                    </span>
                                    <span className="cat-name">{expense.category_name}</span>
                                </div>
                            </td>
                            <td>
                                <span className="description">{expense.description || '—'}</span>
                            </td>
                            <td>
                                <span className="date">
                                    {new Date(expense.expense_date).toLocaleDateString('es-MX', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </td>
                            <td>
                                <span className="amount">
                                    -{formatMoney(Number(expense.amount))}
                                </span>
                            </td>
                            <td>
                                <div className="actions">
                                    <button className="action edit" onClick={() => onEdit(expense)} title="Editar">
                                        <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
                                    </button>
                                    <button className="action delete" onClick={() => onDelete(expense.id)} title="Eliminar">
                                        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </TableWrapper>
    );
}

const EmptyState = styled.div`
    background: var(--cardBg);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 60px 40px;
    text-align: center;
    transition: all 0.3s ease;

    .icon {
        font-size: 48px;
        margin-bottom: 16px;
        display: block;
    }

    h3 {
        color: var(--text);
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    p {
        color: var(--textMuted);
        font-size: 14px;
    }
`;

const TableWrapper = styled.div`
    background: var(--cardBg);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.3s ease;

    table {
        width: 100%;
        border-collapse: collapse;
    }

    thead {
        background: var(--bgTertiary);

        tr {
            border-bottom: 1px solid var(--border);
        }

        th {
            padding: 16px 24px;
            text-align: left;
            font-size: 11px;
            font-weight: 600;
            color: var(--textMuted);
            text-transform: uppercase;
            letter-spacing: 0.8px;

            &:last-child {
                width: 100px;
            }
        }
    }

    tbody {
        tr {
            border-bottom: 1px solid var(--border);
            transition: all 0.2s;
            animation: fadeIn 0.3s ease forwards;
            opacity: 0;

            &:last-child {
                border-bottom: none;
            }

            &:hover {
                background: var(--bgTertiary);
            }
        }

        td {
            padding: 18px 24px;
            vertical-align: middle;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .category {
        display: flex;
        align-items: center;
        gap: 14px;
    }

    .cat-icon {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }

    .cat-name {
        font-size: 14px;
        font-weight: 600;
        color: var(--text);
    }

    .description {
        font-size: 14px;
        color: var(--textSecondary);
    }

    .date {
        font-size: 13px;
        color: var(--textMuted);
    }

    .amount {
        font-size: 15px;
        font-weight: 700;
        color: var(--danger);
    }

    .actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
    }

    .action {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;

        svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }

        &.edit {
            background: rgba(6, 182, 212, 0.1);
            color: var(--accent);

            &:hover {
                background: rgba(6, 182, 212, 0.2);
                transform: scale(1.1);
            }
        }

        &.delete {
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;

            &:hover {
                background: rgba(239, 68, 68, 0.2);
                transform: scale(1.1);
            }
        }
    }

    @media (max-width: 900px) {
        overflow-x: auto;

        table {
            min-width: 700px;
        }
    }
`;

export default ExpenseList;
