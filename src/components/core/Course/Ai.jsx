import React, { useEffect, useRef, useState } from 'react';
import ChatbotIcon from './ChatbotIcon';
import "./Ai.css";
import ChatMessage from './ChatMessage';
import { generateGeminiResponse } from "./gemini"; // Your utility

const Ai = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const inputRef = useRef();
  const chatBodyRef = useRef();

  // Updated toggle handler with mobile hide functionality
  const handleToggle = () => {
    setIsOpen(open => {
      const next = !open;
      
      // Hide toggle button on mobile when chatbot opens
      if (window.matchMedia("(max-width: 480px)").matches) {
        const toggler = document.getElementById("chatbot-toggler");
        toggler?.classList.toggle("is-hidden", next);
      }
      
      return next;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";
    setChatHistory(history => [
      ...history,
      { role: 'user', text: userMessage },
      { role: 'model', text: 'Thinking...' }
    ]);

    try {
      const aiText = await generateGeminiResponse(userMessage);
      setChatHistory(history => [
        ...history.slice(0, -1),
        { role: "model", text: aiText }
      ]);
    } catch (error) {
      setChatHistory(history => [
        ...history.slice(0, -1),
        { role: "model", text: "Sorry, an error occurred!" }
      ]);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatHistory]);

  return (
    <div className="container">
      <button
        id="chatbot-toggler"
        onClick={handleToggle}
      >
        <span className="material-symbols-outlined">
          {isOpen ? 'close' : 'mode_comment'}
        </span>
      </button>

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className='logo-text'>Chatbot</h2>
            </div>
            <button 
              className="material-symbols-outlined"
              onClick={handleToggle}
            >
              keyboard_arrow_down
            </button>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            <div className="message bot-message">
              <ChatbotIcon />
              <p className='message-text'>
                Hey there! <br /> How can I help you today?
              </p>
            </div>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>
          <div className="chat-footer">
            <form className="chat-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder='Messages...'
                ref={inputRef}
                className="message-input"
                required
              />
              <button className="material-symbols-outlined" type="submit">arrow_upward</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ai;
