import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Login() {
  // Pre-filled with demo credentials for portfolio visitors
  const [email, setEmail] = useState('demo@gastos.com');
  const [password, setPassword] = useState('Demo2024!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { currentTheme, setTheme } = useTheme();
  const navigate = useNavigate();

  const themes = [
    { id: 'dark', icon: '🌑', label: 'Oscuro' },
    { id: 'lavender', icon: '💜', label: 'Lavanda' },
    { id: 'sunset', icon: '🌅', label: 'Atardecer' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      {/* Theme Selector */}
      <div className="theme-selector">
        {themes.map(t => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={currentTheme === t.id ? 'active' : ''}
            title={t.label}
          >
            {t.icon}
          </button>
        ))}
      </div>

      <div className="login-box">
        <div className="brand-name">Gestión Financiera</div>
        <h1>Iniciar Sesión</h1>

        {error && (
          <div className="error-box">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
        </form>
        <p className="signup-text">
          ¿No tienes cuenta? <Link to="/register" className="a2">¡Regístrate!</Link>
        </p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  position: relative;
  transition: background 0.3s ease;

  .theme-selector {
    position: absolute;
    top: 24px;
    right: 24px;
    display: flex;
    gap: 8px;
    background: var(--cardBg);
    padding: 6px;
    border-radius: 12px;
    border: 1px solid var(--border);
    
    button {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 10px;
      background: transparent;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background: var(--bgTertiary);
        transform: scale(1.05);
      }
      
      &.active {
        background: var(--accent);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .login-box {
    width: 400px;
    padding: 40px;
    background: var(--cardBg);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    border-radius: 20px;
    border: 1px solid var(--border);
    transition: all 0.3s ease;
  }

  .brand-name {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 8px;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h1 {
    margin: 0 0 32px;
    color: var(--text);
    text-align: center;
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .error-box {
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #ef4444;
    padding: 12px 16px;
    border-radius: 12px;
    margin-bottom: 24px;
    font-size: 14px;
  }

  .input-group {
    margin-bottom: 24px;
    
    label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--textMuted);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    input {
      width: 100%;
      padding: 14px 16px;
      font-size: 16px;
      color: var(--text);
      background: var(--bgSecondary);
      border: 1px solid var(--border);
      border-radius: 12px;
      outline: none;
      transition: all 0.2s;
      
      &::placeholder {
        color: var(--textMuted);
        opacity: 0.6;
      }
      
      &:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(var(--accentRgb, 139, 92, 246), 0.15);
      }
    }
  }

  .submit-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 28px;
    font-weight: 700;
    color: #fff;
    font-size: 14px;
    text-transform: uppercase;
    overflow: hidden;
    transition: all 0.3s;
    margin-top: 8px;
    letter-spacing: 2px;
    background: var(--accent);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    width: 100%;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(var(--accentRgb, 139, 92, 246), 0.35);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .submit-btn span {
    position: absolute;
    display: block;
  }

  .submit-btn span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accentLight, #a78bfa));
    animation: btn-anim1 1.5s linear infinite;
  }

  @keyframes btn-anim1 {
    0% { left: -100%; }
    50%, 100% { left: 100%; }
  }

  .submit-btn span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, var(--accentLight, #a78bfa));
    animation: btn-anim2 1.5s linear infinite;
    animation-delay: 0.375s;
  }

  @keyframes btn-anim2 {
    0% { top: -100%; }
    50%, 100% { top: 100%; }
  }

  .submit-btn span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, var(--accentLight, #a78bfa));
    animation: btn-anim3 1.5s linear infinite;
    animation-delay: 0.75s;
  }

  @keyframes btn-anim3 {
    0% { right: -100%; }
    50%, 100% { right: 100%; }
  }

  .submit-btn span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, var(--accentLight, #a78bfa));
    animation: btn-anim4 1.5s linear infinite;
    animation-delay: 1.125s;
  }

  @keyframes btn-anim4 {
    0% { bottom: -100%; }
    50%, 100% { bottom: 100%; }
  }

  .signup-text {
    color: var(--textMuted);
    font-size: 14px;
    text-align: center;
    margin-top: 28px;
  }

  .login-box a.a2 {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    transition: 0.3s;
  }

  .login-box a.a2:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .login-box {
      width: 90%;
      padding: 30px 24px;
    }
    
    .theme-selector {
      top: 16px;
      right: 16px;
    }
  }
`;

export default Login;
