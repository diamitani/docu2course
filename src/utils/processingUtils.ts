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
    // Use Promise.all to run these concurrently
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
// Optimized for more realistic progression
export const simulateProgress = (callback: (progress: number) => void): () => void => {
  let progress = 0;
  let speedFactor = 1.0;
  
  // Create stages to simulate real-world processing behavior
  const stages = [
    { target: 20, speed: 15 },   // Initial processing is fast
    { target: 50, speed: 8 },    // Middle stage is medium
    { target: 80, speed: 5 },    // Slow down for ML processing
    { target: 95, speed: 2 },    // Very slow for final steps
    { target: 99, speed: 1 }     // Almost there but never quite finishing until real completion
  ];
  
  let currentStage = 0;
  
  const interval = setInterval(() => {
    // Calculate progress increment based on current stage
    const stage = stages[currentStage];
    const increment = (Math.random() * stage.speed) / 10;
    
    progress += increment;
    
    // Check if we've hit the target for current stage
    if (progress >= stage.target && currentStage < stages.length - 1) {
      currentStage++;
      // Pause briefly at stage transitions
      progress = stage.target;
    }
    
    // Cap at 99% until explicitly set to 100% by the caller
    if (progress > 99) progress = 99;
    
    callback(Math.floor(progress));
  }, 200); // More frequent updates for smoother animation
  
  // Return a function that can set progress to 100% when processing is truly complete
  return () => {
    clearInterval(interval);
    callback(100);
  };
};
