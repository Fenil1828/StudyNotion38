// gemini.js - Uses backend Groq API only

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";

export async function generateGeminiResponse(prompt) {
  try {
    if (!prompt || prompt.trim() === "") {
      throw new Error("Prompt cannot be empty");
    }

    console.log("🚀 [Groq] Sending to backend...");

    const response = await fetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: prompt.trim() })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to get response");
    }

    console.log(`✅ [Groq] Response received`);
    return data.response;
  } catch (error) {
    console.error("❌ [Groq] Error:", error.message);
    throw error;
  }
}
