
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
 * Makes a request to the DeepSeek API with improved error handling and retry logic
 * @param prompt The prompt to send to the API
 * @returns The API response
 */
export async function callAiApi(prompt: string): Promise<ApiResponse> {
  const apiKey = getApiKey();
  const MAX_RETRIES = 2;
  let retries = 0;
  
  // Truncate very long prompts to prevent API errors
  const maxPromptLength = 10000;
  const truncatedPrompt = prompt.length > maxPromptLength 
    ? prompt.substring(0, maxPromptLength) + "... [content truncated for API stability]" 
    : prompt;
  
  async function attemptRequest(): Promise<ApiResponse> {
    try {
      console.log(`Attempt ${retries + 1} to call DeepSeek API`);
      
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
              content: "You are an expert document parser and content structurer. Your output should be only valid JSON without any other text. Always ensure your response can be parsed with JSON.parse(). Create comprehensive educational content with multiple modules and detailed lessons. Use the following format for your response:\n\n{\n  \"title\": \"Course Title\",\n  \"description\": \"Course description\",\n  \"modules\": [\n    {\n      \"title\": \"Module Title\",\n      \"content\": \"Module content\",\n      \"objectives\": [\"objective 1\", \"objective 2\"],\n      \"quiz\": {\n        \"question\": \"Quiz question\",\n        \"options\": [\"option 1\", \"option 2\", \"option 3\", \"option 4\"],\n        \"answer\": 0\n      },\n      \"activities\": [\"activity 1\", \"activity 2\"],\n      \"resources\": [\"resource 1\", \"resource 2\"]\n    }\n  ]\n}"
            },
            {
              role: "user",
              content: truncatedPrompt
            }
          ],
          temperature: 0.1, // Lower temperature for more structured output
          max_tokens: 4000, // Reduced token limit to avoid API errors
          timeout: 60000 // 1 minute timeout
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`DeepSeek API Error: ${errorData.error?.message || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Attempt ${retries + 1} failed:`, error);
      if (retries < MAX_RETRIES) {
        retries++;
        // Exponential backoff: wait longer for each retry
        const delay = 1000 * Math.pow(2, retries);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return attemptRequest();
      }
      throw error;
    }
  }
  
  return attemptRequest();
}

export { callAiApi as callDeepSeekAPI };
