'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'darkest';

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved && ['light', 'dark', 'darkest'].includes(saved)) {
      return saved;
    }
    return 'light';
  });
  const [mounted, setMounted] = useState(false);

  const applyTheme = (newTheme: Theme) => {
    document.documentElement.classList.remove('dark', 'darkest');
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'darkest') {
      document.documentElement.classList.add('darkest');
    }
  };

  // Sets the theme state, persists selection, and applies it immediately.
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      // ignore localStorage errors in strict environments
    }
    applyTheme(newTheme);
  };

  useEffect(() => {
    // Apply the current theme on mount and whenever it changes
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    // We intentionally set mounted in an effect to avoid hydration mismatches when
    // the saved theme differs between server-render and client. This is a local
    // exception: setting state here is safe and avoids visual flicker.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white dark:bg-[#2f3136] darkest:bg-black border-2 border-black/10 dark:border-[#202225] darkest:border-white/10 rounded-lg shadow-lg p-2 flex gap-2">
        <button
          onClick={() => setTheme('light')}
          className={`px-4 py-2 rounded transition-colors font-medium ${
            theme === 'light'
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'hover:bg-gray-100 dark:hover:bg-[#40444b] darkest:hover:bg-gray-900 text-black/50 dark:text-[#b9bbbe] darkest:text-white/50'
          }`}
          title="Light Mode"
          aria-label="Light Mode"
        >
          Light
        </button>
        
        <button
          onClick={() => setTheme('dark')}
          className={`px-4 py-2 rounded transition-colors font-medium ${
            theme === 'dark'
              ? 'bg-white text-black'
              : 'hover:bg-gray-100 dark:hover:bg-[#40444b] darkest:hover:bg-gray-900 text-black/50 dark:text-[#b9bbbe] darkest:text-white/50'
          }`}
          title="Dark Mode"
          aria-label="Dark Mode"
        >
          Dark
        </button>
        
        <button
          onClick={() => setTheme('darkest')}
          className={`px-4 py-2 rounded transition-colors font-medium ${
            theme === 'darkest'
              ? 'bg-white text-black'
              : 'hover:bg-gray-100 dark:hover:bg-[#40444b] darkest:hover:bg-gray-900 text-black/50 dark:text-[#b9bbbe] darkest:text-white/50'
          }`}
          title="Darkest Mode"
          aria-label="Darkest Mode"
        >
          Darkest
        </button>
      </div>
    </div>
  );
}
