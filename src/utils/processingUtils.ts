
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
import { generateCourseFromDocument, generateFAQFromDocument, generateCourseFromPromptText } from './generators/contentGenerators';
import { readFileContent } from './helpers/fileReader';
import { toast } from "sonner";
import { safeJSONParse } from './helpers/jsonParser';

// Create a helper for localStorage course storage
const COURSE_STORAGE_KEY = 'saved_courses';

interface SavedCourse {
  id: string;
  timestamp: number;
  fileName: string;
  fileSize: number;
  course: CourseType;
  faq: FAQType | null;
}

export const saveCourseToLocalStorage = (fileName: string, fileSize: number, course: CourseType, faq: FAQType | null): string => {
  try {
    // Generate a unique ID for this course
    const courseId = `course_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Get existing courses
    const existingCoursesStr = localStorage.getItem(COURSE_STORAGE_KEY);
    const existingCourses: SavedCourse[] = existingCoursesStr ? JSON.parse(existingCoursesStr) : [];
    
    // Add new course
    const savedCourse: SavedCourse = {
      id: courseId,
      timestamp: Date.now(),
      fileName,
      fileSize,
      course,
      faq
    };
    
    // Save to localStorage (newest first)
    localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify([savedCourse, ...existingCourses]));
    
    return courseId;
  } catch (error) {
    console.error('Error saving course to localStorage:', error);
    toast.error('Could not save course to history');
    return '';
  }
};

export const getSavedCourses = (): SavedCourse[] => {
  try {
    const coursesStr = localStorage.getItem(COURSE_STORAGE_KEY);
    return coursesStr ? JSON.parse(coursesStr) : [];
  } catch (error) {
    console.error('Error getting saved courses from localStorage:', error);
    return [];
  }
};

export const getSavedCourseById = (id: string): SavedCourse | null => {
  try {
    const courses = getSavedCourses();
    return courses.find(course => course.id === id) || null;
  } catch (error) {
    console.error('Error getting saved course by ID:', error);
    return null;
  }
};

export const deleteSavedCourse = (id: string): boolean => {
  try {
    const courses = getSavedCourses();
    const filteredCourses = courses.filter(course => course.id !== id);
    localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(filteredCourses));
    return true;
  } catch (error) {
    console.error('Error deleting saved course:', error);
    return false;
  }
};

// Process document using DeepSeek API with improved error handling
export const processDocument = async (file: File): Promise<{ course: CourseType; faq: FAQType }> => {
  try {
    // Read the file content
    const fileContent = await readFileContent(file);
    console.log(`File processed, content length: ${fileContent.length} characters`);
    
    // Truncate very long content to ensure API stability
    const maxContentLength = 25000;
    const processedContent = fileContent.length > maxContentLength
      ? fileContent.substring(0, maxContentLength) + "\n\n[Content truncated for API stability]"
      : fileContent;
    
    // Generate course and FAQ using DeepSeek API with proper error handling
    // Use Promise.all to run these concurrently
    const [course, faq] = await Promise.all([
      generateCourseFromDocument(processedContent).catch(error => {
        console.error("Error generating course:", error);
        toast.error("Course generation encountered an issue, using simplified structure");
        // Return a basic course structure on error
        return {
          title: file.name.replace(/\.[^/.]+$/, "") || "Document Analysis",
          description: "We encountered some issues processing your document, but created a course structure based on available content.",
          modules: [
            {
              title: "Document Overview",
              content: "Your document has been analyzed. We've extracted basic information to create this course.",
              objectives: ["Understand document content", "Explore key concepts", "Learn document structure"],
              activities: ["Review the document to identify key sections", "Take notes on important concepts"],
              resources: ["Original document"]
            }
          ]
        };
      }),
      generateFAQFromDocument(processedContent).catch(error => {
        console.error("Error generating FAQ:", error);
        toast.error("FAQ generation encountered an issue, using basic structure");
        // Return a basic FAQ structure on error
        return {
          title: `FAQ: ${file.name.replace(/\.[^/.]+$/, "")}` || "Document FAQs",
          description: "Common questions about the document content.",
          questions: [
            {
              question: "What are the key topics covered in this document?",
              answer: "The document covers several important concepts related to the subject matter.",
              tags: ["overview", "topics", "content"]
            },
            {
              question: "How can I get better results from document processing?",
              answer: "Upload text-based documents in standard formats like PDF, DOC, or TXT. Ensure the document has clear structure and formatting.",
              tags: ["tips", "improvement", "document"]
            }
          ]
        };
      })
    ]);
    
    // Save the course to localStorage for history
    saveCourseToLocalStorage(file.name, file.size, course, faq);
    
    return { course, faq };
  } catch (error) {
    console.error("Error processing document:", error);
    throw error;
  }
};

// Generate a course from a user prompt with improved reliability
export const generateCourseFromPrompt = async (title: string, promptText: string): Promise<{ course: CourseType; faq: FAQType | null }> => {
  try {
    // Generate course from prompt with better error handling
    const course = await generateCourseFromPromptText(title, promptText)
      .catch(error => {
        console.error("Error generating course from prompt:", error);
        toast.error("Course generation encountered an issue, using basic structure");
        
        // Fallback course structure
        return {
          title: title || "Generated Course",
          description: "A course generated based on your prompt.",
          modules: [
            {
              title: "Introduction",
              content: "This module serves as an introduction to the course topics.",
              objectives: ["Understand basic concepts", "Get familiar with terminology"],
              quiz: {
                question: "What's the purpose of this course?",
                options: ["To provide information", "To teach practical skills", "To explore concepts", "All of the above"],
                answer: 3
              },
              activities: ["Review course material", "Research related topics"],
              resources: ["Online resources", "Related books and articles"]
            }
          ]
        };
      });
    
    // Save to localStorage for history
    const fakefile = {
      name: title || "Generated Course",
      size: promptText.length
    };
    saveCourseToLocalStorage(fakefile.name, fakefile.size, course, null);
    
    // For prompt-based generation, we don't generate an FAQ
    return { course, faq: null };
  } catch (error) {
    console.error("Error generating course from prompt:", error);
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
