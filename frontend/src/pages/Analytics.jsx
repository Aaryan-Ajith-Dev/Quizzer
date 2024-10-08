import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Analytics.css';
import { GlobalContext } from '../App';

const Analytics = () => {
  const { id } = useParams(); // Get the 'id' from URL params
  const quizId = id ? id : '';
  const [quiz, setQuiz] = useState(null);
  const { user, token } = useContext(GlobalContext);
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(null);
  const [score, setScore] = useState(null);
  const [totalScore, setTotalScore] = useState(null);

  const getQuizFromId = async (id) => {
    const response = await fetch(`http://localhost:3000/quiz/attempt/${id}`, { 
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const data = await response.json();
    if (response.ok) {
      const userAttempts = data.quiz.attempts.filter((val) => val.user === user._id);
      setQuiz(data.quiz);
      setAttempts(userAttempts);
      setAttemptIndex(userAttempts.length - 1);
      setLoading(false);
    } else {
      console.log("Error: ", response);
    }
  };

  const calculateScore = (quiz, attempts, attemptIndex) => {
    if (!quiz || !attempts || attempts.length === 0) return;
    let scor = 0;
    let totScore = 0;
    quiz.elements.forEach((ele, index) => {
      if (isCorrect(attemptIndex, index))
        scor += ele.score;
      totScore += ele.score;
    });
    setScore(scor);
    setTotalScore(totScore);
  };

  const isCorrect = (attemptIndex, index) => 
    quiz.elements[index].options[attempts[attemptIndex].answers[index]].isAnswer;
  
  useEffect(() => {
    getQuizFromId(quizId);
  }, [quizId, user]);

  useEffect(() => {
    if (quiz && attempts) {
      calculateScore(quiz, attempts, attemptIndex);
    }
  }, [quiz, attempts, attemptIndex]);

  return (
    <div className="analytics-page">
      {loading ?
        <span>Loading...</span>
        :
        <div className="analytics-box">
          <div className="info-text">
            <span>Name: {user.first_name + ' ' + user.last_name}</span>
            <span>Quiz: {quiz.name}</span>
            <span>You got {score} / {totalScore} right!</span>
          </div>
          
          <div className="answers-section">
            {attempts[attemptIndex].answers.map((ans, i) => (
              <div 
                className={`answer-card ${isCorrect(attemptIndex, i) ? '' : 'wrong'}`} 
                key={i}
              >
                <div className="question">
                  Question {i + 1}: {quiz.elements[i].question}
                </div>
                <div className="user-answer">
                  Your answer: {quiz.elements[i].options[ans].value}
                </div>
                {!isCorrect(attemptIndex, i) && (
                  <div className="correct-answer">
                    Correct answer: {quiz.elements[i].options.find(opt => opt.isAnswer).value}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="summary">
            <p>Thanks for taking the quiz! Review your answers above.</p>
          </div>
        </div>}
    </div>
  );
}

export default Analytics;
