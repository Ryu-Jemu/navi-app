import React, { useState } from 'react';
import './CalendarPage.css';
import BottomNav from '../BottomNav/BottomNav';
import ProfileIcon from '../assets/Profile_Icon.png';
import ListIcon from '../assets/List_Icon.png';
import PlusIcon from '../assets/Plus_Icon.png';
import MoveLeftIcon from '../assets/MoveLeft_Icon.png'
import MoveRightIcon from '../assets/MoveRight_Icon.png'

const CalendarPage = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  // eslint-disable-next-line
  const [selectedFilter, setSelectedFilter] = useState(null);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarCells.push(i);
  }

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleFilterClick = (filter) => {
    alert(`Selected: ${filter}`);
    setSelectedFilter(filter);
    setShowMenu(false);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <img src={ProfileIcon} alt="Profile" className="icon profile" />
        <div className="menu-container">
          <img src={ListIcon} alt="More" className="icon menu" onClick={toggleMenu} />
          {showMenu && (
            <div className="popup-menu">
              <div className="popup-item" onClick={() => handleFilterClick('VISA')}>
                VISA
              </div>
              <div className="popup-item" onClick={() => handleFilterClick('USIM')}>
                USIM
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="month-navigation">
        <button onClick={handlePrevMonth} className="arrow-button">
          <img src={MoveLeftIcon} alt="PreMonth" />
        </button>
        <div className="month-text">
          {currentYear}
          <br />
          <span>{monthNames[currentMonth]}</span>
        </div>
        <button onClick={handleNextMonth} className="arrow-button">
        <img src={MoveRightIcon} alt="NextMonth" />
        </button>
      </div>

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
              ${day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear()
                ? 'today'
                : ''}
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
            ? `${currentYear}.${(currentMonth + 1).toString().padStart(2, '0')}.${selectedDate.toString().padStart(2, '0')}`
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
        <div className="plus-button-container">
          <img src={PlusIcon} alt="Add Task" className="plus-button" />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default CalendarPage;