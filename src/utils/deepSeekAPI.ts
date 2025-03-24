
// Re-export all functionality from the refactored files
import { CourseType, FAQType } from './processingUtils';
import { readFileContent } from './helpers/fileReader';
import { generateCourseFromDocument, generateFAQFromDocument } from './generators/contentGenerators';
import { simulateProgress } from './processingUtils';

// Re-export needed functions
export {
  readFileContent,
  generateCourseFromDocument,
  generateFAQFromDocument,
  simulateProgress
};
