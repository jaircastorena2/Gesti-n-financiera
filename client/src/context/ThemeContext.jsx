import { createContext, useContext, useState, useEffect } from 'react';

// Theme definitions
export const themes = {
    dark: {
        name: 'Oscuro',
        icon: '🌙',
        colors: {
            bg: '#0a0e17',
            bgSecondary: '#12172a',
            bgTertiary: '#1a2035',
            sidebar: 'linear-gradient(180deg, #0f1423 0%, #0a0e17 100%)',
            text: '#ffffff',
            textSecondary: '#94a3b8',
            textMuted: '#64748b',
            border: 'rgba(255,255,255,0.05)',
            accent: '#06b6d4',
            accentSecondary: '#8b5cf6',
            gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            cardBg: '#12172a',
            success: '#10b981',
            danger: '#ef4444',
            warning: '#f59e0b',
        }
    },
    lavender: {
        name: 'Lavanda',
        icon: '💜',
        colors: {
            bg: '#F5EBFA',
            bgSecondary: '#ffffff',
            bgTertiary: '#E7DBEF',
            sidebar: 'linear-gradient(180deg, #6E3482 0%, #49225B 100%)',
            text: '#2d1f3d',
            textSecondary: '#6E3482',
            textMuted: '#A56ABD',
            border: 'rgba(110, 52, 130, 0.15)',
            accent: '#8b5cf6',
            accentSecondary: '#ec4899',
            gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            cardBg: '#ffffff',
            success: '#10b981',
            danger: '#ef4444',
            warning: '#f59e0b',
        }
    },
    sunset: {
        name: 'Atardecer',
        icon: '🌅',
        colors: {
            bg: '#1a1527',
            bgSecondary: '#242F49',
            bgTertiary: '#384358',
            sidebar: 'linear-gradient(180deg, #384358 0%, #242F49 100%)',
            text: '#ffffff',
            textSecondary: '#FFA586',
            textMuted: '#8b8a9a',
            border: 'rgba(255,165,134,0.15)',
            accent: '#FFA586',
            accentSecondary: '#B51A2B',
            gradient: 'linear-gradient(135deg, #B51A2B, #FFA586)',
            cardBg: '#242F49',
            success: '#FFA586',
            danger: '#B51A2B',
            warning: '#FFA586',
        }
    }
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const saved = localStorage.getItem('expense-theme');
        return saved && themes[saved] ? saved : 'dark';
    });

    const theme = themes[currentTheme];

    useEffect(() => {
        localStorage.setItem('expense-theme', currentTheme);

        // Apply CSS variables to root
        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }, [currentTheme, theme]);

    const setTheme = (themeName) => {
        if (themes[themeName]) {
            setCurrentTheme(themeName);
        }
    };

    const cycleTheme = () => {
        const themeNames = Object.keys(themes);
        const currentIndex = themeNames.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themeNames.length;
        setCurrentTheme(themeNames[nextIndex]);
    };

    const isDark = currentTheme === 'dark' || currentTheme === 'sunset';

    return (
        <ThemeContext.Provider value={{
            theme,
            currentTheme,
            themes,
            setTheme,
            cycleTheme,
            isDark
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
