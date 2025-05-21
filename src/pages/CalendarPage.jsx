import React from 'react';
import './CalendarPage.css';
import BottomNav from '../BottomNav/BottomNav';
import ProfileIcon from '../assets/Profile_Icon.png';
import MoreIcon from '../assets/More_Icon.png';
import PlusIcon from '../assets/Plus_Icon.png';

const CalendarPage = () => {
  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <img src={ProfileIcon} alt="Profile" className="icon profile" />
        <div className="month-text">2025<br /><span>MAY</span></div>
        <img src={MoreIcon} alt="More" className="icon menu" />
      </header>

      <div className="weekday-row">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
          <div key={idx} className={`weekday ${day.toLowerCase()}`}>{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {[...Array(31)].map((_, i) => (
          <div key={i} className={`day-cell ${i === 13 ? 'today' : ''}`}>
            {i + 1}
          </div>
        ))}
      </div>

      <div className="today-section">
        <h3>Today</h3>
        <div className="task-list">
          <div className="task-card">
            <span role="img" aria-label="assignment">📄</span> Assignment_06
          </div>
          <div className="task-card urgent">
            <span role="img" aria-label="visa">📌</span> Visa renewal
          </div>
        </div>
        <img src={PlusIcon} alt="Add Task" className="plus-button" />
      </div>

      <BottomNav />
    </div>
  );
};

export default CalendarPage;