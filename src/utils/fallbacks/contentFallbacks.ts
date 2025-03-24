
import { CourseType, FAQType } from '../processingUtils';

/**
 * Creates a fallback course when API fails
 * @param title Title for the fallback course
 * @param errorMessage Error message to include in course
 * @returns A minimal course structure
 */
export const createFallbackCourse = (title: string, errorMessage: string = ""): CourseType => {
  return {
    title: title,
    description: "This is a basic course structure created when we couldn't process your document properly. Please try again with a different document or check your API key.",
    modules: [
      {
        title: "Document Processing Guide",
        content: `We encountered some issues when trying to process your document. Here are some possible reasons:\n\n` +
          `1. The document format may not be supported or is too complex\n` +
          `2. The API may have timed out or returned an error\n` +
          `3. The content might be too specialized or need more context\n\n` +
          `Technical details (for debugging): ${errorMessage.substring(0, 500)}`,
        objectives: [
          "Understand document processing limitations",
          "Learn how to provide better input documents",
          "Troubleshoot common processing issues"
        ],
        quiz: {
          question: "What format works best for document processing?",
          options: [
            "Text-based PDFs with clear structure",
            "Scanned image PDFs without OCR",
            "Password-protected documents",
            "Heavily formatted documents with complex layouts"
          ],
          answer: 0
        },
        activities: [
          "Check if your document is text-based (you can copy text from it)",
          "If using a PDF, ensure it's not just scanned images",
          "Try simplifying your document structure or format"
        ],
        resources: [
          "Documentation on supported file formats",
          "Tips for preparing documents for processing",
          "Contact support for assistance"
        ]
      }
    ]
  };
};

/**
 * Creates a fallback FAQ when API fails
 * @param title Title for the fallback FAQ
 * @param errorMessage Error message to include in FAQ
 * @returns A minimal FAQ structure
 */
export const createFallbackFAQ = (title: string, errorMessage: string = ""): FAQType => {
  return {
    title: title,
    description: "This is a basic FAQ created when we couldn't process your document properly. Please try again with a different document or check your API key.",
    questions: [
      {
        question: "Why couldn't my document be processed?",
        answer: `There could be several reasons why your document couldn't be processed correctly:\n\n` +
          `- The document format may not be supported\n` +
          `- The content might be too complex or specialized\n` +
          `- There might have been an API timeout or error\n` +
          `- The document might be too large\n\n` +
          `Technical details (for debugging): ${errorMessage.substring(0, 300)}`,
        tags: ["error", "troubleshooting", "document"]
      },
      {
        question: "What file formats work best?",
        answer: "For best results, use text-based PDFs, DOC/DOCX files, or plain text files. Make sure PDFs contain actual text and not just scanned images. If you have a scanned document, try running OCR (Optical Character Recognition) on it first.",
        tags: ["format", "pdf", "doc", "text"]
      },
      {
        question: "How can I get better results next time?",
        answer: "To improve results, try using documents with clear structure and formatting. Break down long documents into smaller, focused ones. Ensure your API key is valid and has sufficient quota remaining. If the issue persists, try a different document or contact support.",
        tags: ["tips", "improvement", "document"]
      }
    ]
  };
};
