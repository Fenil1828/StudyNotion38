// services/groqService.js - Groq API Integration
const axios = require('axios');
const aiConfig = require('../config/aiConfig');

const { groq, request } = aiConfig;

async function callGroqAPI(prompt, retryCount = 0) {
  try {
    if (!prompt || prompt.trim() === '') {
      throw new Error('Prompt cannot be empty');
    }

    if (!groq.apiKey) {
      throw new Error('GROQ_API_KEY not configured');
    }

    console.log(`🚀 [Groq] Attempt ${retryCount + 1}/${groq.maxRetries + 1}...`);

    const response = await axios.post(
      `${groq.baseUrl}/chat/completions`,
      {
        model: groq.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: request.maxTokens,
        temperature: request.temperature
      },
      {
        timeout: groq.timeout,
        headers: {
          'Authorization': `Bearer ${groq.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.choices || response.data.choices.length === 0) {
      throw new Error('No response from Groq API');
    }

    const aiResponse = response.data.choices[0].message.content;

    console.log(`✅ [Groq] Success`);

    return {
      source: 'Groq',
      response: aiResponse,
      model: groq.model,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`❌ [Groq] Error (Attempt ${retryCount + 1}):`, error.message);

    if (retryCount < groq.maxRetries) {
      console.log(`🔄 [Groq] Retrying...`);
      return callGroqAPI(prompt, retryCount + 1);
    }

    throw error;
  }
}

module.exports = callGroqAPI;
