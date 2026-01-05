import { createContext, useContext, useState, useEffect } from 'react';

export const currencies = {
    MXN: { code: 'MXN', symbol: '$', name: 'Peso Mexicano', locale: 'es-MX' },
    USD: { code: 'USD', symbol: '$', name: 'Dólar Estadounidense', locale: 'en-US' },
    EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
    GBP: { code: 'GBP', symbol: '£', name: 'Libra Esterlina', locale: 'en-GB' },
    JPY: { code: 'JPY', symbol: '¥', name: 'Yen Japonés', locale: 'ja-JP' },
    CNY: { code: 'CNY', symbol: '¥', name: 'Yuan Chino', locale: 'zh-CN' },
    BRL: { code: 'BRL', symbol: 'R$', name: 'Real Brasileño', locale: 'pt-BR' },
    ARS: { code: 'ARS', symbol: '$', name: 'Peso Argentino', locale: 'es-AR' },
    COP: { code: 'COP', symbol: '$', name: 'Peso Colombiano', locale: 'es-CO' },
    CLP: { code: 'CLP', symbol: '$', name: 'Peso Chileno', locale: 'es-CL' },
    PEN: { code: 'PEN', symbol: 'S/', name: 'Sol Peruano', locale: 'es-PE' },
    CAD: { code: 'CAD', symbol: 'C$', name: 'Dólar Canadiense', locale: 'en-CA' },
    AUD: { code: 'AUD', symbol: 'A$', name: 'Dólar Australiano', locale: 'en-AU' },
    CHF: { code: 'CHF', symbol: 'Fr', name: 'Franco Suizo', locale: 'de-CH' },
    INR: { code: 'INR', symbol: '₹', name: 'Rupia India', locale: 'en-IN' },
    KRW: { code: 'KRW', symbol: '₩', name: 'Won Surcoreano', locale: 'ko-KR' },
};

export const dateFormats = {
    'DD/MM/YYYY': { format: 'DD/MM/YYYY', example: '31/12/2024' },
    'MM/DD/YYYY': { format: 'MM/DD/YYYY', example: '12/31/2024' },
    'YYYY-MM-DD': { format: 'YYYY-MM-DD', example: '2024-12-31' },
};

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        const saved = localStorage.getItem('expense-currency');
        return saved && currencies[saved] ? saved : 'MXN';
    });

    const [dateFormat, setDateFormat] = useState(() => {
        const saved = localStorage.getItem('expense-dateformat');
        return saved && dateFormats[saved] ? saved : 'DD/MM/YYYY';
    });

    useEffect(() => {
        localStorage.setItem('expense-currency', currency);
    }, [currency]);

    useEffect(() => {
        localStorage.setItem('expense-dateformat', dateFormat);
    }, [dateFormat]);

    const currentCurrency = currencies[currency];

    // Format money with selected currency
    const formatMoney = (amount) => {
        return new Intl.NumberFormat(currentCurrency.locale, {
            style: 'currency',
            currency: currentCurrency.code,
            minimumFractionDigits: currentCurrency.code === 'JPY' || currentCurrency.code === 'KRW' ? 0 : 2,
            maximumFractionDigits: currentCurrency.code === 'JPY' || currentCurrency.code === 'KRW' ? 0 : 2,
        }).format(amount);
    };

    // Format date with selected format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        switch (dateFormat) {
            case 'MM/DD/YYYY':
                return `${month}/${day}/${year}`;
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            default:
                return `${day}/${month}/${year}`;
        }
    };

    return (
        <SettingsContext.Provider value={{
            currency,
            setCurrency,
            currencies,
            currentCurrency,
            formatMoney,
            dateFormat,
            setDateFormat,
            dateFormats,
            formatDate
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within SettingsProvider');
    }
    return context;
};
