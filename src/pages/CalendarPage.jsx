import React, { useState } from 'react';
import './CalendarPage.css';
import BottomNav from '../BottomNav/BottomNav';
import ProfileIcon from '../assets/Profile_Icon.png';
import MoreIcon from '../assets/More_Icon.png';
import PlusIcon from '../assets/Plus_Icon.png';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null); // 'VISA' or 'USIM'

  const year = 2025;
  const month = 4; // 5월 (주의: 0부터 시작)
  const today = new Date();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarCells.push(i);
  }

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleFilterClick = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter(null); // 같은 걸 누르면 해제
    } else {
      setSelectedFilter(filter);
    }
  };

  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <img src={ProfileIcon} alt="Profile" className="icon profile" />
        <div className="month-text">
          {year}
          <br />
          <span>MAY</span>
        </div>
        <div className="menu-container">
          <img
            src={MoreIcon}
            alt="More"
            className="icon menu"
            onClick={toggleMenu}
          />
          {showMenu && (
            <div className="dropdown-menu">
              <div
                className={`dropdown-item ${selectedFilter === 'VISA' ? 'active' : ''}`}
                onClick={() => handleFilterClick('VISA')}
              >
                VISA
              </div>
              <div
                className={`dropdown-item ${selectedFilter === 'USIM' ? 'active' : ''}`}
                onClick={() => handleFilterClick('USIM')}
              >
                USIM
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="weekday-row">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
          <div key={idx} className={`weekday ${day.toLowerCase()}`}>{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarCells.map((day, i) => (
          <div
            key={i}
            className={`day-cell
              ${day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? 'today' : ''}
              ${selectedDate === day ? 'selected' : ''}
              ${day === null ? 'empty' : ''}
            `}
            onClick={() => day && setSelectedDate(day)}
          >
            {day || ''}
          </div>
        ))}
      </div>

      <div className="today-section">
        <h3>
          {selectedDate
            ? `${year}.05.${selectedDate < 10 ? '0' : ''}${selectedDate}`
            : 'Select a date'}
        </h3>
        <div className="task-list">
          {selectedDate ? (
            <>
              <div className="task-card">
                <span role="img" aria-label="task">📄</span> Task for {selectedDate}
              </div>
              <div className="task-card urgent">
                <span role="img" aria-label="urgent">📌</span> Urgent task for {selectedDate}
              </div>
            </>
          ) : (
            <div className="no-task">Please select a date to see tasks.</div>
          )}
        </div>
        <img src={PlusIcon} alt="Add Task" className="plus-button" />
      </div>

      <BottomNav />
    </div>
  );
};

export default CalendarPage;