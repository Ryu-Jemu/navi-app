import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CalendarPage.css';
import BottomNav from '../BottomNav/BottomNav';
import ProfileIcon from '../assets/Profile.svg';
import ListIcon from '../assets/List.svg';
import PlusIcon from '../assets/Plus.svg';
import MoveLeftIcon from '../assets/MoveLeft.svg';
import MoveRightIcon from '../assets/MoveRight.svg';
import { fetchSchedules, createSchedule } from '../api/task';

const CalendarPage = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showListMenu, setShowListMenu] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [deadlineInput, setDeadlineInput] = useState('');
  const [tasks, setTasks] = useState({}); // { 'YYYY-MM-DD': [ { text, deadline } ] }

  const profileRef = useRef(null);
  const listRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (listRef.current && !listRef.current.contains(event.target)) {
        setShowListMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // fetchSchedules로 서버에서 일정 받아오기
    const loadTasks = async () => {
      try {
        const data = await fetchSchedules();
        const grouped = {};
        data.forEach(({ description, end_time }) => {
          const dateKey = end_time.split('T')[0];
          if (!grouped[dateKey]) grouped[dateKey] = [];
          grouped[dateKey].push({ text: description, deadline: dateKey });
        });
        setTasks(grouped);
      } catch (err) {
        console.error(err);
      }
    };

    loadTasks();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarCells.push(i);
  }

  const handleFilterClick = (filter) => {
    if (filter === 'Log-Out') {
      navigate('/login');
    }
    setShowProfileMenu(false);
    setShowListMenu(false);
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

  const handleAddTaskClick = () => {
    setShowAddTask(!showAddTask);
    setDeadlineInput(''); // 초기화
  };

  const handleSubmitTask = async () => {
    if (taskInput.trim() === '' || deadlineInput.trim() === '') {
      alert('Please enter both a task and a deadline.');
      return;
    }

    try {
      await createSchedule({
        title: 'default', // unused
        description: taskInput,
        start_time: deadlineInput,
        end_time: deadlineInput,
      });

      const key = deadlineInput;
      setTasks((prev) => ({
        ...prev,
        [key]: prev[key] ? [...prev[key], { text: taskInput, deadline: key }] : [{ text: taskInput, deadline: key }],
      }));

      setTaskInput('');
      setDeadlineInput('');
      setShowAddTask(false);
    } catch (err) {
      console.error(err);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <div className="profile-container" ref={profileRef}>
          <img src={ProfileIcon} alt="Profile" className="icon profile" onClick={() => setShowProfileMenu(!showProfileMenu)} />
          {showProfileMenu && (
            <div className="popup-logout left-align">
              <div className="popup-item" onClick={() => handleFilterClick('Log-Out')}>
                Log-Out
              </div>
            </div>
          )}
        </div>
        <div className="menu-container" ref={listRef}>
          <img src={ListIcon} alt="More" className="icon menu" onClick={() => setShowListMenu(!showListMenu)} />
          {showListMenu && (
            <div className="popup-menu right-align">
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
          <img src={MoveLeftIcon} alt="Previous Month" />
        </button>
        <div className="month-text">
          {currentYear}
          <br />
          <span>{monthNames[currentMonth]}</span>
        </div>
        <button onClick={handleNextMonth} className="arrow-button">
          <img src={MoveRightIcon} alt="Next Month" />
        </button>
      </div>

      <div className="weekday-row">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
          <div
            key={idx}
            className={`weekday ${
              day === 'Sun' ? 'sun' : day === 'Sat' ? 'sat' : ''
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarCells.map((day, i) => {
          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasTasks = tasks[dateKey] && tasks[dateKey].length > 0;
          return (
            <div
              key={i}
              className={`day-cell ${day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? 'today' : ''} ${selectedDate === day ? 'selected' : ''} ${day === null ? 'empty' : ''}`}
              onClick={() => day && setSelectedDate(day)}
            >
              {day || ''}
              {hasTasks && <span className="task-dot">●</span>}
            </div>
          );
        })}
      </div>

      <div className="today-section">
  <h3>
    {selectedDate
      ? `${currentYear}.${(currentMonth + 1).toString().padStart(2, '0')}.${selectedDate.toString().padStart(2, '0')}`
      : 'Select a date'}
  </h3>

  <div className="task-list">
    {selectedDate ? (
      tasks[`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`]?.map((task, idx) => (
        <div key={idx} className="task-card">
          📌 {task.text} <span style={{ fontSize: '12px', color: '#999' }}>(Deadline: {task.deadline})</span>
        </div>
      ))
    ) : (
      <div className="no-task">Please select a date to see tasks.</div>
    )}
  </div>

  <div className="plus-button-container">
    <img src={PlusIcon} alt="Add Task" className="plus-button" onClick={handleAddTaskClick} />
  </div>

  {showAddTask && (
    <div className="task-save-container">
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="task-input"
        />
        <input
          type="date"
          value={deadlineInput}
          onChange={(e) => setDeadlineInput(e.target.value)}
          className="date-input"
        />
      </div>
      <div className="save-section">
        <button onClick={handleSubmitTask} className="save-button">
          Save
        </button>
      </div>
    </div>
  )}
</div>
      <BottomNav />
    </div>
  );
};

export default CalendarPage;