import React from 'react';
import type { VocabularyWord } from '../types';
import { TOTAL_QURAN_WORDS, SUPPORTED_LANGUAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import AudioPlayerButton from './AudioPlayerButton';
import Tooltip from './Tooltip';
import Highlight from './Highlight';
import WordNotes from './WordNotes';
import AdvancedAudioPlayer from './AdvancedAudioPlayer';

interface VocabularyListItemProps {
  word: VocabularyWord;
  isExpanded: boolean;
  onToggle: (id: number) => void;
  isLearned: boolean;
  onToggleLearned: (id: number) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  note: string;
  onUpdateNote: (id: number, note: string) => void;
  onRootSearch: (root: string) => void;
  rootCounts: Record<string, number>;
  onDerivativeSearch: (derivative: string) => void;
}

const getLanguageClass = (langCode: string): string => {
  switch (langCode) {
    case 'bn':
      return 'bengali-text';
    case 'hi':
      return 'hindi-text';
    case 'ur':
      return 'arabic-text';
    default:
      return '';
  }
};

const VocabularyListItem: React.FC<VocabularyListItemProps> = ({ word, isExpanded, onToggle, isLearned, onToggleLearned, isBookmarked, onToggleBookmark, note, onUpdateNote, onRootSearch, rootCounts, onDerivativeSearch }) => {
  const { language } = useLanguage();
  const learningPercentage = (word.frequency / TOTAL_QURAN_WORDS) * 100;
  const selectedLanguageName = SUPPORTED_LANGUAGES.find(lang => lang.code === language)?.name.split(' ')[0];
  const showAdditionalLanguage = language !== 'en' && word.meanings[language];

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(word.id);
  };

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${isLearned ? 'opacity-70' : ''}`}>
      <div
        className="w-full text-left p-4 flex justify-between items-center cursor-pointer focus:outline-none"
        onClick={() => onToggle(word.id)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center space-x-2 sm:space-x-4">
          {isLearned && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          <div className="flex items-center space-x-2">
            <h3 dir="rtl" className="arabic-text text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {word.arabic}
            </h3>
            <AudioPlayerButton text={word.arabic} />
          </div>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-mono tracking-wide" aria-label="Phonetic pronunciation">
            /{word.transliteration}/
          </p>
          <span className="hidden sm:inline-block text-xs font-semibold bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full dark:bg-sky-900 dark:text-sky-300">
            {word.partOfSpeech}
          </span>
        </div>
        <div className="flex items-center space-x-2">
           <button
              onClick={handleBookmarkClick}
              className="p-1 rounded-full text-slate-400 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
              aria-label={isBookmarked ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 text-slate-500 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 pt-0">
          <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex items-center space-x-3 mb-2 md:mb-0">
                  <p className="text-lg text-slate-700 dark:text-slate-300 font-semibold">
                      Meaning (English): <span className="font-normal">{word.meanings.en}</span>
                  </p>
                  <span className="sm:hidden text-xs font-semibold bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full dark:bg-sky-900 dark:text-sky-300">
                      {word.partOfSpeech}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[word.difficulty]}`}>
                      {word.difficulty}
                  </span>
              </div>
              <div className="text-left md:text-right">
                <div className="inline-block text-sm font-semibold bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 py-1 px-3 rounded-full">
                  Repeated: {word.frequency.toLocaleString()} times
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1" aria-label="Percentage of total Quranic words">
                  (~{learningPercentage.toFixed(3)}% of Quran)
                </p>
              </div>
            </div>
            
            {showAdditionalLanguage && (
                  <p className="text-lg text-slate-700 dark:text-slate-300 font-semibold mb-6">
                      Meaning ({selectedLanguageName}): <span className={`font-normal ${getLanguageClass(language)}`}>
                        <Highlight text={word.meanings[language]} keyword={word.meanings[language]} />
                      </span>
                  </p>
              )}

            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border-l-4 border-emerald-500 mb-6">
              <h4 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Example from the Quran</h4>
              <blockquote dir="rtl" className="arabic-text text-2xl text-slate-800 dark:text-slate-200 text-right mb-3">
                <Highlight text={word.exampleVerseArabic} keyword={word.arabic} />
              </blockquote>
              <div className="flex justify-end mb-3">
                <AdvancedAudioPlayer text={word.exampleVerseArabic} />
              </div>
              <p className="text-md text-slate-500 dark:text-slate-400 italic mb-2">
                <Highlight text={word.exampleVerseTransliteration} keyword={word.transliteration} />
              </p>
              <div className="space-y-1">
                <p className="text-md text-slate-600 dark:text-slate-300 italic">
                    <strong>EN:</strong> "<Highlight text={word.exampleVerseTranslations.en} keyword={word.meanings.en} />"
                </p>
                {showAdditionalLanguage && (
                    <p className="text-md text-slate-600 dark:text-slate-300 italic">
                        <strong>{language.toUpperCase()}:</strong> "<span className={getLanguageClass(language)}><Highlight text={word.exampleVerseTranslations[language]} keyword={word.meanings[language]} /></span>"
                    </p>
                )}
              </div>
              <cite className="block text-right text-sm text-emerald-600 dark:text-emerald-400 font-semibold not-italic mt-3">
                - Surah {word.verseReference}
              </cite>
            </div>

            {(word.root || word.etymology) && (
              <div className="my-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <h4 className="flex items-center text-sm font-bold uppercase text-slate-500 dark:text-slate-400 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Linguistic Insights
                </h4>
                <div className="space-y-3">
                  {word.root && (
                    <div className="flex items-center space-x-4">
                      <p className="font-semibold text-slate-600 dark:text-slate-300 w-24">Word Root:</p>
                       {rootCounts[word.root] > 1 ? (
                         <Tooltip content="Find related words from this root">
                           <button
                             onClick={(e) => {
                               e.stopPropagation();
                               onRootSearch(word.root!);
                             }}
                             className="arabic-text text-2xl font-bold text-emerald-600 dark:text-emerald-400 bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md tracking-widest hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                           >
                             {word.root}
                           </button>
                         </Tooltip>
                       ) : (
                         <span className="arabic-text text-2xl font-bold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md tracking-widest">
                           {word.root}
                         </span>
                       )}
                    </div>
                  )}
                  {word.etymology && (
                    <div>
                      <p className="font-semibold text-slate-600 dark:text-slate-300 mb-1">Etymology:</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 italic">{word.etymology}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {word.derivatives && (
                <div className="my-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                    <h4 className="flex items-center text-sm font-bold uppercase text-slate-500 dark:text-slate-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Related Forms & Derivatives
                    </h4>
                    <div className="flex flex-wrap gap-2">
                    {word.derivatives.map(derivative => (
                        <Tooltip key={derivative.arabic} content={`Search for "${derivative.arabic}"`}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDerivativeSearch(derivative.arabic);
                            }}
                            className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-md hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <span className="arabic-text text-lg font-bold">{derivative.arabic}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">({derivative.meaning})</span>
                        </button>
                        </Tooltip>
                    ))}
                    </div>
                </div>
            )}

            <WordNotes note={note} onSave={(newNote) => onUpdateNote(word.id, newNote)} />

            <button
              onClick={() => onToggleLearned(word.id)}
              className={`w-full flex items-center justify-center mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors ${
                isLearned
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 focus:ring-slate-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800`}
            >
              {isLearned ? (
                  <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Marked as Learned
                  </>
              ) : (
                  <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Learned
                  </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularyListItem;