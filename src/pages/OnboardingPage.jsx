import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingPage.css';

import CalendarImage from '../assets/Onboarding-Cal.svg';
import ChatbotImage from '../assets/Onboarding-Chat.svg';
import CommunityImage from '../assets/Onboarding-Com.svg';

const slides = [
  {
    title: 'Never miss a deadline',
    description: (
      <>
        Track visa renewals, school schedules,<br />
        and more — <br />
        all in one calendar, just for you.
      </>
    ),
    image: CalendarImage,
  },
  {
    title: 'AI Chatbot',
    description: (
      <>
        Confused about life in Korea?<br />
        Our smart chatbot gives real-time<br />
        answers in your language.
      </>
    ),
    image: ChatbotImage,
  },
  {
    title: 'Community',
    description: (
      <>
        Connect with other international students,<br />
        share tips, and find support<br />
        from your community.
      </>
    ),
    image: CommunityImage,
  },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="onboarding-container">

      <div className="dot-indicator">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      <div className="slide-content">
        <h2>{slides[currentIndex].title}</h2>
        <p>{slides[currentIndex].description}</p>
        <img src={slides[currentIndex].image} alt="slide" className="slide-image" />
      </div>

      <div
        className="button-group"
        style={{
          justifyContent: currentIndex === 0 ? 'center' : 'space-between',
        }}
      >
        {currentIndex > 0 && (
          <button className="obd-back-button" onClick={handleBack}>
            Back
          </button>
        )}

        {currentIndex < slides.length - 1 ? (
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="start-button" onClick={handleStart}>
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;