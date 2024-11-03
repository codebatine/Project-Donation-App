import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { sender: 'User', text: userMessage }]);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', {
        message: userMessage,
      });
      const botReply = response.data.reply;
      setMessages((prev) => [...prev, { sender: 'Bot', text: botReply }]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'Bot', text: 'Sorry, there was an issue. Try again later.' },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Chat With AIssistant</h2>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={msg.sender === 'User' ? 'user-message' : 'bot-message'}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="chat-input-form"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about donations..."
          className="chat-input"
        />
        <button
          type="submit"
          className="chat-submit-button"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
