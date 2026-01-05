import { useState } from 'react';
import styled from 'styled-components';

const goalIcons = ['🏖️', '🚗', '🏠', '💻', '📱', '✈️', '🎓', '💍', '🏥', '🎁', '👶', '🏋️'];

function GoalModal({ goal, onSave, onClose }) {
    const [formData, setFormData] = useState({
        name: goal?.name || '',
        icon: goal?.icon || '🏖️',
        targetAmount: goal?.targetAmount || '',
        currentAmount: goal?.currentAmount || 0,
        color: goal?.color || '#8b5cf6'
    });
    const [showIcons, setShowIcons] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            id: goal?.id || Date.now(),
            targetAmount: parseFloat(formData.targetAmount),
            currentAmount: parseFloat(formData.currentAmount) || 0
        });
    };

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <div className="icon-wrapper">
                        {goal ? '✏️' : '🎯'}
                    </div>
                    <div className="header-text">
                        <h2>{goal ? 'Editar Meta' : 'Nueva Meta'}</h2>
                        <p>{goal ? 'Modifica tu objetivo' : 'Establece un nuevo objetivo de ahorro'}</p>
                    </div>
                    <button className="close" onClick={onClose}>
                        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                    </button>
                </ModalHeader>

                <Form onSubmit={handleSubmit}>
                    <FormRow>
                        <FormField className="icon-field">
                            <label>Icono</label>
                            <div className="icon-selector">
                                <button
                                    type="button"
                                    className="selected-icon"
                                    onClick={() => setShowIcons(!showIcons)}
                                >
                                    {formData.icon}
                                </button>
                                {showIcons && (
                                    <div className="icon-grid">
                                        {goalIcons.map((icon) => (
                                            <button
                                                key={icon}
                                                type="button"
                                                className={`icon-option ${formData.icon === icon ? 'active' : ''}`}
                                                onClick={() => {
                                                    setFormData({ ...formData, icon });
                                                    setShowIcons(false);
                                                }}
                                            >
                                                {icon}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </FormField>
                        <FormField style={{ flex: 1 }}>
                            <label>Nombre de la meta</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ej: Vacaciones en la playa"
                            />
                        </FormField>
                    </FormRow>

                    <FormRow>
                        <FormField>
                            <label>Monto objetivo</label>
                            <div className="input-group">
                                <span className="prefix">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    required
                                    value={formData.targetAmount}
                                    onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                                    placeholder="0.00"
                                />
                            </div>
                        </FormField>
                        <FormField>
                            <label>Monto actual <span className="optional">(ahorrado)</span></label>
                            <div className="input-group">
                                <span className="prefix">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.currentAmount}
                                    onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                                    placeholder="0.00"
                                />
                            </div>
                        </FormField>
                    </FormRow>

                    <FormField>
                        <label>Color de la barra</label>
                        <div className="color-options">
                            {['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#ef4444'].map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`color-option ${formData.color === color ? 'active' : ''}`}
                                    style={{ background: color }}
                                    onClick={() => setFormData({ ...formData, color })}
                                />
                            ))}
                        </div>
                    </FormField>

                    <ButtonRow>
                        <button type="button" className="cancel" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="submit">
                            {goal ? 'Actualizar' : 'Crear Meta'}
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
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;

const Modal = styled.div`
    width: 100%;
    max-width: 500px;
    background: var(--bgSecondary);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 32px;
    animation: slideUp 0.3s ease;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
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
        h2 { font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 2px; }
        p { font-size: 13px; color: var(--textMuted); }
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
        svg { width: 20px; height: 20px; fill: currentColor; }
        &:hover { background: var(--border); color: var(--text); }
    }
`;

const Form = styled.form``;

const FormRow = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
`;

const FormField = styled.div`
    margin-bottom: 20px;

    &.icon-field { margin-bottom: 0; }

    label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        color: var(--textMuted);
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        .optional { text-transform: none; font-weight: 400; }
    }

    input {
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
        &::placeholder { color: var(--textMuted); }
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
        input { padding-left: 38px; }
    }

    .icon-selector {
        position: relative;
    }

    .selected-icon {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        background: var(--bgTertiary);
        border: 1px solid var(--border);
        font-size: 28px;
        cursor: pointer;
        transition: all 0.2s;
        &:hover { border-color: var(--accent); }
    }

    .icon-grid {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 8px;
        background: var(--bgSecondary);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 12px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        z-index: 10;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }

    .icon-option {
        width: 44px;
        height: 44px;
        border-radius: 10px;
        background: var(--bgTertiary);
        border: 2px solid transparent;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.2s;
        &:hover { border-color: var(--accent); }
        &.active { border-color: var(--accent); background: var(--accent); }
    }

    .color-options {
        display: flex;
        gap: 12px;
    }

    .color-option {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        border: 3px solid transparent;
        cursor: pointer;
        transition: all 0.2s;
        &:hover { transform: scale(1.1); }
        &.active { border-color: #fff; box-shadow: 0 0 0 2px var(--accent); }
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
        &:hover { background: var(--border); color: var(--text); }
    }

    .submit {
        background: var(--gradient);
        color: #fff;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        &:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4); }
    }
`;

export default GoalModal;
