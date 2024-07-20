import React, { useContext, useEffect, useState } from 'react';
import '../css/Dashboard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../App';

const Dashboard = () => {
  const { user, setUser, token } = useContext(GlobalContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Dashboard user:", user);  // Check user data
  // }, [user]);

  const handleDeleteQuiz = async (id) => {
    const response = await fetch(`http://localhost:3000/quiz/${id}`, { 
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      alert(data.msg);
      window.location.reload();
    }
  };

  if (!user) {
    return <p>Loading...</p>;  // Add a loading state
  }

  return (
    <div className="dashboard">
      <h1 className='greet'>Hello, {user ? user.first_name : "User"}!</h1>
      <p className='body'>Here you can manage your quizzes and view your quiz results.</p>
      
      <h1 className='title'>Your Quizzes</h1>
      <div className='quizzes'>
        {user.quizzes_made && user.quizzes_made.map((quiz, index) =>
          <Card className='quiz_card' key={index}>
            <CardContent className='quiz_card_content'>
              <span>Quiz Name: {quiz.name}</span>
              <span>Number of questions: {quiz.elements && quiz.elements.length}</span>
              <div className='buttons'>
                <Button onClick={() => { 
                  navigate('/quiz/make', {
                    state: { quiz: quiz }
                  });
                }}>Edit</Button>
                <Button onClick={() => { 
                  navigate('/quiz/take', {
                    state: { quiz: quiz }
                  });
                }}>Test</Button>
              </div>
              <Button color='error' variant='outlined' onClick={() => handleDeleteQuiz(quiz._id)}>Delete</Button>
            </CardContent>
          </Card>
        )}
        <Button variant="outlined" onClick={() => navigate('/quiz/make', {
          state: null
        })}>New Quiz</Button>
      </div>
      <h1 className='title'>Quizzes Taken</h1>
      <div className='quizzes'>
        {user.quizzes_attempted && user.quizzes_attempted.map((quiz, index) => 
          <Card className='quiz_card' key={index}>
            <CardContent className='quiz_card_content'>
              <span>Quiz Name: {quiz.name}</span>
              <span>Number of questions: {quiz.elements && quiz.elements.length}</span>
              <div className='buttons'>
                <Button>Edit</Button>
                <Button>Test</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
