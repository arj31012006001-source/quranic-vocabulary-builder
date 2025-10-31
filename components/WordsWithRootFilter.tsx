import React from 'react';

interface WordsWithRootFilterProps {
  showOnly: boolean;
  onToggle: () => void;
}

const WordsWithRootFilter: React.FC<WordsWithRootFilterProps> = ({ showOnly, onToggle }) => (
  <button
    onClick={onToggle}
    className={`p-3 rounded-md transition-colors ${showOnly ? 'bg-sky-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-sky-100 dark:hover:bg-slate-700'}`}
    aria-label="Show only words with an associated root"
    title={showOnly ? "Show All Words" : "Show Only Words with Roots"}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  </button>
);

export default WordsWithRootFilter;
