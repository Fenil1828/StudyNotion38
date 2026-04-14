// src/services/operations/chatAPI.js
// Chatbot API - Uses backend Groq API (Gemini removed)
import { apiConnector } from "../apiConnector";
import { chatEndpoints } from "../apis";

const { CHAT_API } = chatEndpoints;

/**
 * Send prompt to backend AI chatbot (Groq API)
 * @param {string} prompt - User's message
 * @returns {Promise<string>} - AI response
 */
export const sendChatMessage = async (prompt) => {
  try {
    if (!prompt || prompt.trim() === "") {
      throw new Error("Prompt cannot be empty");
    }

    console.log("📨 Sending message to Groq API via backend...", prompt.substring(0, 30) + "...");

    const response = await apiConnector("POST", CHAT_API, {
      prompt: prompt.trim(),
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to get AI response");
    }

    console.log(`✅ Response from ${response.data.source}: ${response.data.response.substring(0, 50)}...`);

    return response.data.response;
  } catch (error) {
    console.error("❌ Chat Error:", error.message);
    throw new Error(`Chat Error: ${error.message}`);
  }
};
