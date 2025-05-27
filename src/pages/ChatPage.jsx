import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../api/chat';
import './ChatPage.css';
import LogoImage from '../assets/logo.png';
import SearchIcon from '../assets/Search_Icon.png';
import ProfileIcon from '../assets/Profile_Icon.png';


const ChatPage = () => {
  const [messages, setMessages] = useState([
      // 시간, 언어 설정
    {
      type: 'bot',
      text: '안녕하세요. 무엇을 도와드릴까요?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const userMessage = { type: 'user', text: input, time: timeStr };
    // 이전 메시지 배열에서 새로운 메시지 추가, 가장 최신의 상태를 보장
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await sendChatMessage(input); // API 요청
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