
// The API key is retrieved from localStorage for better security
const getApiKey = (): string => {
  return localStorage.getItem('ai_api_key') || "sk-d71e5cdc2e1a48928843fcd74fd146b1"; // Fallback to demo key
};

const getApiType = (): string => {
  return localStorage.getItem('ai_api_type') || "deepseek"; // Default to deepseek
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
 * Makes a request to the AI API based on the selected provider
 * @param prompt The prompt to send to the API
 * @returns The API response
 */
export async function callAiApi(prompt: string): Promise<ApiResponse> {
  const apiType = getApiType();
  const apiKey = getApiKey();
  
  if (apiType === 'openai') {
    return callOpenAiAPI(prompt, apiKey);
  } else {
    return callDeepSeekAPI(prompt, apiKey);
  }
}

/**
 * Makes a request to the DeepSeek API
 * @param prompt The prompt to send to the API
 * @param apiKey The API key to use
 * @returns The API response
 */
async function callDeepSeekAPI(prompt: string, apiKey: string): Promise<ApiResponse> {
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-reasoner-32k", // Using the most capable reasoning model for better structure
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
        max_tokens: 8000 // Increased token limit for more comprehensive content
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

/**
 * Makes a request to the OpenAI API
 * @param prompt The prompt to send to the API
 * @param apiKey The API key to use
 * @returns The API response
 */
async function callOpenAiAPI(prompt: string, apiKey: string): Promise<ApiResponse> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo", // Using the most capable OpenAI model
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
        max_tokens: 8000 // Increased token limit for more comprehensive content
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API Error: ${errorData.error?.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}

export { callDeepSeekAPI, callOpenAiAPI };
