// routes/Chat.js
const express = require('express');
const { body } = require('express-validator');
const { postChat } = require('../controllers/chatController');

const router = express.Router();

router.post(
  '/',
  [
    body('prompt')
      .trim()
      .notEmpty().withMessage('Prompt is required')
      .isLength({ min: 1 }).withMessage('Prompt must not be empty')
      .isLength({ max: 5000 }).withMessage('Prompt cannot exceed 5000 characters')
  ],
  postChat
);

module.exports = router;
