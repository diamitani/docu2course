
import { CourseType, FAQType } from '../processingUtils';
import { toast } from "sonner";
import { callDeepSeekAPI } from '../api/deepSeekClient';
import { safeJSONParse } from '../helpers/jsonParser';
import { createFallbackCourse, createFallbackFAQ } from '../fallbacks/contentFallbacks';
import { buildCoursePrompt, buildFAQPrompt } from '../prompts/promptBuilder';

/**
 * Generates a course structure from document content
 * @param fileContent Content of the file to process
 * @returns A promise that resolves to a course structure
 */
export const generateCourseFromDocument = async (fileContent: string): Promise<CourseType> => {
  try {
    const prompt = buildCoursePrompt(fileContent);
    const data = await callDeepSeekAPI(prompt);
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

/**
 * Generates an FAQ structure from document content
 * @param fileContent Content of the file to process
 * @returns A promise that resolves to an FAQ structure
 */
export const generateFAQFromDocument = async (fileContent: string): Promise<FAQType> => {
  try {
    const prompt = buildFAQPrompt(fileContent);
    const data = await callDeepSeekAPI(prompt);
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
