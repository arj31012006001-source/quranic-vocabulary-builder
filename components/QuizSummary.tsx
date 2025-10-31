import React from 'react';
import { QuizQuestion, VocabularyWord } from '../types';

interface QuizSummaryProps {
  questions: QuizQuestion[];
  userAnswers: Record<number, string>;
  onRestart: () => void;
  onExit: (results: { correct: VocabularyWord[], incorrect: VocabularyWord[] }) => void;
}

const QuizSummary: React.FC<QuizSummaryProps> = ({ questions, userAnswers, onRestart, onExit }) => {
  const correctAnswers = questions.filter(q => userAnswers[q.word.id] === q.correctAnswer);
  const incorrectAnswers = questions.filter(q => userAnswers[q.word.id] !== q.correctAnswer);

  const score = correctAnswers.length;
  const percentage = (score / questions.length) * 100;

  const handleExitClick = () => {
    onExit({
      correct: correctAnswers.map(q => q.word),
      incorrect: incorrectAnswers.map(q => q.word),
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Quiz Complete!</h2>
      <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">
        You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{questions.length}</span> ({questions.length > 0 ? percentage.toFixed(0) : 0}%).
      </p>

      {incorrectAnswers.length > 0 && (
        <div className="text-left mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Review your mistakes:</h3>
          <ul className="space-y-4">
            {incorrectAnswers.map(({ word, correctAnswer }) => (
              <li key={word.id} className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg">
                <p dir="rtl" className="arabic-text text-2xl font-bold text-slate-800 dark:text-slate-200">{word.arabic}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Your answer: <span className="text-red-500">{userAnswers[word.id]}</span></p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Correct answer: <span className="text-green-500">{correctAnswer}</span></p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {incorrectAnswers.length === 0 && questions.length > 0 && (
        <p className="text-lg text-green-600 dark:text-green-400 my-8">
          🎉 Incredible! You got all the answers correct! 🎉
        </p>
      )}

      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={onRestart}
          className="bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={handleExitClick}
          className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          Back to Study
        </button>
      </div>
    </div>
  );
};

export default QuizSummary;