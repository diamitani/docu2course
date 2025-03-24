
// The API key is hardcoded here for demonstration purposes only
// In a production environment, this should be stored securely on the server side
const DEEPSEEK_API_KEY = "sk-d71e5cdc2e1a48928843fcd74fd146b1";

export interface DeepSeekResponse {
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
export async function callDeepSeekAPI(prompt: string): Promise<DeepSeekResponse> {
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5, // Lower temperature for more structured output
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`DeepSeek API Error: ${errorData.error?.message || response.statusText}`);
  }

  return await response.json();
}
