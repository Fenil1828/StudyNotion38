// services/aiRaceService.js - Groq API Handler (Simplified)
const callGroqAPI = require('./groqService');

async function raceAI(prompt) {
  try {
    if (!prompt || prompt.trim() === '') {
      throw new Error('Prompt cannot be empty');
    }

    console.log(`🚀 [Groq] Processing request...`);

    const result = await callGroqAPI(prompt);
    console.log(`✅ [Groq] Success!`);
    return result;
  } catch (error) {
    console.error('❌ [Groq] Error:', error.message);
    throw error;
  }
}

module.exports = { raceAI };
