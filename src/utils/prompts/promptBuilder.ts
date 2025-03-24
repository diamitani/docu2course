
/**
 * Builds a prompt for course generation
 * @param fileContent Content of the file to process
 * @returns A formatted prompt string
 */
export const buildCoursePrompt = (fileContent: string): string => {
  // Limit content length to avoid token limits, but keep a reasonable amount
  const truncatedContent = fileContent.substring(0, 6000);
  
  return `
    You are an expert curriculum designer. Transform this document content into a structured course with modules.
    Even if the document is encoded or in a special format, try to extract the key concepts and create a meaningful course.
    
    The response should be in VALID JSON format with the following structure:
    {
      "title": "Course title based on content",
      "description": "Brief overview of what the course covers",
      "modules": [
        {
          "title": "Module title",
          "content": "Module content in markdown format",
          "objectives": ["learning objective 1", "learning objective 2", "learning objective 3"],
          "quiz": {
            "question": "A question that tests understanding of this module",
            "options": ["option 1", "option 2", "option 3", "option 4"],
            "answer": 0 // Index of the correct option (0-based)
          }
        }
      ]
    }
    
    Extract 3-5 meaningful modules from the document.
    IMPORTANT: Your entire response must be VALID JSON that can be parsed with JSON.parse().
    Do not include any explanatory text before or after the JSON, just return the JSON object.
    
    Document content:
    ${truncatedContent}
  `;
};

/**
 * Builds a prompt for FAQ generation
 * @param fileContent Content of the file to process
 * @returns A formatted prompt string
 */
export const buildFAQPrompt = (fileContent: string): string => {
  // Limit content length to avoid token limits, but keep a reasonable amount
  const truncatedContent = fileContent.substring(0, 6000);
  
  return `
    You are an expert knowledge base creator. Transform this document content into a structured FAQ.
    Even if the document is encoded or in a special format, try to extract the key concepts and create meaningful questions and answers.
    
    The response should be in VALID JSON format with the following structure:
    {
      "title": "FAQ title based on content",
      "description": "Brief overview of what this FAQ covers",
      "questions": [
        {
          "question": "A frequently asked question from the document",
          "answer": "Detailed answer to the question",
          "tags": ["relevant", "tag", "keywords"]
        }
      ]
    }
    
    Extract 5-7 meaningful questions and answers from the document.
    IMPORTANT: Your entire response must be VALID JSON that can be parsed with JSON.parse().
    Do not include any explanatory text before or after the JSON, just return the JSON object.
    
    Document content:
    ${truncatedContent}
  `;
};
