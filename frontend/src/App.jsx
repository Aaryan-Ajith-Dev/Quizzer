import { createContext, useEffect, useState, useContext } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/Signup'
import MakeQuiz from './pages/MakeQuiz'
import TakeQuiz from './pages/TakeQuiz'
import Analytics from './pages/Analytics'

const GlobalContext = createContext(null)

const fetchUserData = async (setUser, setToken) => {
  const AuthToken = localStorage.getItem('AuthToken');
  if (AuthToken) {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${AuthToken}`
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setToken(AuthToken);
        console.log(data);
      } else {
        console.log(data);
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
      setToken(null);
    }
  }
};

function App() {
  // add fetching from local storage and get api call in useEffect
  
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => { fetchUserData(setUser, setToken) }, []);

  
  return (
    <GlobalContext.Provider value={{ token, setToken, user, setUser }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/quiz/make' element={<MakeQuiz />} />
        <Route path='/quiz/take' element={<TakeQuiz />} />
        <Route path='/analyse/:id' element={<Analytics />} />
      </Routes>
      
    </GlobalContext.Provider>
  )
}

export { App, GlobalContext, fetchUserData }
