import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FindPage from './pages/FindPage';
import MainPage from './pages/MainPage';
import CalendarPage from './pages/CalendarPage';
import BoardPage from './pages/BoardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/find" element={<FindPage />} /> 
        <Route path="/main" element={<MainPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/board" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}

export default App;