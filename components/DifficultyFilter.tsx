import React from 'react';

type DifficultyLevel = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

interface DifficultyFilterProps {
  activeDifficulty: DifficultyLevel;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
}

const DifficultyFilter: React.FC<DifficultyFilterProps> = ({ activeDifficulty, onDifficultyChange }) => {
  const levels: DifficultyLevel[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const levelLabels = {
    'All': 'All Levels',
    'Beginner': 'Beginner',
    'Intermediate': 'Intermediate',
    'Advanced': 'Advanced',
  };

  const baseButtonClass = "px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900";
  const activeButtonClass = "bg-emerald-600 text-white shadow";
  const inactiveButtonClass = "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700";
  const ringClass = "focus:ring-emerald-500";

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {levels.map(level => (
          <button
            key={level}
            onClick={() => onDifficultyChange(level)}
            className={`${baseButtonClass} ${activeDifficulty === level ? activeButtonClass : inactiveButtonClass} ${ringClass}`}
            aria-pressed={activeDifficulty === level}
          >
            {levelLabels[level]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultyFilter;