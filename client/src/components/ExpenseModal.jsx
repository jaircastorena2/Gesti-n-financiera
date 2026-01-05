import { useState, useEffect } from 'react';
import styled from 'styled-components';

function ExpenseModal({ expense, categories, onSave, onClose }) {
    const [formData, setFormData] = useState({
        category_id: '',
        amount: '',
        description: '',
        expense_date: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (expense) {
            setFormData({
                category_id: expense.category_id,
                amount: expense.amount,
                description: expense.description || '',
                expense_date: expense.expense_date.split('T')[0]
            });
        }
    }, [expense]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSave({
            ...formData,
            amount: parseFloat(formData.amount)
        });
        setLoading(false);
    };

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <div className="icon-wrapper">
                        {expense ? '✏️' : '➕'}
                    </div>
                    <div className="header-text">
                        <h2>{expense ? 'Editar Gasto' : 'Nuevo Gasto'}</h2>
                        <p>{expense ? 'Modifica los detalles' : 'Registra una transacción'}</p>
                    </div>
                    <button className="close" onClick={onClose}>
                        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                    </button>
                </ModalHeader>

                <Form onSubmit={handleSubmit}>
                    <FormField>
                        <label>Categoría</label>
                        <select
                            required
                            value={formData.category_id}
                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        >
                            <option value="">Seleccionar...</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    <FormField>
                        <label>Monto</label>
                        <div className="input-group">
                            <span className="prefix">$</span>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                required
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                placeholder="0.00"
                            />
                        </div>
                    </FormField>

                    <FormField>
                        <label>Fecha</label>
                        <input
                            type="date"
                            required
                            value={formData.expense_date}
                            onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                        />
                    </FormField>

                    <FormField>
                        <label>Descripción <span className="optional">(opcional)</span></label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Ej: Cena con amigos"
                        />
                    </FormField>

                    <ButtonRow>
                        <button type="button" className="cancel" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="submit" disabled={loading}>
                            {loading ? (
                                <span className="spinner"></span>
                            ) : (
                                expense ? 'Actualizar' : 'Guardar'
                            )}
                        </button>
                    </ButtonRow>
                </Form>
            </Modal>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    animation: fadeIn 0.2s ease;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const Modal = styled.div`
    width: 100%;
    max-width: 440px;
    background: var(--bgSecondary);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 32px;
    animation: slideUp 0.3s ease;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;

    .icon-wrapper {
        width: 52px;
        height: 52px;
        background: var(--gradient);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
    }

    .header-text {
        flex: 1;

        h2 {
            font-size: 20px;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 2px;
        }

        p {
            font-size: 13px;
            color: var(--textMuted);
        }
    }

    .close {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: var(--bgTertiary);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--textMuted);
        transition: all 0.2s;

        svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
        }

        &:hover {
            background: var(--border);
            color: var(--text);
        }
    }
`;

const Form = styled.form``;

const FormField = styled.div`
    margin-bottom: 20px;

    label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        color: var(--textMuted);
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 0.5px;

        .optional {
            text-transform: none;
            font-weight: 400;
            color: var(--textMuted);
        }
    }

    input, select {
        width: 100%;
        padding: 16px 18px;
        background: var(--bgTertiary);
        border: 1px solid var(--border);
        border-radius: 14px;
        color: var(--text);
        font-size: 15px;
        transition: all 0.2s;

        &:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
        }

        &::placeholder {
            color: var(--textMuted);
        }
    }

    select {
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%2364748b'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 16px center;
    }

    .input-group {
        position: relative;

        .prefix {
            position: absolute;
            left: 18px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--textMuted);
            font-size: 16px;
            font-weight: 600;
        }

        input {
            padding-left: 38px;
        }
    }
`;

const ButtonRow = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 32px;

    button {
        flex: 1;
        padding: 16px;
        border-radius: 14px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cancel {
        background: var(--bgTertiary);
        color: var(--textSecondary);

        &:hover {
            background: var(--border);
            color: var(--text);
        }
    }

    .submit {
        background: var(--gradient);
        color: #fff;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .spinner {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    }
`;

export default ExpenseModal;
