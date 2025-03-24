
/**
 * Reads the content of a file
 * @param file The file to read
 * @returns A promise that resolves to the file content
 */
export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      resolve(content);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    // Improved file type detection and handling
    if (file.type === 'application/pdf') {
      // For PDFs, we can either get the text if available or binary data
      // In a production app, we'd have better PDF parsing on the backend
      reader.readAsDataURL(file);
    } else if (file.type.includes('image/')) {
      // Images won't have useful text content
      reader.readAsDataURL(file);
      console.log("Warning: Processing image files may not yield good results without OCR");
    } else {
      // For text-based formats
      reader.readAsText(file);
    }
  });
};
