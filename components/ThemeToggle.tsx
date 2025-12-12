'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'darkest';

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && ['light', 'dark', 'darkest'].includes(savedTheme)) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Ensure clean state on first load
      document.documentElement.classList.remove('dark', 'darkest');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    document.documentElement.classList.remove('dark', 'darkest');
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'darkest') {
      document.documentElement.classList.add('darkest');
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

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
