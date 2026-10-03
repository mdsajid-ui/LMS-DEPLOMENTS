import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  macos: {
    id: 'macos',
    label: 'DV macOS Sonoma',
    shortLabel: 'macOS',
    tag: 'Classic',
    icon: '🍎',
    previewBadge: 'Navy & Orange',
    dotColor: '#ea580c',
    dotSecondary: '#0f2347',
    description: 'Apple macOS Frosted Glass with DV Deep Navy & Flame Orange'
  },
  award: {
    id: 'award',
    label: '2026 Award Winner',
    shortLabel: 'Award 2026',
    tag: 'Awwwards Winner',
    icon: '🏆',
    previewBadge: 'Obsidian & Gold',
    dotColor: '#f5b544',
    dotSecondary: '#121316',
    description: 'Web Design Awards 2026 Winner: Editorial Obsidian & Champagne Gold'
  },
  white: {
    id: 'white',
    label: 'Pure Studio White',
    shortLabel: 'Studio White',
    tag: 'Minimalist Light',
    icon: '⚪',
    previewBadge: 'Clean White',
    dotColor: '#ffffff',
    dotSecondary: '#e2e8f0',
    description: 'Apple Cupertino Clean Light: High-contrast minimalist studio'
  },
  black: {
    id: 'black',
    label: 'Pitch Black OLED',
    shortLabel: 'OLED Black',
    tag: 'Cyber Dark',
    icon: '⚫',
    previewBadge: 'True OLED Black',
    dotColor: '#000000',
    dotSecondary: '#1f1f1f',
    description: 'Pitch Black OLED: True zero-luminance high-contrast stealth'
  }
};

const ThemeContext = createContext({
  theme: 'macos',
  setTheme: () => {},
  THEMES: THEMES,
  activeThemeMeta: THEMES.macos
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'macos';
    const saved = localStorage.getItem('dva_app_theme');
    if (saved && THEMES[saved]) return saved;
    return 'macos';
  });

  const setTheme = (newTheme) => {
    if (!THEMES[newTheme]) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem('dva_app_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      document.body.setAttribute('data-theme', newTheme);
      window.dispatchEvent(new CustomEvent('dva-theme-change', { detail: { theme: newTheme } }));
    } catch (e) {
      console.error("Theme storage error:", e);
    }
  };

  useEffect(() => {
    // Set initial attribute on HTML & Body
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);

    // Cross-tab and external event listener
    const handleStorage = (e) => {
      if (e.key === 'dva_app_theme' && e.newValue && THEMES[e.newValue]) {
        setThemeState(e.newValue);
        document.documentElement.setAttribute('data-theme', e.newValue);
        document.body.setAttribute('data-theme', e.newValue);
      }
    };
    const handleCustom = (e) => {
      if (e.detail?.theme && THEMES[e.detail.theme]) {
        setThemeState(e.detail.theme);
        document.documentElement.setAttribute('data-theme', e.detail.theme);
        document.body.setAttribute('data-theme', e.detail.theme);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('dva-theme-change', handleCustom);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('dva-theme-change', handleCustom);
    };
  }, [theme]);

  const activeThemeMeta = THEMES[theme] || THEMES.macos;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, THEMES, activeThemeMeta }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
