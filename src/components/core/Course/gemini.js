// gemini.js
REACT_APP_GEMINI_API_KEY = AIzaSyCvS2kPyLYyKQYuhJalrpFZsJmJyldqcGo;
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export async function generateGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

