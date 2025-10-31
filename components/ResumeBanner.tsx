import React from 'react';

interface ResumeBannerProps {
  page: number;
  onResume: () => void;
  onDismiss: () => void;
}

const ResumeBanner: React.FC<ResumeBannerProps> = ({ page, onResume, onDismiss }) => {
  return (
    <div className="bg-emerald-500 text-white p-3 rounded-lg shadow-lg flex items-center justify-between gap-4 mb-6 animate-fade-in-down">
      <p className="font-semibold text-sm md:text-base">Welcome back! Would you like to resume where you left off?</p>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onResume}
          className="bg-white text-emerald-600 font-bold py-1 px-4 rounded-md hover:bg-emerald-100 transition-colors text-sm"
        >
          Resume Page {page}
        </button>
        <button
          onClick={onDismiss}
          className="p-1 rounded-full hover:bg-emerald-600 transition-colors"
          aria-label="Dismiss"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ResumeBanner;
