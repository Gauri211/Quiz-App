import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveAttempt, getAttempts } from "../utils/indexedDB";
import "./Results.css";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || 0;
  const totalQuestions = location.state?.totalQuestions || 10;
  const unattemptedQuestions = location.state?.unattempted || 0;
  const incorrectAnswers = totalQuestions - score - unattemptedQuestions;
  const [attemptHistory, setAttemptHistory] = useState([]);


  useEffect(() => {
    async function handleResults() {
      await saveAttempt(score, totalQuestions);
      fetchAttemptHistory();
    }
    handleResults();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAttemptHistory = async () => {
    const history = await getAttempts();
    
    const uniqueAttempts = [];
    const seen = new Set();
    
    history.forEach(attempt => {
      const key = `${attempt.date}-${attempt.score}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueAttempts.push(attempt);
      }
    });

    setAttemptHistory(uniqueAttempts.reverse());
  };

  return (
    <div className="results-container">
      <h2 className="results-title">Your Score: <span>{score}/{totalQuestions}</span></h2>

      <div className="analysis-box">
        <div className="analysis-item correct">
          <p>Correct</p>
          <h3>{score}</h3>
        </div>
        <div className="analysis-item incorrect">
          <p>Incorrect</p>
          <h3>{incorrectAnswers}</h3>
        </div>
      </div>

      <button className="retry-btn" onClick={() => navigate("/quiz")}>Reattempt Quiz</button>

      <div className="history-box">
        <h3>Attempt History</h3>
        {attemptHistory.length > 0 ? (
          <ul>
            {attemptHistory.map((attempt, index) => (
              <li key={index}>
                <p>{attempt.date}</p> <span>Score: {attempt.score}/{attempt.totalQuestions}</span> 
              </li>
            ))}
          </ul>
        ) : (
          <p>No attempt history yet.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
