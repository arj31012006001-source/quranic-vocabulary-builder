import React from 'react';

interface FavoritesToggleProps {
  showOnlyBookmarked: boolean;
  onToggle: () => void;
  hasBookmarks: boolean;
}

const FavoritesToggle: React.FC<FavoritesToggleProps> = ({ showOnlyBookmarked, onToggle, hasBookmarks }) => (
  <button
    onClick={onToggle}
    disabled={!hasBookmarks && !showOnlyBookmarked}
    className={`p-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${showOnlyBookmarked ? 'bg-amber-400 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-amber-100 dark:hover:bg-slate-700'}`}
    aria-label="Show only bookmarked words"
    title={hasBookmarks ? (showOnlyBookmarked ? "Show All Words" : "Show Bookmarked Words") : "Bookmark some words to enable this filter"}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={showOnlyBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  </button>
);

export default FavoritesToggle;