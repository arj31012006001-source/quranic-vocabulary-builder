import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VocabularyCard from './components/VocabularyCard';
import VocabularyListItem from './components/VocabularyListItem';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import ViewModeToggle from './components/ViewModeToggle';
import GroupedVocabularyList from './components/GroupedVocabularyList';
import ProgressBar from './components/ProgressBar';
import ScrollToTopButton from './components/ScrollToTopButton';
import ThematicFilters from './components/ThematicFilters';
import GroupSortControl from './components/GroupSortControl';
import QuizView from './components/QuizView';
import ResumeBanner from './components/ResumeBanner';
import FavoritesToggle from './components/FavoritesToggle';
import SrsReviewBanner from './components/SrsReviewBanner';
import { LanguageProvider } from './contexts/LanguageContext';
import { QURANIC_VOCABULARY, SRS_INTERVALS_DAYS } from './constants';
import { THEMES } from './themes';
import { SrsData, VocabularyWord, WordNotes } from './types';
import DifficultyFilter from './components/DifficultyFilter';
import WordsWithRootFilter from './components/WordsWithRootFilter';

const ITEMS_PER_PAGE = 10;

const AppContent: React.FC = () => {
  const [learnedWords, setLearnedWords] = useState<Set<number>>(() => {
    try {
      const item = window.localStorage.getItem('learnedWords');
      return item ? new Set(JSON.parse(item)) : new Set();
    } catch (error) {
      console.error('Error reading learnedWords from localStorage', error);
      return new Set();
    }
  });

  const [bookmarkedWords, setBookmarkedWords] = useState<Set<number>>(() => {
    try {
      const item = window.localStorage.getItem('bookmarkedWords');
      return item ? new Set(JSON.parse(item)) : new Set();
    } catch (error) {
      console.error('Error reading bookmarkedWords from localStorage', error);
      return new Set();
    }
  });
  
  const [wordNotes, setWordNotes] = useState<WordNotes>(() => {
    try {
      const item = window.localStorage.getItem('wordNotes');
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.error('Error reading wordNotes from localStorage', error);
      return {};
    }
  });

  const [srsData, setSrsData] = useState<SrsData>(() => {
    try {
      const item = window.localStorage.getItem('srsData');
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.error('Error reading srsData from localStorage', error);
      return {};
    }
  });
  
  const [lastVisitedPage, setLastVisitedPage] = useState<number | null>(() => {
    try {
      const item = window.localStorage.getItem('lastVisitedPage');
      return item ? parseInt(item, 10) : null;
    } catch {
      return null;
    }
  });
  
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    try {
      const item = window.localStorage.getItem('theme');
      return (item as 'light' | 'dark' | 'system') || 'system';
    } catch {
      return 'system';
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'text' | 'root'>('text');
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [viewMode, setViewMode] = useState<'card' | 'list' | 'grouped' | 'thematic' | 'quiz'>('card');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedWordId, setExpandedWordId] = useState<number | null>(null);
  const [groupSortOrder, setGroupSortOrder] = useState<'frequency' | 'alphabetical'>('frequency');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [showOnlyWordsWithRoots, setShowOnlyWordsWithRoots] = useState(false);
  const [showResumeBanner, setShowResumeBanner] = useState(lastVisitedPage && lastVisitedPage > 1);
  const [showSrsBanner, setShowSrsBanner] = useState(true);
  
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem('learnedWords', JSON.stringify(Array.from(learnedWords)));
    } catch (error) {
      console.error('Error saving learnedWords to localStorage', error);
    }
  }, [learnedWords]);

  useEffect(() => {
    try {
      window.localStorage.setItem('bookmarkedWords', JSON.stringify(Array.from(bookmarkedWords)));
    } catch (error) {
      console.error('Error saving bookmarkedWords to localStorage', error);
    }
  }, [bookmarkedWords]);
  
  useEffect(() => {
    try {
      window.localStorage.setItem('wordNotes', JSON.stringify(wordNotes));
    } catch (error) {
      console.error('Error saving wordNotes to localStorage', error);
    }
  }, [wordNotes]);
  
  useEffect(() => {
    try {
      window.localStorage.setItem('srsData', JSON.stringify(srsData));
    } catch (error) {
      console.error('Error saving srsData to localStorage', error);
    }
  }, [srsData]);
  
  const rootCounts = useMemo(() => {
    return QURANIC_VOCABULARY.reduce((acc, word) => {
      if (word.root) {
        acc[word.root] = (acc[word.root] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }, []);

   useEffect(() => {
    if (viewMode === 'card' || viewMode === 'list') {
      try {
        window.localStorage.setItem('lastVisitedPage', String(currentPage));
      } catch (error) {
        console.error('Error saving last page to localStorage', error);
      }
    }
  }, [currentPage, viewMode]);

  const wordsDueForReview = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return QURANIC_VOCABULARY.filter(word => {
        const reviewInfo = srsData[word.id];
        if (!reviewInfo) return false;
        
        const nextReviewDate = new Date(reviewInfo.nextReviewDate);
        nextReviewDate.setHours(0, 0, 0, 0);

        return nextReviewDate <= now;
    });
  }, [srsData]);

  const handleToggleLearned = (id: number) => {
    const isCurrentlyLearned = learnedWords.has(id);
    
    setLearnedWords(prev => {
      const newSet = new Set(prev);
      if (isCurrentlyLearned) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    if (!isCurrentlyLearned) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSrsData(prev => ({
        ...prev,
        [id]: { nextReviewDate: tomorrow.toISOString(), srsLevel: 0 }
      }));
    } else {
      setSrsData(prev => {
        const newData = { ...prev };
        delete newData[id];
        return newData;
      });
    }
  };
  
  const handleToggleBookmark = (id: number) => {
    setBookmarkedWords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleUpdateNote = (id: number, note: string) => {
    setWordNotes(prev => {
      const newNotes = { ...prev };
      if (note.trim()) {
        newNotes[id] = note;
      } else {
        delete newNotes[id];
      }
      return newNotes;
    });
  };

  const handleQuizComplete = (results: { correct: VocabularyWord[]; incorrect: VocabularyWord[] }) => {
    const { correct, incorrect } = results;

    setSrsData(prevSrsData => {
        const newSrsData = { ...prevSrsData };
        correct.forEach(word => {
            const currentSrsInfo = newSrsData[word.id];
            if (currentSrsInfo) {
                const newSrsLevel = Math.min(currentSrsInfo.srsLevel + 1, SRS_INTERVALS_DAYS.length - 1);
                const intervalDays = SRS_INTERVALS_DAYS[newSrsLevel];
                const newReviewDate = new Date();
                newReviewDate.setDate(newReviewDate.getDate() + intervalDays);
                
                newSrsData[word.id] = {
                    nextReviewDate: newReviewDate.toISOString(),
                    srsLevel: newSrsLevel,
                };
            }
        });
        return newSrsData;
    });
    
    const incorrectWordIds = incorrect.map(w => w.id);
    if (incorrectWordIds.length > 0) {
      setLearnedWords(prev => {
        const newSet = new Set(prev);
        incorrectWordIds.forEach(id => newSet.delete(id));
        return newSet;
      });
      setSrsData(prev => {
          const newData = { ...prev };
          incorrectWordIds.forEach(id => delete newData[id]);
          return newData;
      });
    }

    setViewMode('card');
  };

  const handleRootSearch = (root: string) => {
    setSearchQuery(root);
    setSearchType('root');
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDerivativeSearch = (derivative: string) => {
    setSearchQuery(derivative);
    setSearchType('text'); // Search for the specific word form
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredWords = useMemo(() => {
    let words = QURANIC_VOCABULARY;

    if (showOnlyBookmarked) {
      words = words.filter(word => bookmarkedWords.has(word.id));
    }
    
    if (showOnlyWordsWithRoots) {
      words = words.filter(word => !!word.root);
    }
    
    if (viewMode === 'thematic' && activeTheme) {
      const theme = THEMES.find(t => t.name === activeTheme);
      if (theme) {
        const themeWordIds = new Set(theme.wordIds);
        words = words.filter(word => themeWordIds.has(word.id));
      }
    }

    if (activeDifficulty !== 'All') {
      words = words.filter(word => word.difficulty === activeDifficulty);
    }

    if (searchQuery) {
      if (searchType === 'root') {
        words = words.filter(word => word.root === searchQuery);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        words = words.filter(word =>
          word.arabic.toLowerCase().includes(lowercasedQuery) ||
          word.transliteration.toLowerCase().includes(lowercasedQuery) ||
          word.root?.includes(searchQuery) ||
          Object.values(word.meanings).some(meaning =>
            meaning.toLowerCase().includes(lowercasedQuery)
          )
        );
      }
    }

    return words;
  }, [searchQuery, searchType, activeTheme, viewMode, showOnlyBookmarked, bookmarkedWords, activeDifficulty, showOnlyWordsWithRoots]);
  
  const learningProgress = useMemo(() => {
    if (QURANIC_VOCABULARY.length === 0) return 0;
    const learnedTotalFrequency = QURANIC_VOCABULARY.reduce((acc, word) => {
      if (learnedWords.has(word.id)) {
        return acc + word.frequency;
      }
      return acc;
    }, 0);
    return (learnedTotalFrequency / 77430) * 100;
  }, [learnedWords]);

  const paginatedWords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredWords.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredWords, currentPage]);

  const totalPages = Math.ceil(filteredWords.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleResume = () => {
    if (lastVisitedPage) {
      handlePageChange(lastVisitedPage);
    }
    setShowResumeBanner(false);
  };

  const handleToggleExpanded = (id: number) => {
    setExpandedWordId(prevId => (prevId === id ? null : id));
  };

  const renderContent = () => {
    if (viewMode === 'quiz') {
      let wordsForQuiz: VocabularyWord[];
      let isReview = false;

      if (wordsDueForReview.length > 0) {
          wordsForQuiz = wordsDueForReview;
          isReview = true;
      } else {
          const learnedWordObjects = QURANIC_VOCABULARY.filter(word => learnedWords.has(word.id));
          wordsForQuiz = [...learnedWordObjects].sort(() => 0.5 - Math.random()).slice(0, 10);
      }
      
      if (wordsForQuiz.length < 4) {
          alert('You need at least 4 words marked as "Learned" (or due for review) to start a quiz.');
          setViewMode('card');
          return null;
      }

      return <QuizView wordsToQuiz={wordsForQuiz} onQuizComplete={handleQuizComplete} isReviewSession={isReview} />;
    }
    
    if (showOnlyBookmarked && bookmarkedWords.size === 0) {
      return <p className="text-center text-slate-500 dark:text-slate-400 mt-8">You haven't bookmarked any words yet. Click the star icon on a word to add it to your favorites!</p>;
    }

    if (filteredWords.length === 0) {
        return <p className="text-center text-slate-500 dark:text-slate-400 mt-8">No words found. Try clearing your search or filters.</p>;
    }

    switch (viewMode) {
      case 'card':
      case 'thematic':
        return (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {paginatedWords.map(word => (
              <VocabularyCard
                key={word.id}
                word={word}
                isLearned={learnedWords.has(word.id)}
                onToggleLearned={handleToggleLearned}
                isBookmarked={bookmarkedWords.has(word.id)}
                onToggleBookmark={handleToggleBookmark}
                note={wordNotes[word.id] || ''}
                onUpdateNote={handleUpdateNote}
                onRootSearch={handleRootSearch}
                rootCounts={rootCounts}
                onDerivativeSearch={handleDerivativeSearch}
              />
            ))}
          </div>
        );
      case 'list':
        return (
          <div className="max-w-4xl mx-auto space-y-3">
            {paginatedWords.map(word => (
              <VocabularyListItem
                key={word.id}
                word={word}
                isExpanded={expandedWordId === word.id}
                onToggle={handleToggleExpanded}
                isLearned={learnedWords.has(word.id)}
                onToggleLearned={handleToggleLearned}
                isBookmarked={bookmarkedWords.has(word.id)}
                onToggleBookmark={handleToggleBookmark}
                note={wordNotes[word.id] || ''}
                onUpdateNote={handleUpdateNote}
                onRootSearch={handleRootSearch}
                rootCounts={rootCounts}
                onDerivativeSearch={handleDerivativeSearch}
              />
            ))}
          </div>
        );
      case 'grouped':
        return (
          <GroupedVocabularyList
            words={paginatedWords}
            expandedWordId={expandedWordId}
            onToggle={handleToggleExpanded}
            groupSortOrder={groupSortOrder}
            learnedWords={learnedWords}
            onToggleLearned={handleToggleLearned}
            bookmarkedWords={bookmarkedWords}
            onToggleBookmark={handleToggleBookmark}
            wordNotes={wordNotes}
            onUpdateNote={handleUpdateNote}
            onRootSearch={handleRootSearch}
            rootCounts={rootCounts}
            onDerivativeSearch={handleDerivativeSearch}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen font-sans">
      <Header theme={theme} setTheme={setTheme} />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-2">Master the Most Common Words in the Quran</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
          By mastering the most frequent words, you can unlock a deeper understanding of the divine text. Mark words as 'Learned' to track your progress and take quizzes.
        </p>

        <ProgressBar progress={learningProgress} />
        
        <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} reviewCount={wordsDueForReview.length} />
        
        {viewMode !== 'quiz' && (
          <>
            {showSrsBanner && wordsDueForReview.length > 0 && (
              <SrsReviewBanner
                reviewCount={wordsDueForReview.length}
                onStartReview={() => setViewMode('quiz')}
                onDismiss={() => setShowSrsBanner(false)}
              />
            )}
            {showResumeBanner && lastVisitedPage && (
              <ResumeBanner page={lastVisitedPage} onResume={handleResume} onDismiss={() => setShowResumeBanner(false)} />
            )}
            <div className="mb-4 space-y-4">
              <div className="flex justify-center items-start gap-2">
                <div className="flex-grow max-w-2xl">
                  <SearchBar 
                    searchQuery={searchQuery} 
                    onSearchChange={handleSearchQueryChange}
                    searchType={searchType}
                    onSearchTypeChange={setSearchType}
                  />
                </div>
                <WordsWithRootFilter
                  showOnly={showOnlyWordsWithRoots}
                  onToggle={() => setShowOnlyWordsWithRoots(!showOnlyWordsWithRoots)}
                />
                <FavoritesToggle 
                  showOnlyBookmarked={showOnlyBookmarked} 
                  onToggle={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
                  hasBookmarks={bookmarkedWords.size > 0}
                />
              </div>
              <DifficultyFilter activeDifficulty={activeDifficulty} onDifficultyChange={setActiveDifficulty} />
            </div>
          </>
        )}
        
        {viewMode === 'thematic' && <ThematicFilters themes={THEMES} activeTheme={activeTheme} onSelectTheme={setActiveTheme} />}
        {viewMode === 'grouped' && <GroupSortControl sortOrder={groupSortOrder} onSortChange={setGroupSortOrder} />}

        {renderContent()}

        {totalPages > 1 && viewMode !== 'quiz' && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};


const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;