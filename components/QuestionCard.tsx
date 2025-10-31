import React from 'react';
import { QuizQuestion } from '../types';

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswer: (wordId: number, answer: string) => void;
  userAnswer: string | undefined;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, userAnswer, questionNumber, totalQuestions }) => {
  const handleOptionClick = (option: string) => {
    if (userAnswer) return; // Don't allow changing answer
    onAnswer(question.word.id, option);
  };

  const getButtonClass = (option: string) => {
    if (!userAnswer) {
      // Before an answer is submitted
      return 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600';
    }
    // After an answer is submitted
    if (option === question.correctAnswer) {
      return 'bg-green-500 text-white';
    }
    if (option === userAnswer) {
      return 'bg-red-500 text-white';
    }
    return 'bg-slate-200 dark:bg-slate-600 opacity-70 cursor-not-allowed';
  };

  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
       <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-slate-700 dark:text-slate-300">Question {questionNumber}/{totalQuestions}</span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700">
          <div
            className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Quiz progress: ${Math.round(progressPercentage)}% complete`}
          ></div>
        </div>
      </div>

      <p className="text-center text-lg text-slate-600 dark:text-slate-300 mb-4">What is the meaning of this word?</p>
      <h3 dir="rtl" className="arabic-text text-5xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-8">
        {question.word.arabic}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={!!userAnswer}
            className={`w-full text-left p-4 rounded-lg border dark:border-slate-600 transition-all duration-200 ${getButtonClass(option)} ${!userAnswer ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {option}
          </button>
        ))}
      </div>
      {userAnswer && (
        <div className="mt-6 p-4 rounded-md text-center">
            {userAnswer === question.correctAnswer ? (
                <p className="text-green-600 dark:text-green-400 font-semibold text-lg">Correct!</p>
            ) : (
                <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
                    Incorrect. The correct answer is "{question.correctAnswer}".
                </p>
            )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;