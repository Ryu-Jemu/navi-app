import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import logoImage from '../assets/logo.png'

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="landing-container">
      <img src={logoImage} alt="Navi Logo" className="logo-image" />
      <h1 className="logo-text">Navi</h1>
      <p className="sub-text">Socyan</p>
    </div>
  );
};

export default LandingPage;