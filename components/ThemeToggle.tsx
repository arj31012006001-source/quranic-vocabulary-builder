import React from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const baseButtonClass = "p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-emerald-500 transition-colors text-slate-500 dark:text-slate-400";
  const activeButtonClass = "bg-slate-200 dark:bg-slate-700 text-emerald-600 dark:text-emerald-400";
  const inactiveButtonClass = "hover:bg-slate-100 dark:hover:bg-slate-700/50";

  return (
    <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-lg">
      <button
        onClick={() => setTheme('light')}
        className={`${baseButtonClass} ${theme === 'light' ? activeButtonClass : inactiveButtonClass}`}
        aria-pressed={theme === 'light'}
        title="Light Mode"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.706-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.464A1 1 0 106.465 13.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm-1.414-2.12a1 1 0 01-1.414 0l-.707-.707a1 1 0 111.414-1.414l.707.707a1 1 0 010 1.414zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" />
        </svg>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`${baseButtonClass} ${theme === 'dark' ? activeButtonClass : inactiveButtonClass}`}
        aria-pressed={theme === 'dark'}
        title="Dark Mode"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`${baseButtonClass} ${theme === 'system' ? activeButtonClass : inactiveButtonClass}`}
        aria-pressed={theme === 'system'}
        title="System Preference"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
};

export default ThemeToggle;