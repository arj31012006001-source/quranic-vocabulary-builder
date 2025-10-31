// FIX: Removed self-import of `VocabularyWord` which caused a conflict.
export interface VocabularyWord {
  id: number;
  arabic: string;
  transliteration: string;
  partOfSpeech: string;
  meanings: { [key: string]: string };
  exampleVerseArabic: string;
  exampleVerseTransliteration: string;
  exampleVerseTranslations: { [key: string]: string };
  verseReference: string;
  frequency: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  root?: string;
  etymology?: string;
  derivatives?: WordDerivative[];
}

export interface WordDerivative {
  arabic: string;
  meaning: string;
}

export interface SrsInfo {
  nextReviewDate: string; // ISO string
  srsLevel: number;
}

export type SrsData = Record<number, SrsInfo>; // word.id is the key

export type WordNotes = Record<number, string>;

export interface Theme {
  name: string;
  wordIds: number[];
}

export interface Language {
  code: string;
  name: string;
}

// FIX: Added QuizQuestion interface
export interface QuizQuestion {
  word: VocabularyWord;
  options: string[]; // Meanings in English
  correctAnswer: string; // The correct meaning
}