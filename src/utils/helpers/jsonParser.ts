
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
    console.log("Text sample for debugging:", text.substring(0, 500));
    
    try {
      // Try to find anything that looks like a JSON object using regex
      // This regex looks for the first { and the last }
      const jsonRegex = /(\{[\s\S]*\})/;
      const match = text.match(jsonRegex);
      
      if (match && match[0]) {
        try {
          console.log("Extracted potential JSON object");
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
          console.log("Extracted JSON from code block");
          return JSON.parse(potentialJson);
        } catch (codeBlockError) {
          console.log("Code block JSON extraction failed", codeBlockError);
        }
      }
      
      // If we still don't have valid JSON, try to detect and fix common JSON issues
      console.log("Attempting to clean and fix JSON structure");
      
      // Remove any non-JSON text before the opening brace or after the closing brace
      if (text.includes('{') && text.includes('}')) {
        const cleanedText = text.substring(
          text.indexOf('{'),
          text.lastIndexOf('}') + 1
        );
        
        try {
          console.log("Cleaned JSON by removing surrounding text");
          return JSON.parse(cleanedText);
        } catch (cleaningError) {
          console.log("Cleaned JSON parse attempt failed", cleaningError);
          
          // Attempt more aggressive fixes
          try {
            // Create a fallback JSON if all parsing attempts fail
            const fallbackJSON = generateFallbackJSON(cleanedText);
            console.log("Generated fallback JSON structure");
            return fallbackJSON;
          } catch (fallbackError) {
            console.log("Fallback JSON generation failed", fallbackError);
          }
        }
      }
    } catch (extractError) {
      console.log("JSON extraction failed completely", extractError);
    }
    
    console.log("All JSON parsing attempts failed. Original text preview:", text.substring(0, 500) + "...");
    
    // Return a minimal fallback structure as a last resort
    return createEmptyFallbackJSON();
  }
};

/**
 * Attempts to salvage parts of malformed JSON
 */
function generateFallbackJSON(text: string): any {
  // Extract the title if possible
  const titleMatch = text.match(/"title"[\s]*:[\s]*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : "Document Analysis";
  
  // Extract the description if possible
  const descMatch = text.match(/"description"[\s]*:[\s]*"([^"]+)"/);
  const description = descMatch ? descMatch[1] : "Content extracted from your document.";
  
  // Try to extract any module titles
  const moduleTitles: string[] = [];
  const moduleTitleRegex = /"title"[\s]*:[\s]*"([^"]+)"/g;
  let match;
  while ((match = moduleTitleRegex.exec(text)) !== null) {
    if (match[1] !== title) { // Don't include the course title
      moduleTitles.push(match[1]);
    }
  }
  
  // Create a basic structure
  return {
    title,
    description,
    modules: moduleTitles.length > 0 
      ? moduleTitles.map(moduleTitle => ({
          title: moduleTitle,
          content: "Content from your document related to this topic.",
          objectives: ["Understand key concepts", "Learn fundamental principles"],
          quiz: {
            question: "What is the main focus of this section?",
            options: ["Understanding concepts", "Practical application", "Historical context", "Future developments"],
            answer: 0
          },
          activities: ["Review the related content in the original document"],
          resources: ["Original document"]
        }))
      : [
          {
            title: "Document Overview",
            content: "Key information extracted from your document.",
            objectives: ["Understand the document content", "Identify key themes"],
            quiz: {
              question: "What is the main purpose of the document?",
              options: ["Information", "Instruction", "Analysis", "Reference"],
              answer: 0
            },
            activities: ["Review the original document"],
            resources: ["Original document"]
          }
        ]
  };
}

/**
 * Creates a minimal JSON structure when all parsing attempts fail
 */
function createEmptyFallbackJSON(): any {
  return {
    title: "Document Analysis",
    description: "We've processed your document, but encountered some formatting issues. Here's a basic course structure.",
    modules: [
      {
        title: "Document Overview",
        content: "Your document has been analyzed. While we had trouble extracting structured content, we've created this simple course outline for you.",
        objectives: ["Understand document format", "Review document content", "Identify key sections"],
        quiz: {
          question: "What would improve the document processing results?",
          options: [
            "Using a clearer document structure", 
            "Providing a text-based document", 
            "Breaking content into sections with headings", 
            "All of the above"
          ],
          answer: 3
        },
        activities: ["Review your original document", "Consider reformatting for better results"],
        resources: ["Original document"]
      }
    ]
  };
}
