import React from 'react';

interface SrsReviewBannerProps {
  reviewCount: number;
  onStartReview: () => void;
  onDismiss: () => void;
}

const SrsReviewBanner: React.FC<SrsReviewBannerProps> = ({ reviewCount, onStartReview, onDismiss }) => {
  return (
    <div className="bg-sky-500 text-white p-3 rounded-lg shadow-lg flex items-center justify-between gap-4 mb-6 animate-fade-in-down">
      <p className="font-semibold text-sm md:text-base">
        You have <span className="font-bold text-lg">{reviewCount}</span> {reviewCount === 1 ? 'word' : 'words'} due for review! Spaced repetition helps you remember better.
      </p>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onStartReview}
          className="bg-white text-sky-600 font-bold py-1 px-4 rounded-md hover:bg-sky-100 transition-colors text-sm"
        >
          Start Review
        </button>
        <button
          onClick={onDismiss}
          className="p-1 rounded-full hover:bg-sky-600 transition-colors"
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

export default SrsReviewBanner;
