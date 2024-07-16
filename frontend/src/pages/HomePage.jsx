// src/HomePage.js
import React, { useContext, useEffect } from 'react';
import '../css/HomePage.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../App';


const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('AuthToken');
  const { user, setUser, setToken } = useContext(GlobalContext);
  return (
    <div className="homepage">
      <h1 className='title'>Welcome to Quizzer!</h1>
      <p className='body'>
        Quizzer is your ultimate destination for creating, managing, and taking quizzes effortlessly.
        Whether you're an educator looking to engage students, a company aiming to train employees, or just someone who loves a good quiz,
        Quizzer has you covered.
      </p>
      <div className='buttons'>
        <Button variant="contained" onClick={() => {
          user == null ?
            navigate('/signin') :
            navigate('/dashboard')
        }} >Get Started</Button>
        <Button variant="outlined" >Join a quiz</Button>
      </div>
    </div>
  );
};

export default HomePage;
