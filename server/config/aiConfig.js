// config/aiConfig.js - AI API Configuration (Groq Only)
require('dotenv').config();

const aiConfig = {
  // Groq Configuration - Fast and reliable
  groq: {
    apiKey: process.env.GROQ_API_KEY,
    model: 'llama-3.3-70b-versatile',
    baseUrl: 'https://api.groq.com/openai/v1',
    timeout: 15000,
    maxRetries: 2
  },

  // Request Configuration
  request: {
    maxTokens: 1024,
    temperature: 0.7
  }
};

module.exports = aiConfig;