import { useState, useEffect } from 'react';
import { THEME_CONFIG, STORAGE_KEYS } from '../constants';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      Object.entries(THEME_CONFIG.dark).forEach(([key, value]) => {
        root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
      });
    } else {
      root.classList.remove('dark');
      Object.entries(THEME_CONFIG.light).forEach(([key, value]) => {
        root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
      });
    }
    localStorage.setItem(STORAGE_KEYS.theme, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => setIsDark(!isDark);

  return { isDark, toggle, theme: isDark ? 'dark' : 'light' as const };
};
