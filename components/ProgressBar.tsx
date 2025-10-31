import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          Learning Progress (Quranic Coverage)
        </span>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          {clampedProgress.toFixed(2)}%
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 shadow-inner">
        <div
          className="bg-emerald-500 h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-center"
          style={{ width: `${clampedProgress}%` }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Learning Progress: ${clampedProgress.toFixed(2)}%`}
        >
        </div>
      </div>
       <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2">
        This progress is based on the total frequency of the words you've marked as 'Learned'.
      </p>
    </div>
  );
};

export default ProgressBar;