import React from 'react';

interface GroupSortControlProps {
  sortOrder: 'frequency' | 'alphabetical';
  onSortChange: (order: 'frequency' | 'alphabetical') => void;
}

const GroupSortControl: React.FC<GroupSortControlProps> = ({ sortOrder, onSortChange }) => {
  const baseButtonClass = "px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-emerald-500 transition-colors";
  const activeButtonClass = "bg-emerald-600 text-white shadow z-10";
  const inactiveButtonClass = "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700";

  return (
    <div className="flex justify-center mb-6">
      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 self-center mr-4">Sort words by:</span>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          onClick={() => onSortChange('frequency')}
          className={`${baseButtonClass} rounded-l-lg ${sortOrder === 'frequency' ? activeButtonClass : inactiveButtonClass}`}
          aria-pressed={sortOrder === 'frequency'}
        >
          Frequency
        </button>
        <button
          type="button"
          onClick={() => onSortChange('alphabetical')}
          className={`${baseButtonClass} rounded-r-lg -ml-px ${sortOrder === 'alphabetical' ? activeButtonClass : inactiveButtonClass}`}
          aria-pressed={sortOrder === 'alphabetical'}
        >
          Alphabetical
        </button>
      </div>
    </div>
  );
};

export default GroupSortControl;