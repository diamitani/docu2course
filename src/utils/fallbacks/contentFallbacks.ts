
import { CourseType, FAQType } from '../processingUtils';

/**
 * Creates a fallback course structure when processing fails
 * @param title Title for the fallback course
 * @param errorDetail Details about the error
 * @returns A basic course structure
 */
export const createFallbackCourse = (title: string, errorDetail: string): CourseType => {
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

/**
 * Creates a fallback FAQ structure when processing fails
 * @param title Title for the fallback FAQ
 * @param errorDetail Details about the error
 * @returns A basic FAQ structure
 */
export const createFallbackFAQ = (title: string, errorDetail: string): FAQType => {
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
