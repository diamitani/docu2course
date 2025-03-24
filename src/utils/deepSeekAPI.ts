
import { CourseType, FAQType } from './processingUtils';
import { toast } from "sonner";

// The API key is hardcoded here for demonstration purposes only
// In a production environment, this should be stored securely on the server side
const DEEPSEEK_API_KEY = "sk-d71e5cdc2e1a48928843fcd74fd146b1";

interface DeepSeekResponse {
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

// Helper function to safely parse JSON with error handling
const safeJSONParse = (text: string): any => {
  try {
    // First try to parse the text directly
    return JSON.parse(text);
  } catch (e) {
    console.log("Initial JSON parse failed, attempting to extract JSON");
    
    // If direct parsing fails, try to find JSON within the text
    // This handles cases where the API returns explanatory text with JSON inside
    try {
      const jsonRegex = /{[\s\S]*}/; // Match anything that looks like a JSON object
      const match = text.match(jsonRegex);
      if (match && match[0]) {
        return JSON.parse(match[0]);
      }
    } catch (innerError) {
      console.log("Could not extract JSON from text");
    }
    
    // If we still can't parse it, create a fallback structure
    return null;
  }
};

export const generateCourseFromDocument = async (fileContent: string): Promise<CourseType> => {
  try {
    const prompt = `
      You are an expert curriculum designer. Transform this document content into a structured course with modules.
      The response should be in JSON format with the following structure:
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
      IMPORTANT: Your entire response must be valid JSON that can be parsed with JSON.parse().
      
      Document content:
      ${fileContent.substring(0, 8000)} // Limit content length to avoid token limits
    `;

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
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`DeepSeek API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data: DeepSeekResponse = await response.json();
    const content = data.choices[0].message.content;
    
    const courseData = safeJSONParse(content);
    
    if (!courseData) {
      // If we couldn't parse JSON, create a fallback course with the API response
      console.error("Could not parse course JSON:", content);
      return createFallbackCourse("Couldn't parse API response into a course structure", content);
    }
    
    return courseData;
  } catch (error) {
    console.error("Error generating course:", error);
    toast.error("Failed to generate course. Please try again.");
    
    // Return a fallback course structure
    return createFallbackCourse("Error Processing Document", error instanceof Error ? error.message : "Unknown error");
  }
};

export const generateFAQFromDocument = async (fileContent: string): Promise<FAQType> => {
  try {
    const prompt = `
      You are an expert knowledge base creator. Transform this document content into a structured FAQ.
      The response should be in JSON format with the following structure:
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
      IMPORTANT: Your entire response must be valid JSON that can be parsed with JSON.parse().
      
      Document content:
      ${fileContent.substring(0, 8000)} // Limit content length to avoid token limits
    `;

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
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`DeepSeek API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data: DeepSeekResponse = await response.json();
    const content = data.choices[0].message.content;
    
    const faqData = safeJSONParse(content);
    
    if (!faqData) {
      // If we couldn't parse JSON, create a fallback FAQ with the API response
      console.error("Could not parse FAQ JSON:", content);
      return createFallbackFAQ("Couldn't parse API response into a FAQ structure", content);
    }
    
    return faqData;
  } catch (error) {
    console.error("Error generating FAQ:", error);
    toast.error("Failed to generate FAQ. Please try again.");
    
    // Return a fallback FAQ structure
    return createFallbackFAQ("Error Processing Document", error instanceof Error ? error.message : "Unknown error");
  }
};

// Helper function to create a fallback course structure
const createFallbackCourse = (title: string, errorDetail: string): CourseType => {
  return {
    title: title,
    description: "We encountered an error while processing your document. Please try again or contact support.",
    modules: [
      {
        title: "Document Analysis",
        content: "Our AI attempted to analyze your document but encountered issues. We've created a basic structure instead.\n\nDocument seemed to contain binary or non-text content that was difficult to process.",
        objectives: ["Try uploading a different document", "Check if the document is in a supported format", "Make sure the document contains text content"],
        quiz: {
          question: "What should you do if document processing fails?",
          options: ["Give up", "Try a different document", "Contact support", "All of the above"],
          answer: 3
        }
      },
      {
        title: "Error Details",
        content: `Technical details about the error:\n\n${errorDetail}`,
        objectives: ["Understand what went wrong", "Try with a different document format", "Contact support if the issue persists"],
        quiz: {
          question: "What document formats work best with our system?",
          options: ["Binary files", "PDFs with text content", "Text files (.txt, .doc, .docx)", "Image files"],
          answer: 2
        }
      }
    ]
  };
};

// Helper function to create a fallback FAQ structure
const createFallbackFAQ = (title: string, errorDetail: string): FAQType => {
  return {
    title: title,
    description: "We encountered an error while processing your document. Please try again or contact support.",
    questions: [
      {
        question: "Why did my document processing fail?",
        answer: `We couldn't properly analyze your document. This could be because it contains binary data, scanned images without OCR, or other non-text content that our system couldn't process effectively.`,
        tags: ["error", "troubleshooting", "document processing"]
      },
      {
        question: "What document formats are supported?",
        answer: "We support PDF, TXT, DOC, and DOCX formats. For best results, ensure your PDFs contain actual text (not just scanned images) and are not password protected.",
        tags: ["formats", "supported", "requirements"]
      },
      {
        question: "How can I improve processing success?",
        answer: "Try using text-based PDFs, Word documents, or plain text files. If you have a scanned document, consider using an OCR (Optical Character Recognition) tool first to convert it to searchable text.",
        tags: ["tips", "improvement", "success"]
      },
      {
        question: "Technical error details",
        answer: `Error information: ${errorDetail}`,
        tags: ["technical", "error", "details"]
      }
    ]
  };
};

// Helper function to read the content of a file
export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      resolve(content);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    // Improved file type detection and handling
    if (file.type === 'application/pdf') {
      // For PDFs, we can either get the text if available or binary data
      // In a production app, we'd have better PDF parsing on the backend
      reader.readAsDataURL(file);
    } else if (file.type.includes('image/')) {
      // Images won't have useful text content
      reader.readAsDataURL(file);
      console.log("Warning: Processing image files may not yield good results without OCR");
    } else {
      // For text-based formats
      reader.readAsText(file);
    }
  });
};
