import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { expensesAPI, categoriesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

// Dashboard Components
import {
    Sidebar,
    MobileNav,
    StatsCards,
    FiltersBar,
    ChartsSection,
    ReportesSection,
    MetasSection,
    AjustesSection
} from '../components/dashboard';
import ExpenseModal from '../components/ExpenseModal';
import ExpenseList from '../components/ExpenseList';
import GoalModal from '../components/GoalModal';

function Dashboard() {
    const { user } = useAuth();
    const { formatMoney } = useSettings();

    // Data State
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [stats, setStats] = useState({ monthTotal: 0, byCategory: [], byMonth: [] });
    const [loading, setLoading] = useState(true);

    // UI State
    const [activeSection, setActiveSection] = useState('dashboard');
    const [showThemeMenu, setShowThemeMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);

    // Filter State
    const [chartType, setChartType] = useState('pie');
    const [dateFilter, setDateFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Goals State (localStorage)
    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem('expense-goals');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Vacaciones', icon: '🏖️', targetAmount: 20000, currentAmount: 13000, color: '#f59e0b' },
            { id: 2, name: 'Auto nuevo', icon: '🚗', targetAmount: 150000, currentAmount: 45000, color: '#ef4444' },
            { id: 3, name: 'Fondo de emergencia', icon: '🏠', targetAmount: 50000, currentAmount: 40000, color: '#10b981' }
        ];
    });

    // Load Data
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [expensesRes, categoriesRes, statsRes] = await Promise.all([
                expensesAPI.getAll(),
                categoriesAPI.getAll(),
                expensesAPI.getStats()
            ]);
            setExpenses(expensesRes.data);
            setCategories(categoriesRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Expense Handlers
    const handleAddExpense = () => {
        setEditingExpense(null);
        setShowModal(true);
    };

    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
        setShowModal(true);
    };

    const handleDeleteExpense = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este gasto?')) return;
        try {
            await expensesAPI.delete(id);
            loadData();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const handleSaveExpense = async (data) => {
        try {
            if (editingExpense) {
                await expensesAPI.update(editingExpense.id, data);
            } else {
                await expensesAPI.create(data);
            }
            setShowModal(false);
            loadData();
        } catch (error) {
            console.error('Error saving expense:', error);
        }
    };

    // Goal Handlers
    const handleAddGoal = () => {
        setEditingGoal(null);
        setShowGoalModal(true);
    };

    const handleEditGoal = (goal) => {
        setEditingGoal(goal);
        setShowGoalModal(true);
    };

    const handleDeleteGoal = (id) => {
        if (!confirm('¿Estás seguro de eliminar esta meta?')) return;
        const newGoals = goals.filter(g => g.id !== id);
        setGoals(newGoals);
        localStorage.setItem('expense-goals', JSON.stringify(newGoals));
    };

    const handleSaveGoal = (goalData) => {
        let newGoals;
        if (editingGoal) {
            newGoals = goals.map(g => g.id === editingGoal.id ? goalData : g);
        } else {
            newGoals = [...goals, goalData];
        }
        setGoals(newGoals);
        localStorage.setItem('expense-goals', JSON.stringify(newGoals));
        setShowGoalModal(false);
    };

    // Computed Values
    const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    const thisMonthExpenses = stats.monthTotal || 0;
    const avgPerTransaction = expenses.length > 0 ? totalExpenses / expenses.length : 0;

    const topCategories = [...(stats.byCategory || [])]
        .filter(c => c.total > 0)
        .sort((a, b) => b.total - a.total);

    // Filter Expenses
    const getFilteredExpenses = () => {
        let filtered = [...expenses];
        const now = new Date();

        switch (dateFilter) {
            case 'week': {
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                filtered = filtered.filter(e => new Date(e.expense_date) >= weekAgo);
                break;
            }
            case 'month': {
                const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                filtered = filtered.filter(e => new Date(e.expense_date) >= monthStart);
                break;
            }
            case '3months': {
                const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
                filtered = filtered.filter(e => new Date(e.expense_date) >= threeMonthsAgo);
                break;
            }
            default:
                break;
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(e =>
                e.description?.toLowerCase().includes(query) ||
                e.category_name?.toLowerCase().includes(query)
            );
        }

        return filtered;
    };

    const filteredExpenses = getFilteredExpenses();

    // Loading State
    if (loading) {
        return (
            <LoadingWrapper>
                <div className="loader">
                    <div className="spinner"></div>
                    <p>Cargando...</p>
                </div>
            </LoadingWrapper>
        );
    }

    return (
        <DashboardWrapper>
            {/* Sidebar */}
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                showThemeMenu={showThemeMenu}
                setShowThemeMenu={setShowThemeMenu}
            />

            {/* Main Content */}
            <Main>
                {/* Dashboard Section */}
                {activeSection === 'dashboard' && (
                    <>
                        <Header>
                            <div className="greeting">
                                <h1>Dashboard</h1>
                                <p>Bienvenido de vuelta, <span>{user?.name?.split(' ')[0]}</span> 👋</p>
                            </div>
                            <div className="header-actions">
                                <button className="add-btn" onClick={handleAddExpense}>
                                    <span>+</span> Nuevo Gasto
                                </button>
                                <div className="user-avatar">{user?.name?.charAt(0)}</div>
                            </div>
                        </Header>

                        <StatsCards
                            thisMonthExpenses={thisMonthExpenses}
                            totalExpenses={totalExpenses}
                            expensesCount={expenses.length}
                            avgPerTransaction={avgPerTransaction}
                        />

                        <FiltersBar
                            dateFilter={dateFilter}
                            setDateFilter={setDateFilter}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />

                        <ChartsSection
                            stats={stats}
                            totalExpenses={totalExpenses}
                            chartType={chartType}
                            setChartType={setChartType}
                        />

                        <Section>
                            <div className="section-header">
                                <h3>
                                    Transacciones
                                    {filteredExpenses.length !== expenses.length &&
                                        ` (${filteredExpenses.length} de ${expenses.length})`
                                    }
                                </h3>
                                <span className="view-all" onClick={() => setActiveSection('reportes')}>
                                    Ver todas →
                                </span>
                            </div>
                            <ExpenseList
                                expenses={filteredExpenses.slice(0, 8)}
                                onEdit={handleEditExpense}
                                onDelete={handleDeleteExpense}
                            />
                        </Section>
                    </>
                )}

                {/* Reportes Section */}
                {activeSection === 'reportes' && (
                    <>
                        <Header>
                            <div className="greeting">
                                <h1>Reportes</h1>
                                <p>Análisis detallado de tus gastos</p>
                            </div>
                        </Header>
                        <ReportesSection
                            expenses={expenses}
                            stats={stats}
                            totalExpenses={totalExpenses}
                            topCategories={topCategories}
                            onEdit={handleEditExpense}
                            onDelete={handleDeleteExpense}
                        />
                    </>
                )}

                {/* Metas Section */}
                {activeSection === 'metas' && (
                    <>
                        <Header>
                            <div className="greeting">
                                <h1>Metas de Ahorro</h1>
                                <p>Establece y sigue tus objetivos financieros</p>
                            </div>
                        </Header>
                        <MetasSection
                            goals={goals}
                            onAddGoal={handleAddGoal}
                            onEditGoal={handleEditGoal}
                            onDeleteGoal={handleDeleteGoal}
                        />
                    </>
                )}

                {/* Ajustes Section */}
                {activeSection === 'ajustes' && (
                    <>
                        <Header>
                            <div className="greeting">
                                <h1>Ajustes</h1>
                                <p>Personaliza tu experiencia</p>
                            </div>
                        </Header>
                        <AjustesSection />
                    </>
                )}
            </Main>

            {/* Modals */}
            {showModal && (
                <ExpenseModal
                    expense={editingExpense}
                    categories={categories}
                    onSave={handleSaveExpense}
                    onClose={() => setShowModal(false)}
                />
            )}

            {showGoalModal && (
                <GoalModal
                    goal={editingGoal}
                    onSave={handleSaveGoal}
                    onClose={() => setShowGoalModal(false)}
                />
            )}

            {/* Mobile Navigation */}
            <MobileNav
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />
        </DashboardWrapper>
    );
}

// Styled Components
const LoadingWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);

    .loader { text-align: center; }
    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--border);
        border-top-color: var(--accent);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
    }
    p { color: var(--textMuted); }
    @keyframes spin { to { transform: rotate(360deg); } }
`;

const DashboardWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    background: var(--bg);
    transition: background 0.3s ease;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
`;

const Main = styled.main`
    flex: 1;
    margin-left: 240px;
    padding: 32px 40px;
    transition: all 0.3s ease;
    
    @media (max-width: 1024px) { 
        margin-left: 0; 
        padding: 12px; 
        padding-bottom: 90px;
        width: 100%;
        max-width: 100vw;
        overflow-x: hidden;
    }
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 16px;

    .greeting {
        h1 { font-size: 32px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        p { color: var(--textMuted); font-size: 15px; span { color: var(--accent); font-weight: 600; } }
    }

    .header-actions { display: flex; align-items: center; gap: 12px; }

    .add-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        background: var(--gradient);
        border: none;
        border-radius: 14px;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        white-space: nowrap;
        span { font-size: 18px; font-weight: 300; }
        &:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4); }
    }

    .user-avatar {
        width: 44px;
        height: 44px;
        background: var(--gradient);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        flex-shrink: 0;
    }

    @media (max-width: 600px) {
        margin-bottom: 20px;
        
        .greeting {
            h1 { font-size: 24px; }
            p { font-size: 13px; }
        }
        
        .add-btn {
            padding: 10px 14px;
            font-size: 12px;
            border-radius: 10px;
            span { font-size: 16px; }
        }
        
        .user-avatar {
            width: 40px;
            height: 40px;
            font-size: 14px;
            border-radius: 10px;
        }
    }
`;

const Section = styled.section`
    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        h3 { font-size: 18px; font-weight: 600; color: var(--text); }

        .view-all {
            font-size: 13px;
            color: var(--accent);
            cursor: pointer;
            transition: 0.2s;
            &:hover { opacity: 0.8; }
        }
    }
`;

export default Dashboard;
