
export interface ModuleType {
  title: string;
  content: string;
  objectives: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: number;
  };
  activities?: string[];
  resources?: string[];
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

// Import DeepSeek API functions from refactored structure
import { generateCourseFromDocument, generateFAQFromDocument } from './generators/contentGenerators';
import { readFileContent } from './helpers/fileReader';
import { toast } from "sonner";

// Process document using DeepSeek API
export const processDocument = async (file: File): Promise<{ course: CourseType; faq: FAQType }> => {
  try {
    // Read the file content
    const fileContent = await readFileContent(file);
    console.log(`File processed, content length: ${fileContent.length} characters`);
    
    // Generate course and FAQ using DeepSeek API with proper error handling
    // Use Promise.all to run these concurrently
    const [course, faq] = await Promise.all([
      generateCourseFromDocument(fileContent).catch(error => {
        console.error("Error generating course:", error);
        toast.error("Course generation failed, but we'll still try to create a basic structure");
        // Return a basic course structure on error
        return {
          title: "Document Analysis",
          description: "We encountered some issues processing your document, but created a basic course structure.",
          modules: [
            {
              title: "Document Overview",
              content: "Your document has been analyzed. While we couldn't create a detailed course, we've extracted some basic information.",
              objectives: ["Understand document content", "Explore key concepts", "Learn document structure"],
              activities: ["Review the document yourself to identify key sections", "Take notes on important concepts"],
              resources: ["Original document"]
            }
          ]
        };
      }),
      generateFAQFromDocument(fileContent).catch(error => {
        console.error("Error generating FAQ:", error);
        toast.error("FAQ generation failed, but we'll still provide some basic information");
        // Return a basic FAQ structure on error
        return {
          title: "Document FAQs",
          description: "Here are some general questions about document processing.",
          questions: [
            {
              question: "How can I get better results from document processing?",
              answer: "Upload text-based documents in standard formats like PDF, DOC, or TXT. Ensure the document has clear structure and formatting.",
              tags: ["tips", "improvement", "document"]
            }
          ]
        };
      })
    ]);
    
    return { course, faq };
  } catch (error) {
    console.error("Error processing document:", error);
    throw error;
  }
};

// Function to simulate progress during document processing with improved pacing
// Optimized for more realistic progression and smoother transitions
export const simulateProgress = (callback: (progress: number) => void): () => void => {
  let progress = 0;
  
  // Create stages to simulate real-world processing behavior
  const stages = [
    { target: 15, speed: 20, duration: 1000 },   // Quick initial processing
    { target: 35, speed: 10, duration: 2000 },   // Reading document
    { target: 50, speed: 6, duration: 3000 },    // Extracting content
    { target: 65, speed: 4, duration: 4000 },    // Generating course
    { target: 80, speed: 3, duration: 4000 },    // Generating FAQ
    { target: 95, speed: 1, duration: 2000 }     // Finalizing
  ];
  
  let currentStage = 0;
  
  // First, jump quickly to first target to show immediate feedback
  setTimeout(() => {
    progress = stages[0].target;
    callback(Math.floor(progress));
  }, 200);
  
  const interval = setInterval(() => {
    // Calculate progress increment based on current stage
    const stage = stages[currentStage];
    const increment = (Math.random() * stage.speed) / 10;
    
    progress += increment;
    
    // Check if we've hit the target for current stage
    if (progress >= stage.target && currentStage < stages.length - 1) {
      currentStage++;
      
      // Pause briefly at stage transitions to make stages more distinct
      progress = stage.target;
      callback(Math.floor(progress));
      
      // After a brief pause, continue with next stage
      setTimeout(() => {
        progress = stage.target;
      }, 500);
    }
    
    // Cap at 99% until explicitly set to 100% by the caller
    if (progress > 99) progress = 99;
    
    callback(Math.floor(progress));
  }, 200); // More frequent updates for smoother animation
  
  // Return a function that can set progress to 100% when processing is truly complete
  return () => {
    clearInterval(interval);
    // Quick timeout before setting to 100% to ensure visual completion
    setTimeout(() => callback(100), 300);
  };
};
