import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/Signup'
import MakeQuiz from './pages/MakeQuiz'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/quiz/create' element={ <MakeQuiz />} />
      </Routes>
    </>
  )
}

export default App
