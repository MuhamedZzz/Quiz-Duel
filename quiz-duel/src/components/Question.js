import React from "react";

const Question = ({ question, selectedAnswer, onAnswer }) => {
  const correctAnswerIndex = question.answers.findIndex((ans) => ans.correct);

  return (
    <div className="question-container">
      <h2 className="neon-question">{question.text}</h2>
      <div className="answers-grid">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className={`glass-btn answer-option ${
              selectedAnswer !== null
                ? index === correctAnswerIndex
                  ? "correct-glow"
                  : index === selectedAnswer
                  ? "incorrect-glow"
                  : ""
                : ""
            }`}
            onClick={() => onAnswer(index)}
            disabled={selectedAnswer !== null}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
