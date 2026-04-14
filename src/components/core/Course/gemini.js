// gemini.js - Dual API Race: Whichever responds fastest wins!
import { GoogleGenerativeAI } from "@google/generative-ai";

// ===== API Configuration =====
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

if (!GEMINI_API_KEY) {
  console.warn("⚠️ REACT_APP_GEMINI_API_KEY not configured.");
}
if (!GROQ_API_KEY) {
  console.warn("⚠️ REACT_APP_GROQ_API_KEY not configured.");
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

// ===== Gemini API Handler =====
async function callGeminiAPI(prompt) {
  try {
    if (!prompt || prompt.trim() === "") {
      throw new Error("Prompt cannot be empty");
    }
    if (!genAI) {
      throw new Error("Gemini API not configured");
    }

    console.log("🤖 [Gemini] Processing:", prompt.substring(0, 50) + "...");
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    if (!result || !result.response) {
      throw new Error("Invalid response from Gemini API");
    }

    const text = result.response.text();
    console.log("✅ [Gemini] Response received:", text.substring(0, 50) + "...");
    return { source: "Gemini", text };
  } catch (error) {
    console.error("❌ [Gemini] Error:", error.message);
    throw error;
  }
}

// ===== Groq API Handler =====
async function callGroqAPI(prompt) {
  try {
    if (!prompt || prompt.trim() === "") {
      throw new Error("Prompt cannot be empty");
    }
    if (!GROQ_API_KEY) {
      throw new Error("Groq API key not configured");
    }

    console.log("🚀 [Groq] Processing:", prompt.substring(0, 50) + "...");

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API Error: ${response.status} - ${errorData.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from Groq API");
    }

    const text = data.choices[0].message.content;
    console.log("✅ [Groq] Response received:", text.substring(0, 50) + "...");
    return { source: "Groq", text };
  } catch (error) {
    console.error("❌ [Groq] Error:", error.message);
    throw error;
  }
}

// ===== Main Export - RACE: Both APIs at once, fastest wins! =====
export async function generateGeminiResponse(prompt) {
  try {
    // Send requests to BOTH APIs simultaneously
    console.log("🏁 Racing both APIs...");
    console.log("📤 [Gemini] Starting...");
    console.log("📤 [Groq] Starting...");

    const geminiPromise = callGeminiAPI(prompt).catch(err => {
      console.warn("⚠️ Gemini failed, waiting for Groq...");
      return Promise.reject(err);
    });

    const groqPromise = callGroqAPI(prompt).catch(err => {
      console.warn("⚠️ Groq failed, waiting for Gemini...");
      return Promise.reject(err);
    });

    // Return whichever response comes first!
    try {
      const result = await Promise.race([geminiPromise, groqPromise]);
      console.log(`🏆 [${result.source}] Won the race!`);
      return result.text;
    } catch (firstError) {
      // If first one fails, try the other
      console.warn("⚠️ First API failed, trying fallback...");
      try {
        const result = await Promise.any([geminiPromise, groqPromise]);
        console.log(`🏆 [${result.source}] Fallback succeeded!`);
        return result.text;
      } catch (allError) {
        // Both failed
        console.error("❌ Both APIs failed!");
        throw new Error("Both Gemini and Groq APIs failed. Please check your API keys and internet connection.");
      }
    }
  } catch (error) {
    console.error("❌ Chatbot Error:", error.message);
    throw error;
  }
}



