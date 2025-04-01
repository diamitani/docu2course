
// Use a pre-configured API key instead of requiring user input
const getApiKey = (): string => {
  return "sk-d71e5cdc2e1a48928843fcd74fd146b1"; // Using the demo key directly
};

export interface ApiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Makes a request to the DeepSeek API
 * @param prompt The prompt to send to the API
 * @returns The API response
 */
export async function callAiApi(prompt: string): Promise<ApiResponse> {
  const apiKey = getApiKey();
  
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat", // Using the standard deepseek chat model
        messages: [
          {
            role: "system",
            content: "You are an expert document parser and content structurer. Your output should be only valid JSON without any other text. Always ensure your response can be parsed with JSON.parse(). Create comprehensive educational content with multiple modules and detailed lessons."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.1, // Lower temperature for more structured output
        max_tokens: 4000 // Reduced token limit to avoid API errors
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`DeepSeek API Error: ${errorData.error?.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    throw error;
  }
}

export { callAiApi as callDeepSeekAPI };
