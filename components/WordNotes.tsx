import React, { useState, useEffect } from 'react';

interface WordNotesProps {
  note: string;
  onSave: (note: string) => void;
}

const MAX_NOTE_LENGTH = 500;

const WordNotes: React.FC<WordNotesProps> = ({ note, onSave }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editText, setEditText] = useState(note);

  // Sync state with prop if the underlying word changes
  useEffect(() => {
    setEditText(note);
  }, [note]);

  // Auto-save feature
  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const intervalId = setInterval(() => {
      // Auto-save only if there are changes from the last saved state
      if (editText !== note) {
        onSave(editText);
      }
    }, 60000); // Auto-save every 60 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [isExpanded, editText, note, onSave]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_NOTE_LENGTH) {
      setEditText(e.target.value);
    }
  };

  const handleSave = () => {
    onSave(editText);
    setIsExpanded(false);
  };
  
  const handleCancel = () => {
    setEditText(note); // Revert changes
    setIsExpanded(false);
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2 rounded-md bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-expanded={isExpanded}
      >
        <span className="flex items-center text-sm font-semibold text-slate-600 dark:text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
            My Notes
            {note && <span className="ml-2 h-2 w-2 bg-emerald-500 rounded-full" title="Note saved"></span>}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-slate-500 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
          <textarea
            value={editText}
            onChange={handleTextChange}
            placeholder="Add your personal notes, mnemonics, or reflections here..."
            className="w-full h-24 p-2 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            aria-label="Personal note for this word"
            maxLength={MAX_NOTE_LENGTH}
          ></textarea>
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-slate-500 dark:text-slate-400">
                Auto-saves every minute.
            </div>
            <div className={`text-xs font-medium ${editText.length >= MAX_NOTE_LENGTH ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
                {editText.length} / {MAX_NOTE_LENGTH}
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-2">
            <button
                onClick={handleCancel}
                className="px-3 py-1 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-600 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={handleSave}
                className="px-4 py-1 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors"
            >
                Save Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordNotes;
