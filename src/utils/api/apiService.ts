
import { callAiApi, ApiResponse } from './deepSeekClient';

/**
 * Process a document using the DeepSeek AI service
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
    
    // Call the DeepSeek API
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
