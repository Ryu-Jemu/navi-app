import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FindPage from './pages/FindPage';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
import CalendarPage from './pages/CalendarPage';
import BoardPage from './pages/CommunityPage';
import AddPostPage from './pages/AddPostPage';
import OnboardingPage from './pages/OnboardingPage';

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
        <Route path="/community" element={<BoardPage />} />
        <Route path="/addpost" element={<AddPostPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
      </Routes>
    </Router>
  );
}

export default App;