import styled from 'styled-components';

function FiltersBar({ dateFilter, setDateFilter, searchQuery, setSearchQuery }) {
    const dateFilters = [
        { key: 'week', label: 'Esta semana' },
        { key: 'month', label: 'Este mes' },
        { key: '3months', label: 'Últimos 3 meses' },
        { key: 'all', label: 'Todo' }
    ];

    return (
        <FiltersRow>
            <div className="date-filters">
                {dateFilters.map(f => (
                    <button
                        key={f.key}
                        className={`filter-btn ${dateFilter === f.key ? 'active' : ''}`}
                        onClick={() => setDateFilter(f.key)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
            <div className="search-box">
                <svg viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <input
                    type="text"
                    placeholder="Buscar transacciones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </FiltersRow>
    );
}

const FiltersRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 24px;
    flex-wrap: wrap;

    .date-filters {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .filter-btn {
        padding: 10px 18px;
        border-radius: 10px;
        border: 1px solid var(--border);
        background: var(--cardBg);
        color: var(--textMuted);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            border-color: var(--accent);
            color: var(--text);
        }

        &.active {
            background: var(--accent);
            border-color: var(--accent);
            color: #fff;
        }
    }

    .search-box {
        position: relative;
        flex: 1;
        max-width: 300px;
        min-width: 200px;

        svg {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            width: 18px;
            height: 18px;
            fill: var(--textMuted);
        }

        input {
            width: 100%;
            padding: 12px 16px 12px 44px;
            border-radius: 12px;
            border: 1px solid var(--border);
            background: var(--cardBg);
            color: var(--text);
            font-size: 14px;
            transition: all 0.2s;

            &::placeholder { color: var(--textMuted); }
            &:focus {
                outline: none;
                border-color: var(--accent);
                box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
            }
        }
    }

    @media (max-width: 768px) {
        .search-box { max-width: none; order: -1; width: 100%; }
    }
`;

export default FiltersBar;
