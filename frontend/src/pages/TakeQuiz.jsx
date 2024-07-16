import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import '../css/TakeQuiz.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const TakeQuiz = () => {
  const location = useLocation();
  const handle = useFullScreenHandle();
  const [takeTest, setTakeTest] = useState(false);
  const [quiz, setQuiz] = useState(location.state && location.state.quiz ? location.state.quiz : {
    name: "testing",
    team_size: 1,
    elements: [
      {
        question: "What is this",
        noOfOptions: 2,
        options: ['False', 'True'],
      },
      {
        question: "What is this",
        noOfOptions: 2,
        options: ['Tue', 'True'],
      }
    ]
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const optionMapping = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D',
  };

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


  return (
    <div className="take-quiz-page">
      {!takeTest ? (
        <>
          <Button variant="contained" onClick={handleStartQuiz}>
            Start Quiz and Enter Fullscreen
          </Button>
          <Typography variant="h4" className="quiz-name">Name: {quiz.name}</Typography>
        </>
      ) : (
          <FullScreen handle={ handle }>
          <div className="content">
            <div className="elements">
              <Typography variant="h5" className='question'>Question {currentQuestionIndex + 1}: {quiz.elements[currentQuestionIndex].question}</Typography>
              <Grid container spacing={3} className="options-container">
                {quiz.elements[currentQuestionIndex].options.map((opn, i) =>
                  <Grid item xs={12} sm={6} key={i}>
                    <Card className="option-card">
                      <CardContent>
                        <Typography variant="h6">
                          {optionMapping[i]}: {opn}
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
          </div>
        </FullScreen>
      )}
    </div>
  );
}

export default TakeQuiz;
