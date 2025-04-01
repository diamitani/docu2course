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
    You are an expert curriculum designer with exceptional educational expertise comparable to Ivy League professors. Your task is to transform the provided document content into a comprehensive, academically rigorous course with clear modules, chapters, and sections.
    
    You MUST follow these requirements:
    1. Analyze the document content deeply, extracting both explicit and implicit knowledge structures
    2. Create a pedagogically sound learning progression that builds from foundational to advanced concepts
    3. Design a COMPREHENSIVE course structure with EXACTLY 6-8 meaningful modules, each representing a distinct phase of learning
    4. Each module MUST include:
       - A descriptive title that clearly communicates the topic area
       - Detailed content in markdown format that is at least 3-4 well-structured paragraphs (500-800 words)
       - 4-6 specific, measurable learning objectives using Bloom's Taxonomy verbs
       - 2-3 quiz questions with multiple-choice options and detailed explanations for each answer
       - 3-4 practical activities or exercises that apply different learning modalities (visual, kinesthetic, collaborative, etc.)
       - At least 5 recommended resources for further study, including academic papers, books, videos, and online courses
    5. Format all content in valid, parseable JSON exactly matching the structure below
    6. Ensure content is academically rigorous and would pass scrutiny from subject matter experts
    7. Include real-world applications and case studies where appropriate
    8. Create content that progresses logically in complexity and builds on previously introduced concepts
    9. Integrate reflective prompts and critical thinking exercises throughout
    10. Make sure each module has at least 500-800 words of content with proper citations and references

    ### OUTPUT FORMAT ###
    Your output MUST be a JSON object with this exact structure:
    {
      "title": "Academic title that reflects the intellectual rigor of the course",
      "description": "Comprehensive overview of what the course covers, including its goals, target audience, prerequisites, and expected outcomes. This should be at least 200 words and showcase the academic value.",
      "learningPath": "Beginner|Intermediate|Advanced|Expert",
      "estimatedCompletionTime": "X hours/weeks",
      "modules": [
        {
          "title": "Module title (clear and descriptive)",
          "overview": "Brief overview of the module's focus and how it contributes to the overall course objectives",
          "content": "Detailed module content in markdown format covering key concepts thoroughly. This should be at least 500-800 words and include proper academic structure.",
          "objectives": ["specific learning objective 1 using Bloom's Taxonomy", "specific learning objective 2", "specific learning objective 3", "specific learning objective 4"],
          "quizzes": [
            {
              "question": "A thought-provoking question that tests conceptual understanding",
              "options": ["option 1", "option 2", "option 3", "option 4"],
              "answer": 0, // Index of the correct option (0-based)
              "explanation": "Detailed explanation of why this answer is correct and why others are incorrect"
            },
            {
              "question": "Another assessment question",
              "options": ["option 1", "option 2", "option 3", "option 4"],
              "answer": 0, 
              "explanation": "Detailed explanation"
            }
          ],
          "activities": [
            {
              "title": "Activity title",
              "description": "Detailed instructions for the activity",
              "type": "individual|group|project|reflection|case-study",
              "estimatedTime": "X minutes/hours"
            },
            {
              "title": "Activity title",
              "description": "Detailed instructions for the activity",
              "type": "individual|group|project|reflection|case-study",
              "estimatedTime": "X minutes/hours"
            }
          ],
          "resources": [
            {
              "title": "Resource title",
              "type": "book|article|video|course|website|tool",
              "link": "URL or citation",
              "description": "Brief description of the resource's value"
            }
          ]
        }
      ],
      "finalAssessment": {
        "description": "Overview of the final assessment or capstone project",
        "rubric": [
          {
            "criterion": "Assessment criterion",
            "description": "What is being evaluated",
            "weight": "Percentage of total grade"
          }
        ]
      },
      "certificateRequirements": "Requirements for course completion and certification"
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
    You are an expert curriculum designer with credentials equivalent to Harvard and Stanford faculty. Your task is to create a comprehensive, academically rigorous course based on the user's request.
    
    You MUST follow these requirements:
    1. Create a COMPREHENSIVE course structure with EXACTLY 6-8 meaningful modules based on the user's prompt
    2. Apply educational best practices including Bloom's Taxonomy, constructive alignment, and backward design
    3. Each module MUST include:
       - A descriptive title that clearly communicates the topic area
       - Detailed content in markdown format that is at least 3-4 well-structured paragraphs (500-800 words)
       - 4-6 specific, measurable learning objectives using appropriate pedagogical verbs
       - 2-3 quiz questions with multiple-choice options and detailed explanations for each answer
       - 3-4 practical activities or exercises that apply different learning modalities (visual, kinesthetic, collaborative, etc.)
       - At least 5 recommended resources for further study, including academic papers, books, videos, and online courses
    4. Format all content in valid, parseable JSON exactly matching the structure below
    5. Maintain the intellectual rigor of a graduate-level university course
    6. Create a cohesive learning progression that builds competency step by step
    7. Include pedagogically sound assessments that measure mastery of objectives
    8. Make sure each module has at least 500-800 words of content with proper citations and references
    9. Include case studies, examples, and real-world applications relevant to the subject matter
    10. Ensure content is suitable for professional or academic environments

    ### OUTPUT FORMAT ###
    Your output MUST be a JSON object with this exact structure:
    {
      "title": "${title || 'Course title based on prompt (make it academically rigorous)'}",
      "description": "Comprehensive overview of what the course covers, including its goals, target audience, prerequisites, and expected outcomes. This should be at least 200 words and showcase the academic value.",
      "learningPath": "Beginner|Intermediate|Advanced|Expert",
      "estimatedCompletionTime": "X hours/weeks",
      "modules": [
        {
          "title": "Module title (clear and descriptive)",
          "overview": "Brief overview of the module's focus and how it contributes to the overall course objectives",
          "content": "Detailed module content in markdown format covering key concepts thoroughly. This should be at least 500-800 words and include proper academic structure.",
          "objectives": ["specific learning objective 1 using Bloom's Taxonomy", "specific learning objective 2", "specific learning objective 3", "specific learning objective 4"],
          "quizzes": [
            {
              "question": "A thought-provoking question that tests conceptual understanding",
              "options": ["option 1", "option 2", "option 3", "option 4"],
              "answer": 0, // Index of the correct option (0-based)
              "explanation": "Detailed explanation of why this answer is correct and why others are incorrect"
            },
            {
              "question": "Another assessment question",
              "options": ["option 1", "option 2", "option 3", "option 4"],
              "answer": 0, 
              "explanation": "Detailed explanation"
            }
          ],
          "activities": [
            {
              "title": "Activity title",
              "description": "Detailed instructions for the activity",
              "type": "individual|group|project|reflection|case-study",
              "estimatedTime": "X minutes/hours"
            },
            {
              "title": "Activity title",
              "description": "Detailed instructions for the activity",
              "type": "individual|group|project|reflection|case-study",
              "estimatedTime": "X minutes/hours"
            }
          ],
          "resources": [
            {
              "title": "Resource title",
              "type": "book|article|video|course|website|tool",
              "link": "URL or citation",
              "description": "Brief description of the resource's value"
            }
          ]
        }
      ],
      "finalAssessment": {
        "description": "Overview of the final assessment or capstone project",
        "rubric": [
          {
            "criterion": "Assessment criterion",
            "description": "What is being evaluated",
            "weight": "Percentage of total grade"
          }
        ]
      },
      "certificateRequirements": "Requirements for course completion and certification"
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
