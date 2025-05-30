import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendChatMessage } from '../api/chat';
import './ChatPage.css';
import LogoImage from '../assets/logo.svg';
import SearchIcon from '../assets/Search.svg';
import ProfileIcon from '../assets/Profile.svg';
import BottomNav from '../BottomNav/BottomNav';

const ChatPage = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '안녕하세요. 무엇을 도와드릴까요?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterClick = (filter) => {
    if (filter === 'Log-Out') {
      navigate('/login');
    }
    setShowProfileMenu(false);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const userMessage = { type: 'user', text: input, time: timeStr };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await sendChatMessage(input);
      const botReply = res.reply || '답변을 받아오지 못했습니다.';

      const botMessage = {
        type: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, {
        type: 'bot',
        text: '오류가 발생했습니다. 나중에 다시 시도해주세요.',
        time: timeStr,
      }]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-page">
      <header className="chat-header">
        <img src={LogoImage} alt="Logo" className="logo" />
        <div className="logo">Navi</div>
        <div className="header-icons">
          <img src={SearchIcon} alt="Search" className="search" />
          <div className="profile-container" ref={profileRef}>
            <img
              src={ProfileIcon}
              alt="Profile"
              className="icon profile"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="popup-logout">
                <div className="popup-item" onClick={() => handleFilterClick('Log-Out')}>
                  Log-Out
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-row ${msg.type}`}>
            {msg.type === 'user' && <div className="message-time">{msg.time}</div>}
            <div className={`message-bubble ${msg.type}`}>
              <div className="message-text">{msg.text}</div>
            </div>
            {msg.type === 'bot' && <div className="message-time">{msg.time}</div>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-section">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <BottomNav />
    </div>
  );
};

export default ChatPage;