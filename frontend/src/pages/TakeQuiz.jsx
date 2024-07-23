import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Button, TextField } from "@mui/material";
import '../css/TakeQuiz.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { GlobalContext } from "../App";

const TakeQuiz = () => {
  const location = useLocation();
  const { token } = useContext(GlobalContext);
  const handle = useFullScreenHandle();
  const [takeTest, setTakeTest] = useState(false);
  const [quiz, setQuiz] = useState(location.state && location.state.quiz ? location.state.quiz : null);
  const [quizId, setQuizId] = useState('');
  const [answers, setAnswers] = useState(quiz ? Array(quiz.elements.length) : 0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const optionMapping = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F'
  };

  const handleSave = async () => {
    const response = await fetch(`http://localhost:3000/quiz/attempt`, { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        quiz: quiz,
        answers: answers
      })
    })
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      alert(data.msg);
      window.location.reload()
    }
  }

  const findQuizById = async () => {
    const response = await fetch(`http://localhost:3000/quiz/attempt/${quizId}`, { 
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      setQuiz(data.quiz);
      alert(data.msg);
    } 
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleStartQuiz = () => {
    setTakeTest(true);
    handle.enter();
  };

  const handleFullScreenChange = () => {
    if (!document.fullscreenElement) {
      handle.enter();
    }
  };

  return (
    <FullScreen handle={handle}>
      <div className="take-quiz-page">
        {!takeTest ? (
          <div className="start-quiz-container">
            {quiz ? (
              <>
                <Button variant="contained" onClick={handleStartQuiz} className="start-quiz-button">
                  Start Quiz and Enter Fullscreen
                </Button>
                <Typography variant="h4" className="quiz-name">Name: {quiz.name}</Typography>
              </>
            ) : (
              <div className="search-container">
                <TextField
                  label="Quiz ID"
                  onChange={(e) => setQuizId(e.target.value)}
                  value={quizId}
                  name="quiz_id"
                />
                <Button variant="contained" className="search-button" onClick={findQuizById}>
                  Search!
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="content">
            <div className="elements">
              <Typography variant="h5" className='question'>Question {currentQuestionIndex + 1}: {quiz.elements[currentQuestionIndex].question}</Typography>
              <Grid container spacing={3} className="options-container">
                {quiz.elements[currentQuestionIndex].options.map((opn, i) =>
                  <Grid item xs={12} sm={6} key={i}>
                    <Card className={`option-card ${answers[currentQuestionIndex] === i ? 'chosen-option-card' : ''}`}>
                      <CardContent onClick={() => {
                        setAnswers((prev) => {
                          const newAnswers = [...prev] 
                          newAnswers[currentQuestionIndex] = i;
                          return newAnswers;
                        })
                      }}>
                        <Typography variant="h6" className="opn">
                          {optionMapping[i]}: {opn.value}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </div>
            <div className="navigation-buttons">
              <Button variant="outlined" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                Previous
              </Button>
              <Button variant="contained" onClick={handleNextQuestion} disabled={currentQuestionIndex === quiz.elements.length - 1}>
                Next
              </Button>
            </div>
            <br />
            <Button onClick={handleSave} variant="contained">
              Submit
            </Button>
          </div>
        )}
      </div>
    </FullScreen>
  );
}

export default TakeQuiz;
