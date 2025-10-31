import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    // Always show first page
    if (totalPages > 1) pageNumbers.push(1);

    // Show ellipsis if current page is far from the start
    if (currentPage > 3) pageNumbers.push('...');

    // Show pages around the current page
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }

    // Show ellipsis if current page is far from the end
    if (currentPage < totalPages - 2) pageNumbers.push('...');
    
    // Always show last page
    if (totalPages > 1) pageNumbers.push(totalPages);

    return [...new Set(pageNumbers)]; // Remove duplicates
  };

  const pageNumbers = getPageNumbers();

  const baseButtonClass = "flex items-center justify-center px-4 h-10 leading-tight border transition-colors duration-200";
  const activeClass = "bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700";
  const inactiveClass = "bg-white border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white";
  const disabledClass = "opacity-50 cursor-not-allowed";

  return (
    <nav className="flex justify-center mt-12" aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${baseButtonClass} ml-0 rounded-l-lg ${currentPage === 1 ? disabledClass : ''} ${inactiveClass}`}
          >
            Previous
          </button>
        </li>

        {pageNumbers.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => onPageChange(page)}
                className={`${baseButtonClass} ${currentPage === page ? activeClass : inactiveClass}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span className={`${baseButtonClass} ${inactiveClass}`}>
                {page}
              </span>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${baseButtonClass} rounded-r-lg ${currentPage === totalPages ? disabledClass : ''} ${inactiveClass}`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;