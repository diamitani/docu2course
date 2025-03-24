
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
      
      Document content:
      ${fileContent}
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
    const courseData = JSON.parse(data.choices[0].message.content) as CourseType;
    
    return courseData;
  } catch (error) {
    console.error("Error generating course:", error);
    toast.error("Failed to generate course. Please try again.");
    
    // Return a fallback course structure
    return {
      title: "Error Processing Document",
      description: "We encountered an error while processing your document. Please try again or contact support.",
      modules: [
        {
          title: "Error Details",
          content: `We couldn't process your document. Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          objectives: ["Try uploading a different document", "Check if the document is in a supported format"],
          quiz: {
            question: "What should you do if document processing fails?",
            options: ["Give up", "Try a different document", "Contact support", "All of the above"],
            answer: 3
          }
        }
      ]
    };
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
      
      Document content:
      ${fileContent}
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
    const faqData = JSON.parse(data.choices[0].message.content) as FAQType;
    
    return faqData;
  } catch (error) {
    console.error("Error generating FAQ:", error);
    toast.error("Failed to generate FAQ. Please try again.");
    
    // Return a fallback FAQ structure
    return {
      title: "Error Processing Document",
      description: "We encountered an error while processing your document. Please try again or contact support.",
      questions: [
        {
          question: "Why did my document processing fail?",
          answer: `We couldn't process your document. Error: ${error instanceof Error ? error.message : "Unknown error"}. Please try uploading a different document or contact support.`,
          tags: ["error", "troubleshooting", "support"]
        },
        {
          question: "What document formats are supported?",
          answer: "We support PDF, TXT, DOC, and DOCX formats. Please ensure your document is in one of these formats and try again.",
          tags: ["formats", "supported", "requirements"]
        }
      ]
    };
  }
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
    
    if (file.type === 'application/pdf') {
      // For PDF files, we can only get the binary data
      // In a real app, you'd send this to a backend to extract text
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  });
};
