import React from 'react';
import { Theme } from '../types';

interface ThematicFiltersProps {
  themes: Theme[];
  activeTheme: string | null;
  onSelectTheme: (themeName: string | null) => void;
}

const ThematicFilters: React.FC<ThematicFiltersProps> = ({ themes, activeTheme, onSelectTheme }) => {
  const baseButtonClass = "px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900";
  const activeButtonClass = "bg-emerald-600 text-white shadow";
  const inactiveButtonClass = "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700";
  const ringClass = "focus:ring-emerald-500";

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        <button
          onClick={() => onSelectTheme(null)}
          className={`${baseButtonClass} ${!activeTheme ? activeButtonClass : inactiveButtonClass} ${ringClass}`}
          aria-pressed={!activeTheme}
        >
          All Words
        </button>
        {themes.map(theme => (
          <button
            key={theme.name}
            onClick={() => onSelectTheme(theme.name)}
            className={`${baseButtonClass} ${activeTheme === theme.name ? activeButtonClass : inactiveButtonClass} ${ringClass}`}
            aria-pressed={activeTheme === theme.name}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThematicFilters;