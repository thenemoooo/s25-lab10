import React, { useState, useMemo } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore'; 

const Quiz: React.FC = () => {
  const quiz = useMemo(() => new QuizCore(), []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); 
  const [showScore, setShowScore] = useState(false); 

  const currentQuestion = quiz.getCurrentQuestion();

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option); 
  };

  const handleButtonClick = (): void => {
    if (selectedAnswer) {
      quiz.answerQuestion(selectedAnswer);
      
      if (quiz.hasNextQuestion()) {
        quiz.nextQuestion(); 
        setCurrentQuestionIndex(prev => prev + 1); 
        setSelectedAnswer(null); 
      } else {
        setShowScore(true);
      }
    }
  };

  if (showScore) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed!</h2>
        <p className="score-text">Final Score: {quiz.getScore()} out of {quiz.getTotalQuestions()}</p>
      </div>
    );
  }

  if (!currentQuestion) return <div>Loading questions...</div>;

  return (
    <div className="quiz-container">
      <h2>Quiz Question:</h2>
      <p className="question-text">{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul className="options-list">
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            // UX: Сонгогдсон хариултыг CSS-ээр тодруулах [cite: 30]
            className={`option-item ${selectedAnswer === option ? 'selected' : ''}`}
          >
            {option}
          </li>
        ))}
      </ul>

      <div className="status-section">
        <h3>Selected Answer:</h3>
        <p>{selectedAnswer ?? 'No answer selected'}</p>
      </div>

      <button 
        className="next-button" 
        onClick={handleButtonClick}
        disabled={!selectedAnswer} 
      >
        {quiz.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;