
/**
 * Reads the content of a file
 * @param file The file to read
 * @returns A promise that resolves to the file content
 */
export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        
        // For DataURL contents (like PDFs), try to extract text in a reasonable format
        if (content.startsWith('data:')) {
          console.log("Processing file as data URL:", file.type);
          
          if (file.type === 'application/pdf') {
            // For PDFs, provide specific instructions to help the AI parse it
            resolve(`This is a PDF document named "${file.name}" with size ${(file.size / 1024).toFixed(2)}KB. 
            The content is encoded as a data URL. Please parse this document carefully.
            
            Document metadata:
            - Filename: ${file.name}
            - Type: ${file.type}
            - Size: ${(file.size / 1024).toFixed(2)}KB
            - Last modified: ${new Date(file.lastModified).toISOString()}
            
            Instructions for processing:
            1. Extract all key topics and concepts
            2. Identify the main sections or chapters
            3. Determine the logical flow of information
            4. Create a structured course based on this document's content
            
            Document content (encoded):
            ${content.substring(0, 1000)}...`);
          } else if (file.type.includes('image/')) {
            // For images, provide context for the AI
            resolve(`This is an image file named "${file.name}" with type ${file.type} and size ${(file.size / 1024).toFixed(2)}KB.
            Please create a course about image analysis, visual content, or the subject this image might represent.
            
            Image metadata:
            - Filename: ${file.name}
            - Type: ${file.type}
            - Size: ${(file.size / 1024).toFixed(2)}KB
            - Last modified: ${new Date(file.lastModified).toISOString()}`);
          } else {
            // For other binary data
            resolve(`This is a binary file named "${file.name}" with type ${file.type} and size ${(file.size / 1024).toFixed(2)}KB.
            Please extract the key information from this document and create a structured course.`);
          }
        } else {
          // For text content, just return it directly with some metadata
          console.log("Processing text file:", file.name);
          resolve(`Document: ${file.name} (${file.type}, ${(file.size / 1024).toFixed(2)}KB)
          
          Content:
          ${content}`);
        }
      } catch (error) {
        console.error("Error processing file content:", error);
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      reject(error);
    };
    
    // Improved file type detection and handling
    if (file.type === 'application/pdf') {
      console.log("Processing PDF file");
      reader.readAsDataURL(file);
    } else if (file.type.includes('image/')) {
      console.log("Processing image file");
      reader.readAsDataURL(file);
    } else {
      // For text-based formats
      console.log("Processing text-based file");
      reader.readAsText(file);
    }
  });
};
