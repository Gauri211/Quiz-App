import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [text, setText] = useState("");
  const fullText = "QuizVerse!";
  const typingSpeed = 150; 

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, typingSpeed);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="area">
      <div className="overlay"></div>
      <div className="context">
        <div className="left-section">
          <h1 className="title">
            Welcome to <span className="typing-text">{text}</span>
          </h1>
          <p className="quote">
            "Knowledge is power, but enthusiasm pulls the switch."
          </p>
          <p className="info">
            Challenge your mind, test your knowledge, and compete to be the best! 
            Get ready to dive into an exciting quiz adventure.
          </p>
          <Link to="/quiz" className="start-button">Start Quiz</Link>
        </div>

        <div className="right-section">
          <div className="question-mark-container">
            <span className="question-mark">?</span>
          </div>
        </div>
      </div>

      <ul className="circles">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
