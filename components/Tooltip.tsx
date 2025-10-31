import React from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group flex justify-end">
      {children}
      <div className="absolute bottom-full mb-2 w-max max-w-xs p-3 text-sm text-white bg-slate-800 dark:bg-slate-900 ring-1 ring-slate-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 text-center">
        {content}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-800 dark:border-t-slate-900"></div>
      </div>
    </div>
  );
};

export default Tooltip;