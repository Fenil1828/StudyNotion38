// gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDUgQNU22tJ9wjZRKFuNWmOg1uek0mOMlw");
// AIzaSyCvS2kPyLYyKQYuhJalrpFZsJmJyldqcGo

export async function generateGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}



