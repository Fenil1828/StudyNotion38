import React from 'react'
import ChatbotIcon from './ChatbotIcon'

// Show icon and background for bot/model only
const ChatMessage = ({ chat }) => (
  <div className={`message ${chat.role === 'model' ? 'bot-message' : 'user-message'}`}>
    {chat.role === 'model' && <ChatbotIcon />}
    <p className='message-text'>{chat.text}</p>
  </div>
)

export default ChatMessage
