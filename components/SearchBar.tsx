import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchType: 'text' | 'root';
  onSearchTypeChange: (type: 'text' | 'root') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange, searchType, onSearchTypeChange }) => {
  const baseButtonClass = "px-2 py-1 text-xs font-semibold rounded-md transition-colors focus:outline-none";
  const activeButtonClass = "bg-emerald-600 text-white";
  const inactiveButtonClass = "bg-transparent text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600";
  
  const placeholderText = searchType === 'root'
    ? "Enter a 3-letter root (e.g., ق-و-ل)"
    : "Search by Arabic, transliteration, or meaning...";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          id="search"
          name="search"
          className="block w-full rounded-md border-0 bg-white dark:bg-slate-800 py-3 pl-10 pr-32 text-slate-900 dark:text-slate-200 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
          placeholder={placeholderText}
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1" role="group" aria-label="Search type">
          <button
            onClick={() => onSearchTypeChange('text')}
            className={`${baseButtonClass} ${searchType === 'text' ? activeButtonClass : inactiveButtonClass}`}
            aria-pressed={searchType === 'text'}
          >
            Text
          </button>
          <button
            onClick={() => onSearchTypeChange('root')}
            className={`${baseButtonClass} ${searchType === 'root' ? activeButtonClass : inactiveButtonClass}`}
            aria-pressed={searchType === 'root'}
          >
            Root
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;