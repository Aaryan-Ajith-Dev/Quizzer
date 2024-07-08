// src/Dashboard.js
import React, { useState } from 'react';
import '../css/Dashboard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState('John')
  const navigate = useNavigate()
  return (
    <div className="dashboard">
      <h1 className='greet'>Hello, { user }!</h1>
      <p className='body'>Here you can manage your quizzes and view your quiz results.</p>
      <h1 className='title'>Your Quizzes</h1>
      <div className='quizzes'>
        <Card className='quiz_card'>
          <CardContent>
            Add a new one
          </CardContent>
        </Card>
        <Button variant="outlined" onClick={() => navigate('/quiz/create')}>new quiz</Button>
      </div>
      <h1 className='title'>Suggested quizzes</h1>
      <div className='quizzes'>
        <Card className='quiz_card'>
          <CardContent>
            Suggestion
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
