
/**
 * Safely parses JSON with enhanced error handling and extraction capabilities
 * @param text The text to parse as JSON
 * @returns The parsed JSON or null if parsing fails
 */
export const safeJSONParse = (text: string): any => {
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
