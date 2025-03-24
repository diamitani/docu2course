
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
    You are an expert curriculum designer with exceptional document parsing abilities. Your task is to transform the provided document content into a comprehensive, well-structured course with clear modules, chapters, and sections.
    You MUST follow these requirements:
    1. Carefully analyze the document content, even if it's encoded or in a special format
    2. Extract key concepts, topics, and learning points to create a logical learning progression
    3. Create a COMPREHENSIVE course structure with EXACTLY 5-7 meaningful modules
    4. Each module MUST include:
       - A descriptive title
       - Detailed content in markdown format that is at least 2-3 paragraphs long
       - 3-5 specific learning objectives
       - A quiz question with multiple-choice options
       - At least two practical activities or exercises
       - Recommended resources for further study
    5. Format all content in valid, parseable JSON exactly matching the structure below
    6. Do not include any text outside the JSON structure
    7. Ensure JSON is properly formatted and can be parsed with JSON.parse()
    8. Create a cohesive course that flows logically from basic to advanced concepts
    9. Aim for educational depth rather than breadth - provide substantial content for each topic
    10. Make sure each module has at least 250-300 words of content

    ### OUTPUT FORMAT ###
    Your output MUST be a JSON object with this exact structure:
    {
      "title": "Course title based on content",
      "description": "Comprehensive overview of what the course covers, including its goals and target audience",
      "modules": [
        {
          "title": "Module title",
          "content": "Detailed module content in markdown format covering key concepts thoroughly. This should be at least 2-3 paragraphs and contain 250-300 words minimum.",
          "objectives": ["specific learning objective 1", "specific learning objective 2", "specific learning objective 3"],
          "quiz": {
            "question": "A thought-provoking question that tests understanding of this module",
            "options": ["option 1", "option 2", "option 3", "option 4"],
            "answer": 0 // Index of the correct option (0-based)
          },
          "activities": ["Practical activity or exercise 1", "Practical activity or exercise 2"],
          "resources": ["Recommended resource 1", "Recommended resource 2"]
        }
      ]
    }
    
    ### DOCUMENT CONTENT ###
    ${truncatedContent}
  `;
};

/**
 * Builds a prompt for course generation based on user input
 * @param title The course title
 * @param promptText The user's prompt text
 * @returns A formatted prompt string
 */
export const buildPromptBasedCoursePrompt = (title: string, promptText: string): string => {
  return `
    ### SYSTEM INSTRUCTIONS ###
    You are an expert curriculum designer. Your task is to create a comprehensive, well-structured course based on the user's request.
    You MUST follow these requirements:
    1. Create a COMPREHENSIVE course structure with EXACTLY 5-7 meaningful modules based on the user's prompt
    2. Each module MUST include:
       - A descriptive title
       - Detailed content in markdown format that is at least 2-3 paragraphs long
       - 3-5 specific learning objectives
       - A quiz question with multiple-choice options
       - At least two practical activities or exercises
       - Recommended resources for further study
    3. Format all content in valid, parseable JSON exactly matching the structure below
    4. Do not include any text outside the JSON structure
    5. Ensure JSON is properly formatted and can be parsed with JSON.parse()
    6. Create a cohesive course that flows logically from basic to advanced concepts
    7. Aim for educational depth rather than breadth - provide substantial content for each topic
    8. Make sure each module has at least 250-300 words of content

    ### OUTPUT FORMAT ###
    Your output MUST be a JSON object with this exact structure:
    {
      "title": "${title || 'Course title based on prompt'}",
      "description": "Comprehensive overview of what the course covers, including its goals and target audience",
      "modules": [
        {
          "title": "Module title",
          "content": "Detailed module content in markdown format covering key concepts thoroughly. This should be at least 2-3 paragraphs and contain 250-300 words minimum.",
          "objectives": ["specific learning objective 1", "specific learning objective 2", "specific learning objective 3"],
          "quiz": {
            "question": "A thought-provoking question that tests understanding of this module",
            "options": ["option 1", "option 2", "option 3", "option 4"],
            "answer": 0 // Index of the correct option (0-based)
          },
          "activities": ["Practical activity or exercise 1", "Practical activity or exercise 2"],
          "resources": ["Recommended resource 1", "Recommended resource 2"]
        }
      ]
    }
    
    ### USER REQUEST ###
    ${promptText}
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
    3. Create 10-15 meaningful question and answer pairs, covering different aspects of the content
    4. Each FAQ item must include a clear question, comprehensive answer (at least 100 words), and relevant tags
    5. Format all content in valid, parseable JSON exactly matching the structure below
    6. Do not include any text outside the JSON structure
    7. Ensure JSON is properly formatted and can be parsed with JSON.parse()
    8. Make answers detailed and actionable, providing specific guidance where applicable

    ### OUTPUT FORMAT ###
    Your output MUST be a JSON object with this exact structure:
    {
      "title": "FAQ title based on content",
      "description": "Comprehensive overview of what this FAQ covers",
      "questions": [
        {
          "question": "A frequently asked question from the document",
          "answer": "Detailed answer to the question with specific guidance. This should be at least 100 words and provide thorough information.",
          "tags": ["relevant", "tag", "keywords"]
        }
      ]
    }
    
    ### DOCUMENT CONTENT ###
    ${truncatedContent}
  `;
};
