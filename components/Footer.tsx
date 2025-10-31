
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 py-4 mt-8 shadow-inner">
      <div className="container mx-auto px-4 text-center text-slate-500 dark:text-slate-400">
        <p>Built for a better understanding of the Quran.</p>
        <p>&copy; {new Date().getFullYear()} Quranic Vocabulary Builder. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;