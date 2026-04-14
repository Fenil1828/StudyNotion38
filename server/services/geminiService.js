// services/geminiService.js - Google Gemini API Integration
const axios = require('axios');
const aiConfig = require('../config/aiConfig');

const { gemini } = aiConfig;

async function callGeminiAPI(prompt, retryCount = 0) {
  try {
    if (!prompt || prompt.trim() === '') {
      throw new Error('Prompt cannot be empty');
    }

    if (!gemini.apiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    console.log(`🤖 [Gemini] Attempt ${retryCount + 1}/${gemini.maxRetries + 1}...`);

    const url = `${gemini.baseUrl}/${gemini.model}:generateContent?key=${gemini.apiKey}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        timeout: gemini.timeout,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.candidates || response.data.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }

    const aiResponse = response.data.candidates[0].content.parts[0].text;

    console.log(`✅ [Gemini] Success`);

    return {
      source: 'Gemini',
      response: aiResponse,
      model: gemini.model,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`❌ [Gemini] Error (Attempt ${retryCount + 1}):`, error.message);

    if (retryCount < gemini.maxRetries) {
      console.log(`🔄 [Gemini] Retrying...`);
      return callGeminiAPI(prompt, retryCount + 1);
    }

    throw error;
  }
}

module.exports = callGeminiAPI;
