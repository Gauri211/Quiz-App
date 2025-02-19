import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { quizData } from "../data/quizdata";
import "./Quiz.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  // eslint-disable-next-line no-unused-vars
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const navigate = useNavigate();
  const [inputAnswer, setInputAnswer] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [unattemptedQuestions, setUnattemptedQuestions] = useState(new Set());

  // Timer Countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setUnattemptedQuestions((prev) => {
      const newSet = new Set(prev);
      newSet.delete(currentQuestion);
      return newSet;
    });

    if (option === quizData[currentQuestion].answer) {
      setIsCorrect(true);
      setScore(prevScore => {
        scoreRef.current = prevScore + 1;
        return prevScore + 1;
      });
      updateAnsweredQuestions(currentQuestion, true);
    } else {
      setIsCorrect(false);
      updateAnsweredQuestions(currentQuestion, false);
    }
    setTimeout(handleNextQuestion, 1500);
  };

  const handleInputAnswer = (inputAnswer) => {
    if (inputAnswer.trim() === "") return; 

    setInputAnswer(inputAnswer);
    setUnattemptedQuestions((prev) => {
      const newSet = new Set(prev);
      newSet.delete(currentQuestion);
      return newSet;
    });

    if (inputAnswer === quizData[currentQuestion].answer) {
      setIsCorrect(true);
      setScore(prevScore => {
        scoreRef.current = prevScore + 1;
        return prevScore + 1;
      });
      updateAnsweredQuestions(currentQuestion, true);
    } else {
      setIsCorrect(false);
      updateAnsweredQuestions(currentQuestion, false);
    }
    setTimeout(handleNextQuestion, 1500);
  };

  const updateAnsweredQuestions = (questionIndex, correct) => {
    setAnsweredQuestions((prevState) => {
      const updated = [...prevState];
      updated[questionIndex] = correct;
      return updated;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setInputAnswer("");
      setTimeLeft(30);
    } else {
      navigate("/results", { 
        state: { 
          score: scoreRef.current, 
          totalQuestions: quizData.length,
          unattempted: unattemptedQuestions.size
        } 
      });
    }
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Quiz Time!</h2>
      <div className="nav-container">
        <div className="question-navigation">
            {quizData.map((_, index) => (
            <button
                key={index}
                className={`question-nav-btn ${
                currentQuestion === index ? "active" : ""
                } ${
                answeredQuestions[index] === true
                    ? "answered-correct"
                    : answeredQuestions[index] === false
                    ? "answered-wrong"
                    : ""
                }`}
                onClick={() => setCurrentQuestion(index)}
                disabled={currentQuestion !== index}
            >
                {index + 1}
            </button>
            ))}
        </div>
      </div>
      <div className="timer">Time Left: {timeLeft}s</div>
      <div className="question-box">
        <h3>{quizData[currentQuestion].question}</h3>
        <div className="options-container">
          {quizData[currentQuestion].options ? (
            quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedOption
                    ? option === quizData[currentQuestion].answer
                      ? "correct"
                      : option === selectedOption
                      ? "wrong"
                      : ""
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))
          ) : (
            <div className="input-container">
              <input
                type="number"
                className={`input-answer ${isCorrect === null ? "" : isCorrect ? "correct" : "wrong"}`}
                value={inputAnswer}
                onChange={(e) => setInputAnswer(e.target.value)}
                placeholder="Enter your answer"
              />
              <button
                className="submit-btn"
                onClick={() => handleInputAnswer(inputAnswer)}
                disabled={inputAnswer.trim() === ""} 
            >
                Save
            </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
