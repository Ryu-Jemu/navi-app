import React, { useState, useRef, useEffect } from 'react';
import './ChatPage.css';
import LogoImage from '../assets/logo.png';
import SearchIcon from '../assets/Search_Icon.png';
import ProfileIcon from '../assets/Profile_Icon.png';


const ChatPage = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: '안녕하세요. 무엇을 도와드릴까요?', time: '16:01' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() !== '') {
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      setMessages([...messages, { type: 'user', text: input, time: timeStr }]);
      setInput('');
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
          <img src={ProfileIcon} alt="Profile" className="profile" />
        </div>
      </header>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.type}`}>
            {msg.type === 'user' && (
                <div className="message-time">{msg.time}</div>
            )}
            <div className={`message-bubble ${msg.type}`}>
                <div className="message-text">{msg.text}</div>
            </div>
            {msg.type === 'bot' && (
                <div className="message-time">{msg.time}</div>
            )}
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
    </div>
  );
};

export default ChatPage;