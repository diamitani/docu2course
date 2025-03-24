
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
      // This regex looks for the first { and the last }
      const jsonRegex = /(\{[\s\S]*\})/;
      const match = text.match(jsonRegex);
      
      if (match && match[0]) {
        try {
          return JSON.parse(match[0]);
        } catch (innerError) {
          console.log("JSON extraction attempt failed", innerError);
        }
      }
      
      // Try to find anything between triple backticks (code blocks) that looks like JSON
      const codeBlockRegex = /```(?:json)?([\s\S]*?)```/;
      const codeBlockMatch = text.match(codeBlockRegex);
      
      if (codeBlockMatch && codeBlockMatch[1]) {
        const potentialJson = codeBlockMatch[1].trim();
        try {
          return JSON.parse(potentialJson);
        } catch (codeBlockError) {
          console.log("Code block JSON extraction failed", codeBlockError);
        }
      }
      
      // If we still don't have valid JSON, try to detect and fix common JSON issues
      // Remove any non-JSON text before the opening brace or after the closing brace
      if (text.includes('{') && text.includes('}')) {
        const cleanedText = text.substring(
          text.indexOf('{'),
          text.lastIndexOf('}') + 1
        );
        
        try {
          return JSON.parse(cleanedText);
        } catch (cleaningError) {
          console.log("Cleaned JSON parse attempt failed", cleaningError);
          
          // Last resort - try to replace single quotes with double quotes (common AI mistake)
          try {
            // This is a simplistic approach and may cause issues with legitimate single quotes in strings
            const fixedQuotes = cleanedText
              .replace(/'/g, '"')
              .replace(/(\w+):/g, '"$1":'); // Fix unquoted keys
              
            return JSON.parse(fixedQuotes);
          } catch (quotesError) {
            console.log("Fixed quotes JSON parse attempt failed", quotesError);
          }
        }
      }
    } catch (extractError) {
      console.log("JSON extraction failed completely", extractError);
    }
    
    console.log("All JSON parsing attempts failed. Original text preview:", text.substring(0, 200) + "...");
    
    // If everything fails, return null (will trigger fallback content)
    return null;
  }
};
