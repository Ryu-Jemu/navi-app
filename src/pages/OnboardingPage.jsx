import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import './OnboardingPage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    swipe: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: 'slick-dots custom-dots',
    afterChange: (index) => setCurrentSlide(index),
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        sliderRef.current?.slickNext();
      } else if (e.key === 'ArrowLeft') {
        sliderRef.current?.slickPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleStartClick = () => {
    navigate('/login');
  };

  return (
    <div className="onboarding-container">
      <Slider ref={sliderRef} {...settings}>
        <div className="slide">
          <div className="indicator-space"></div>
          <h2>필요한 일정</h2>
          <p>쉽게 일정 관리하세요.</p>
        </div>
        <div className="slide">
          <div className="indicator-space"></div>
          <h2>AI Chat봇</h2>
          <p>AI가 질문에 답변해줍니다.</p>
        </div>
        <div className="slide">
          <div className="indicator-space"></div>
          <h2>커뮤니티</h2>
          <p>학생들과 자유롭게 소통하세요.</p>
        </div>
      </Slider>

      {currentSlide === 2 && (
        <button className="start-button" onClick={handleStartClick}>
          시작하기
        </button>
      )}
    </div>
  );
};

export default OnboardingPage;