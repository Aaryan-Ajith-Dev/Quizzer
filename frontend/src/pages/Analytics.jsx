import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Analytics.css';
import { GlobalContext } from '../App';


const Analytics = () => {
  const { quiz_id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const { user, token } = useContext(GlobalContext);
  const [attempt, setAttempt] = useState(null);
  const [score, setScore] = useState(null);
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
      console.log(data);
      setQuiz(data.quiz);
      setAttempt(data.quiz.attempts.filter((val, _) => (val == user._id))[0])
    }
  };
    return (
        <div className="analytics-page">
            <div className="analytics-box">
                <div className="info-text">
                    <span>Name: {user.first_name + user.last_name}</span>
                    <span>Quiz: {quiz.name}</span>
                    <span>You got {score} / {totalScore} right!</span>
                </div>
                
                <div className="answers-section">
                    {answers.map((answer, index) => (
                        <div 
                            className={`answer-card ${answer.isCorrect ? '' : 'wrong'}`} 
                            key={index}
                        >
                            <div className="question">
                                Question {index + 1}: {answer.question}
                            </div>
                            <div className="user-answer">
                                Your answer: {answer.userAnswer}
                            </div>
                            {!answer.isCorrect && (
                                <div className="correct-answer">
                                    Correct answer: {answer.correctAnswer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="summary">
                    <p>Thanks for taking the quiz! Review your answers above.</p>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
