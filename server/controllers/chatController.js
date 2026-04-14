// controllers/chatController.js
const { raceAI } = require('../services/aiRaceService');
const { validationResult } = require('express-validator');

const postChat = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { prompt } = req.body;

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required and cannot be empty'
      });
    }

    console.log(`📨 [Chat] Received prompt: "${prompt.substring(0, 50)}..."`);

    const aiResponse = await raceAI(prompt);

    console.log(`✅ [Chat] Response sent from ${aiResponse.source}`);

    return res.status(200).json({
      success: true,
      source: aiResponse.source,
      model: aiResponse.model,
      response: aiResponse.response,
      timestamp: aiResponse.timestamp
    });
  } catch (error) {
    console.error('❌ [Chat] Error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to get AI response',
      error: error.message
    });
  }
};

module.exports = { postChat };
