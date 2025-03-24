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

// Enhanced function to safely parse JSON with better error handling and extraction
const safeJSONParse = (text: string): any => {
  try {
    // First try to parse the text directly
    return JSON.parse(text);
  } catch (e) {
    console.log("Initial JSON parse failed, attempting to extract JSON");
    
    try {
      // Try to find anything that looks like a JSON object using regex
      const jsonRegex = /(\{[\s\S]*\})/;
      const match = text.match(jsonRegex);
      
      if (match && match[0]) {
        try {
          return JSON.parse(match[0]);
        } catch (innerError) {
          console.log("JSON extraction attempt failed", innerError);
        }
      }
      
      // If we still don't have valid JSON, try to detect and fix common JSON issues
      // Remove any non-JSON text before the opening brace or after the closing brace
      const cleanedText = text.substring(
        text.indexOf('{'),
        text.lastIndexOf('}') + 1
      );
      
      if (cleanedText.includes('{') && cleanedText.includes('}')) {
        try {
          return JSON.parse(cleanedText);
        } catch (cleaningError) {
          console.log("Cleaned JSON parse attempt failed", cleaningError);
        }
      }
    } catch (extractError) {
      console.log("JSON extraction failed completely", extractError);
    }
    
    console.log("All JSON parsing attempts failed. Original text:", text.substring(0, 100) + "...");
    
    // If everything fails, return null (will trigger fallback content)
    return null;
  }
};

export const generateCourseFromDocument = async (fileContent: string): Promise<CourseType> => {
  try {
    // Limit content length to avoid token limits, but keep a reasonable amount
    const truncatedContent = fileContent.substring(0, 6000);
    
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
      Do not include any explanatory text, just return the JSON object.
      
      Document content:
      ${truncatedContent}
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
        temperature: 0.5, // Lower temperature for more structured output
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`DeepSeek API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data: DeepSeekResponse = await response.json();
    const content = data.choices[0].message.content;
    
    console.log("API Response content sample:", content.substring(0, 200) + "...");
    
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
    // Limit content length to avoid token limits, but keep a reasonable amount
    const truncatedContent = fileContent.substring(0, 6000);
    
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
      Do not include any explanatory text, just return the JSON object.
      
      Document content:
      ${truncatedContent}
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
        temperature: 0.5, // Lower temperature for more structured output
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`DeepSeek API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data: DeepSeekResponse = await response.json();
    const content = data.choices[0].message.content;
    
    console.log("FAQ API Response content sample:", content.substring(0, 200) + "...");
    
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

// Helper function to create a more useful fallback course structure
const createFallbackCourse = (title: string, errorDetail: string): CourseType => {
  return {
    title: "Document Processing Results",
    description: "We've analyzed your document and created this basic course structure. For better results, try uploading a text-based document.",
    modules: [
      {
        title: "Understanding Your Document",
        content: "We were able to process your document but encountered some challenges creating a structured course. Below are some key points we were able to extract:\n\n- Your document appears to contain valuable information that could be structured into learning modules.\n- Our system works best with text-based documents in common formats like PDF, DOC, or TXT.\n- For optimal results, ensure your document has clear headings and well-organized content.",
        objectives: ["Understand document processing capabilities", "Learn how to optimize documents for processing", "Explore alternative document formats"],
        quiz: {
          question: "What document formats work best with our system?",
          options: ["Image-only files", "PDFs with text content", "Password-protected documents", "Binary files"],
          answer: 1
        }
      },
      {
        title: "Troubleshooting Document Processing",
        content: "If you encountered issues with your document processing, here are some steps you can take:\n\n1. Ensure your document contains actual text content (not just images or scans)\n2. Check that your document isn't corrupted or password-protected\n3. Try converting your document to a different format (e.g., PDF to DOCX)\n4. For image-based documents, consider using OCR software first",
        objectives: ["Identify common document processing issues", "Learn troubleshooting techniques", "Discover document conversion options"],
        quiz: {
          question: "What should you do if your document processing fails?",
          options: ["Give up", "Try a different document format", "Contact support", "All of the above"],
          answer: 3
        }
      },
      {
        title: "Error Details",
        content: `Technical information about what happened:\n\n${errorDetail.substring(0, 500)}`,
        objectives: ["Understand what went wrong", "Get technical details about the error", "Learn how to avoid similar issues"],
        quiz: {
          question: "Why do API responses sometimes fail to parse as JSON?",
          options: ["The API is broken", "The response format doesn't match expectations", "JSON is an outdated format", "The document was too short"],
          answer: 1
        }
      }
    ]
  };
};

// Helper function to create a more useful fallback FAQ structure
const createFallbackFAQ = (title: string, errorDetail: string): FAQType => {
  return {
    title: "Document FAQs",
    description: "We've created these FAQs based on common questions about document processing and content extraction.",
    questions: [
      {
        question: "What types of documents work best with this system?",
        answer: "Text-based documents like PDFs with actual text content (not scanned images), Word documents (DOC, DOCX), and plain text files (TXT) work best. The system extracts text content to generate structured courses and FAQs.",
        tags: ["document types", "supported formats", "best practices"]
      },
      {
        question: "Why did my document processing encounter issues?",
        answer: "Document processing might face challenges if your file contains primarily images, is scanned without OCR, has unusual formatting, is corrupted, or is too large. The system works best with clearly structured text content.",
        tags: ["troubleshooting", "processing issues", "document problems"]
      },
      {
        question: "How can I improve my document for better results?",
        answer: "To get better results: 1) Ensure your document has actual text content, not just images 2) Use clear headings and sections 3) Remove any password protection 4) Consider converting scanned documents using OCR software first 5) Keep formatting relatively simple.",
        tags: ["optimization", "improvement", "document preparation"]
      },
      {
        question: "Can I process protected or sensitive documents?",
        answer: "Yes, but with caution. While processing happens securely, be careful with confidential or sensitive information. The system doesn't permanently store your document content, but consider removing sensitive details before uploading if you're concerned.",
        tags: ["security", "privacy", "confidentiality"]
      },
      {
        question: "What was the technical error with my document?",
        answer: `Your document processing encountered this issue: ${errorDetail.substring(0, 200)}... This typically indicates that the API response couldn't be properly structured into a course or FAQ format.`,
        tags: ["technical details", "error information", "troubleshooting"]
      },
      {
        question: "What should I do next?",
        answer: "You can try uploading a different document, converting your current document to another format, or simplifying your document's content and structure. If problems persist, contact support for further assistance.",
        tags: ["next steps", "solutions", "support"]
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
