import React from 'react';
import { VocabularyWord, WordNotes } from '../types';
import VocabularyListItem from './VocabularyListItem';

interface GroupedVocabularyListProps {
  words: VocabularyWord[];
  expandedWordId: number | null;
  onToggle: (id: number) => void;
  groupSortOrder: 'frequency' | 'alphabetical';
  learnedWords: Set<number>;
  onToggleLearned: (id: number) => void;
  bookmarkedWords: Set<number>;
  onToggleBookmark: (id: number) => void;
  wordNotes: WordNotes;
  onUpdateNote: (id: number, note: string) => void;
  onRootSearch: (root: string) => void;
  rootCounts: Record<string, number>;
  onDerivativeSearch: (derivative: string) => void;
}

const GroupedVocabularyList: React.FC<GroupedVocabularyListProps> = ({ 
  words, expandedWordId, onToggle, groupSortOrder, 
  learnedWords, onToggleLearned, bookmarkedWords, onToggleBookmark,
  wordNotes, onUpdateNote, onRootSearch, rootCounts, onDerivativeSearch
}) => {
  const groupedWords = React.useMemo(() => {
    const groups = words.reduce((acc, word) => {
      const key = word.partOfSpeech;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(word);
      return acc;
    }, {} as Record<string, VocabularyWord[]>);

    // Sort words within each group
    for (const key in groups) {
      if (groupSortOrder === 'alphabetical') {
        groups[key].sort((a, b) => a.arabic.localeCompare(b.arabic, 'ar'));
      } else { // Default to 'frequency'
        groups[key].sort((a, b) => b.frequency - a.frequency);
      }
    }

    return groups;
  }, [words, groupSortOrder]);

  const groupOrder = ['Noun', 'Verb', 'Pronoun', 'Particle', 'Particle/Pronoun'];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {groupOrder.map(groupName => {
        const wordsInGroup = groupedWords[groupName];
        if (!wordsInGroup || wordsInGroup.length === 0) {
          return null;
        }

        return (
          <div key={groupName}>
            <div className="pb-2 mb-4 border-b-2 border-emerald-500">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{groupName}s</h2>
            </div>
            <div className="space-y-3">
              {wordsInGroup.map(word => (
                <VocabularyListItem
                  key={word.id}
                  word={word}
                  isExpanded={expandedWordId === word.id}
                  onToggle={onToggle}
                  isLearned={learnedWords.has(word.id)}
                  onToggleLearned={onToggleLearned}
                  isBookmarked={bookmarkedWords.has(word.id)}
                  onToggleBookmark={onToggleBookmark}
                  note={wordNotes[word.id] || ''}
                  onUpdateNote={onUpdateNote}
                  onRootSearch={onRootSearch}
                  rootCounts={rootCounts}
                  onDerivativeSearch={onDerivativeSearch}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupedVocabularyList;