
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
          console.log("Processing file as data URL");
          
          // For PDFs and images, we'll need to inform the AI that this is encoded content
          resolve(`This is a ${file.type} file named "${file.name}" with size ${(file.size / 1024).toFixed(2)}KB. 
          The content is encoded as a data URL. 
          Please extract the key information from this document.`);
        } else {
          // For text content, just return it directly
          resolve(content);
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
