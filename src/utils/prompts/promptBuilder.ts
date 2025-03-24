/**
 * Builds a prompt for course generation
 * @param fileContent Content of the file to process
 * @returns A formatted prompt string
 */
export const buildCoursePrompt = (fileContent: string): string => {
  // Limit content length to avoid token limits, but keep a reasonable amount
  const truncatedContent = fileContent.substring(0, 6000);
  
  return `
    ### SYSTEM INSTRUCTIONS ###
    You are an expert curriculum designer with exceptional document parsing abilities. Your task is to transform the provided document content into a well-structured course with clear modules.
    You MUST follow these requirements:
    1. Carefully analyze the document content, even if it's encoded or in a special format
    2. Extract key concepts, topics, and learning points
    3. Create a logical course structure with 3-5 meaningful modules
    4. Each module MUST include title, content, learning objectives, and a quiz question
    5. Format all content in valid, parseable JSON exactly matching the structure below
    6. Do not include any text outside the JSON structure
    7. Ensure JSON is properly formatted and can be parsed with JSON.parse()

    ### OUTPUT FORMAT ###
    Your output MUST be a JSON object with this exact structure:
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
    
    ### DOCUMENT CONTENT ###
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
    ### SYSTEM INSTRUCTIONS ###
    You are an expert knowledge base creator with superior document parsing abilities. Your task is to transform the provided document content into a structured FAQ.
    You MUST follow these requirements:
    1. Carefully analyze the document content, even if it's encoded or in a special format
    2. Identify common questions that would be asked about this content
    3. Create 5-7 meaningful question and answer pairs
    4. Each FAQ item must include a clear question, comprehensive answer, and relevant tags
    5. Format all content in valid, parseable JSON exactly matching the structure below
    6. Do not include any text outside the JSON structure
    7. Ensure JSON is properly formatted and can be parsed with JSON.parse()

    ### OUTPUT FORMAT ###
    Your output MUST be a JSON object with this exact structure:
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
    
    ### DOCUMENT CONTENT ###
    ${truncatedContent}
  `;
};
