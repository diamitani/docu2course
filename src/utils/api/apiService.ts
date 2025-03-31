
import { callAiApi, ApiResponse } from './deepSeekClient';

interface ApiConfig {
  useSystemKey: boolean;
  apiKey?: string;
  apiType: 'openai' | 'deepseek';
}

/**
 * Get the API configuration from localStorage or use defaults
 */
export const getApiConfig = (): ApiConfig => {
  const useSystemKey = localStorage.getItem('use_system_key') === 'true';
  const apiKey = localStorage.getItem('ai_api_key') || undefined;
  const apiType = (localStorage.getItem('ai_api_type') || 'deepseek') as 'openai' | 'deepseek';
  
  return {
    useSystemKey,
    apiKey,
    apiType
  };
};

/**
 * Process a document using the configured AI service
 * @param content Document content to process
 * @param outputFormat Desired output format
 * @returns Processed document data
 */
export const processDocument = async (content: string, outputFormat: string = 'course'): Promise<any> => {
  try {
    // Build the prompt based on the desired output format
    let prompt = '';
    
    if (outputFormat === 'course') {
      prompt = `Create a comprehensive course from the following document. Organize it into modules and lessons. Include knowledge checks and activities. Document content: ${content}`;
    } else if (outputFormat === 'faq') {
      prompt = `Generate a comprehensive FAQ from the following document. Include at least 10 questions and detailed answers. Document content: ${content}`;
    } else {
      prompt = `Process the following document: ${content}`;
    }
    
    // Call the AI API
    const response = await callAiApi(prompt);
    
    // Parse the response
    if (response.choices && response.choices.length > 0) {
      const content = response.choices[0].message.content;
      try {
        // Try to parse as JSON
        return JSON.parse(content);
      } catch (error) {
        // If not JSON, return as is
        return { rawContent: content };
      }
    }
    
    throw new Error('No response from AI service');
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
};

export { callAiApi };
