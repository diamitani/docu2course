
import { CourseType, FAQType } from '../processingUtils';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { safeJSONParse } from '../helpers/jsonParser';
import { createFallbackCourse, createFallbackFAQ } from '../fallbacks/contentFallbacks';
import { buildCoursePrompt, buildFAQPrompt, buildPromptBasedCoursePrompt } from '../prompts/promptBuilder';

/**
 * Calls the OpenAI Assistant via Supabase Edge Function
 */
const callOpenAIAssistant = async (prompt: string, threadId?: string, projectId?: string): Promise<any> => {
  // Get the current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    console.error('Authentication error:', authError);
    throw new Error('User not authenticated');
  }

  console.log('Calling OpenAI Assistant for user:', user.id);

  const { data, error } = await supabase.functions.invoke('chat-with-assistant', {
    body: { 
      prompt,
      threadId,
      projectId,
      userId: user.id
    }
  });

  if (error) {
    console.error('Error calling OpenAI Assistant:', error);
    throw new Error(error.message || 'Failed to call OpenAI Assistant');
  }

  if (!data.success) {
    throw new Error(data.error || 'Assistant API call failed');
  }

  return data;
};

/**
 * Generates a course structure from document content
 * @param fileContent Content of the file to process
 * @returns A promise that resolves to a course structure
 */
export const generateCourseFromDocument = async (fileContent: string): Promise<CourseType> => {
  try {
    toast.info("Generating course structure...");
    const prompt = buildCoursePrompt(fileContent);
    console.log("Sending request to OpenAI Assistant for course generation");
    
    const data = await callOpenAIAssistant(prompt);
    console.log("Received response from OpenAI Assistant");
    
    const content = data.content;
    console.log("Assistant Response content sample:", content.substring(0, 200) + "...");
    
    const courseData = safeJSONParse(content);
    
    if (!courseData) {
      // If we couldn't parse JSON, create a fallback course with the API response
      console.error("Could not parse course JSON from API response");
      toast.error("Failed to parse the AI response. Using a simplified course structure.");
      return createFallbackCourse("Couldn't parse API response into a course structure", content);
    }
    
    // Validate the course structure
    if (!courseData.title || !courseData.description || !Array.isArray(courseData.modules) || courseData.modules.length === 0) {
      console.error("Invalid course structure:", courseData);
      toast.error("The course structure is incomplete. Using a simplified course.");
      return createFallbackCourse("Incomplete course structure from API", JSON.stringify(courseData));
    }
    
    toast.success("Course structure generated successfully!");
    return courseData;
  } catch (error) {
    console.error("Error generating course:", error);
    toast.error("Failed to generate course. Please try again.");
    
    // Return a fallback course structure
    return createFallbackCourse("Error Processing Document", error instanceof Error ? error.message : "Unknown error");
  }
};

/**
 * Generates a course structure from a user prompt
 * @param title The course title
 * @param promptText The user's prompt text
 * @returns A promise that resolves to a course structure
 */
export const generateCourseFromPromptText = async (title: string, promptText: string): Promise<CourseType> => {
  try {
    toast.info("Generating custom course from prompt...");
    const prompt = buildPromptBasedCoursePrompt(title, promptText);
    console.log("Sending request to OpenAI Assistant for prompt-based course generation");
    
    const data = await callOpenAIAssistant(prompt);
    console.log("Received response from OpenAI Assistant");
    
    const content = data.content;
    console.log("Assistant Response content sample:", content.substring(0, 200) + "...");
    
    const courseData = safeJSONParse(content);
    
    if (!courseData) {
      console.error("Could not parse course JSON from API response");
      toast.error("Failed to parse the AI response. Using a simplified course structure.");
      return createFallbackCourse("Couldn't parse API response into a course structure", content);
    }
    
    // Validate the course structure
    if (!courseData.title || !courseData.description || !Array.isArray(courseData.modules) || courseData.modules.length === 0) {
      console.error("Invalid course structure:", courseData);
      toast.error("The course structure is incomplete. Using a simplified course.");
      return createFallbackCourse("Incomplete course structure from API", JSON.stringify(courseData));
    }
    
    toast.success("Custom course generated successfully!");
    return courseData;
  } catch (error) {
    console.error("Error generating course from prompt:", error);
    toast.error("Failed to generate course from prompt. Please try again.");
    
    // Return a fallback course structure
    return createFallbackCourse("Error Processing Prompt", error instanceof Error ? error.message : "Unknown error");
  }
};

/**
 * Generates an FAQ structure from document content
 * @param fileContent Content of the file to process
 * @returns A promise that resolves to an FAQ structure
 */
export const generateFAQFromDocument = async (fileContent: string): Promise<FAQType> => {
  try {
    toast.info("Generating FAQ knowledge base...");
    const prompt = buildFAQPrompt(fileContent);
    console.log("Sending request to OpenAI Assistant for FAQ generation");
    
    const data = await callOpenAIAssistant(prompt);
    console.log("Received response from OpenAI Assistant");
    
    const content = data.content;
    console.log("FAQ Assistant Response content sample:", content.substring(0, 200) + "...");
    
    const faqData = safeJSONParse(content);
    
    if (!faqData) {
      // If we couldn't parse JSON, create a fallback FAQ with the API response
      console.error("Could not parse FAQ JSON from API response");
      toast.error("Failed to parse the AI response. Using a simplified FAQ structure.");
      return createFallbackFAQ("Couldn't parse API response into a FAQ structure", content);
    }
    
    // Validate the FAQ structure
    if (!faqData.title || !faqData.description || !Array.isArray(faqData.questions) || faqData.questions.length === 0) {
      console.error("Invalid FAQ structure:", faqData);
      toast.error("The FAQ structure is incomplete. Using a simplified FAQ.");
      return createFallbackFAQ("Incomplete FAQ structure from API", JSON.stringify(faqData));
    }
    
    toast.success("FAQ knowledge base generated successfully!");
    return faqData;
  } catch (error) {
    console.error("Error generating FAQ:", error);
    toast.error("Failed to generate FAQ. Please try again.");
    
    // Return a fallback FAQ structure
    return createFallbackFAQ("Error Processing Document", error instanceof Error ? error.message : "Unknown error");
  }
};
