import React, { useState, useEffect } from 'react';
import { VocabularyWord, QuizQuestion } from '../types';
import { QURANIC_VOCABULARY } from '../constants';
import QuestionCard from './QuestionCard';
import QuizSummary from './QuizSummary';

interface QuizViewProps {
  wordsToQuiz: VocabularyWord[];
  onQuizComplete: (results: { correct: VocabularyWord[], incorrect: VocabularyWord[] }) => void;
  isReviewSession: boolean;
}

const generateQuestions = (words: VocabularyWord[]): QuizQuestion[] => {
  return words.map(word => {
    const correctAnswer = word.meanings.en;
    const allMeanings = QURANIC_VOCABULARY
      .map(w => w.meanings.en)
      .filter(m => m !== correctAnswer);
    
    // Shuffle all meanings and pick 3 wrong answers
    const wrongAnswers = [...allMeanings].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const options = [...wrongAnswers, correctAnswer].sort(() => 0.5 - Math.random());

    return {
      word,
      options,
      correctAnswer,
    };
  });
};

const QuizView: React.FC<QuizViewProps> = ({ wordsToQuiz, onQuizComplete, isReviewSession }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizState, setQuizState] = useState<'in-progress' | 'finished'>('in-progress');

  useEffect(() => {
    // Shuffle the words to quiz for variety each time
    const shuffledWords = [...wordsToQuiz].sort(() => 0.5 - Math.random());
    setQuestions(generateQuestions(shuffledWords));
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizState('in-progress');
  }, [wordsToQuiz]);

  const handleAnswer = (wordId: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [wordId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizState('finished');
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizState('in-progress');
     const shuffledWords = [...wordsToQuiz].sort(() => 0.5 - Math.random());
    setQuestions(generateQuestions(shuffledWords)); 
  };
  
  const handleExit = (results: { correct: VocabularyWord[], incorrect: VocabularyWord[] }) => {
    onQuizComplete(results);
  };

  if (questions.length === 0) {
    return <div className="text-center p-8">Loading quiz...</div>;
  }

  if (quizState === 'finished') {
    return (
      <QuizSummary
        questions={questions}
        userAnswers={userAnswers}
        onRestart={handleRestart}
        onExit={handleExit}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestion.word.id];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">
        {isReviewSession ? 'Review Session' : 'Vocabulary Quiz'}
      </h2>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
        {isReviewSession 
          ? 'Reviewing words due today. Correct answers will be scheduled for a later date.' 
          : 'Test your knowledge of learned Quranic words.'}
      </p>
      <QuestionCard
        key={currentQuestion.word.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
        userAnswer={userAnswer}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
      {userAnswer && (
        <div className="mt-6 text-center">
          <button
            onClick={handleNext}
            className="bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizView;