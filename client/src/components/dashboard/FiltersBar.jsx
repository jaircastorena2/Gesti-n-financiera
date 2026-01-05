import styled from 'styled-components';

function FiltersBar({ dateFilter, setDateFilter, searchQuery, setSearchQuery }) {
    const dateFilters = [
        { key: 'week', label: 'Semana' },
        { key: 'month', label: 'Mes' },
        { key: '3months', label: '3 meses' },
        { key: 'all', label: 'Todo' }
    ];

    return (
        <FiltersRow>
            <div className="search-box">
                <svg viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
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
        </FiltersRow>
    );
}

const FiltersRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 16px;
    width: 100%;
    max-width: 100%;

    .search-box {
        position: relative;
        width: 100%;

        svg {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            fill: var(--textMuted);
        }

        input {
            width: 100%;
            padding: 10px 12px 10px 38px;
            border-radius: 10px;
            border: 1px solid var(--border);
            background: var(--cardBg);
            color: var(--text);
            font-size: 13px;
            transition: all 0.2s;

            &::placeholder { color: var(--textMuted); }
            &:focus {
                outline: none;
                border-color: var(--accent);
            }
        }
    }

    .date-filters {
        display: flex;
        gap: 6px;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        &::-webkit-scrollbar { display: none; }
    }

    .filter-btn {
        padding: 6px 12px;
        border-radius: 8px;
        border: 1px solid var(--border);
        background: var(--cardBg);
        color: var(--textMuted);
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
        flex-shrink: 0;

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

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
        .search-box {
            max-width: 300px;
            order: 2;
        }
        
        .date-filters {
            width: auto;
            order: 1;
        }
        
        .filter-btn {
            padding: 8px 16px;
            font-size: 13px;
        }
    }
`;

export default FiltersBar;
