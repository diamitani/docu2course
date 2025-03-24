export interface ModuleType {
  title: string;
  content: string;
  objectives: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: number;
  };
}

export interface CourseType {
  title: string;
  description: string;
  modules: ModuleType[];
}

export interface FAQItemType {
  question: string;
  answer: string;
  tags: string[];
}

export interface FAQType {
  title: string;
  description: string;
  questions: FAQItemType[];
}

// Import DeepSeek API functions
import { generateCourseFromDocument, generateFAQFromDocument, readFileContent } from './deepSeekAPI';

// Process document using DeepSeek API
export const processDocument = async (file: File): Promise<{ course: CourseType; faq: FAQType }> => {
  try {
    // Read the file content
    const fileContent = await readFileContent(file);
    
    // Generate course and FAQ using DeepSeek API
    const [course, faq] = await Promise.all([
      generateCourseFromDocument(fileContent),
      generateFAQFromDocument(fileContent)
    ]);
    
    return { course, faq };
  } catch (error) {
    console.error("Error processing document:", error);
    throw error;
  }
};

// Function to simulate progress during document processing (keep for visual feedback)
export const simulateProgress = (callback: (progress: number) => void): () => void => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    callback(Math.floor(progress));
    if (progress === 100) clearInterval(interval);
  }, 500);
  
  return () => clearInterval(interval);
};
