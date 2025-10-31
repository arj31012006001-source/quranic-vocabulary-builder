import React from 'react';

// FIX: Added 'quiz' to the view mode types
interface ViewModeToggleProps {
  viewMode: 'card' | 'list' | 'grouped' | 'thematic' | 'quiz';
  onViewModeChange: (mode: 'card' | 'list' | 'grouped' | 'thematic' | 'quiz') => void;
  reviewCount: number;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, onViewModeChange, reviewCount }) => {
  const baseButtonClass = "px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-emerald-500 transition-colors flex items-center justify-center";
  const activeButtonClass = "bg-emerald-600 text-white shadow z-10";
  const inactiveButtonClass = "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700";

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          onClick={() => onViewModeChange('card')}
          className={`${baseButtonClass} rounded-l-lg ${viewMode === 'card' ? activeButtonClass : inactiveButtonClass}`}
          aria-pressed={viewMode === 'card'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z" />
          </svg>
          Card View
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('list')}
          className={`${baseButtonClass} -ml-px ${viewMode === 'list' ? activeButtonClass : inactiveButtonClass}`}
          aria-pressed={viewMode === 'list'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          List View
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('grouped')}
          className={`${baseButtonClass} -ml-px ${viewMode === 'grouped' ? activeButtonClass : inactiveButtonClass}`}
          aria-pressed={viewMode === 'grouped'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2" />
          </svg>
          Grouped View
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('thematic')}
          className={`${baseButtonClass} -ml-px ${viewMode === 'thematic' ? activeButtonClass : inactiveButtonClass}`}
          aria-pressed={viewMode === 'thematic'}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v1H5V4zM5 7h10v9a2 2 0 01-2 2H7a2 2 0 01-2-2V7z" />
            </svg>
          Thematic Group
        </button>
        {/* FIX: Added Quiz Mode button */}
        <button
          type="button"
          onClick={() => onViewModeChange('quiz')}
          className={`${baseButtonClass} rounded-r-lg -ml-px ${viewMode === 'quiz' ? activeButtonClass : inactiveButtonClass}`}
          aria-pressed={viewMode === 'quiz'}
        >
            <span className="relative flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Quiz Mode
              {reviewCount > 0 && (
                <span className="absolute -top-2 -right-4 flex h-5 w-5">
                  <span className="relative inline-flex items-center justify-center w-full h-full rounded-full bg-red-500 text-xs font-medium text-white">
                    {reviewCount}
                  </span>
                </span>
              )}
            </span>
        </button>
      </div>
    </div>
  );
};

export default ViewModeToggle;