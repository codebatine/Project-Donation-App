import React, { useState } from 'react';
import { askChatbot } from '../services/chatService';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = { sender: 'user', text: message };
      setChatHistory([...chatHistory, userMessage]);

      const botResponse = await askChatbot(message);
      const botMessage = { sender: 'bot', text: botResponse };
      setChatHistory((prev) => [...prev, botMessage]);

      setMessage('');
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === 'user' ? 'user-message' : 'bot-message'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
