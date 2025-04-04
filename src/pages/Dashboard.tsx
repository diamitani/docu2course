import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, Trash2, File, Upload as UploadIcon, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import Upload from '@/components/Upload';  // Using default import for the Upload component
import { formatDistanceToNow } from 'date-fns';

// Types for course history data
interface CourseHistoryItem {
  id: string;
  title: string;
  createdAt: string;
  description?: string;
  content?: any;
}

const Dashboard: React.FC = () => {
  const [courseHistory, setCourseHistory] = useState<CourseHistoryItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Load course history from localStorage on component mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('courseHistory');
      if (storedHistory) {
        setCourseHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading course history:', error);
      toast.error('Failed to load your course history');
    }
  }, []);

  // Handle file upload and processing
  const handleFileUploaded = async (file: File) => {
    setIsUploading(true);
    
    try {
      // Generate a unique ID for the course
      const courseId = Date.now().toString();
      
      // Create a placeholder entry while processing
      const newCourse: CourseHistoryItem = {
        id: courseId,
        title: file.name,
        createdAt: new Date().toISOString(),
        description: 'Processing your document...',
      };
      
      // Add to history and save to localStorage
      const updatedHistory = [newCourse, ...courseHistory];
      setCourseHistory(updatedHistory);
      localStorage.setItem('courseHistory', JSON.stringify(updatedHistory));
      
      // Here you would normally send the file to your API for processing
      // For demonstration, we'll simulate processing with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the course with processed data
      const processedCourse: CourseHistoryItem = {
        id: courseId,
        title: file.name.replace(/\.\w+$/, ''),
        createdAt: new Date().toISOString(),
        description: 'An AI-generated course based on your document.',
        content: {
          // This would normally be the processed content from your API
          modules: [
            { title: 'Introduction', lessons: [{ title: 'Getting Started' }] },
            { title: 'Core Concepts', lessons: [{ title: 'Fundamental Principles' }] }
          ]
        }
      };
      
      // Update the history with the processed course
      const finalHistory = courseHistory.map(course => 
        course.id === courseId ? processedCourse : course
      );
      
      setCourseHistory(finalHistory);
      localStorage.setItem('courseHistory', JSON.stringify(finalHistory));
      
      toast.success('Document processed successfully!');
    } catch (error) {
      console.error('Error processing document:', error);
      toast.error('Failed to process your document. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle course deletion
  const handleDeleteCourse = (id: string) => {
    try {
      const updatedHistory = courseHistory.filter(course => course.id !== id);
      setCourseHistory(updatedHistory);
      localStorage.setItem('courseHistory', JSON.stringify(updatedHistory));
      toast.success('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete the course');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Courses</h1>
            <p className="text-gray-500 mt-2">
              Upload documents to create AI-generated courses
            </p>
          </div>
          
          {/* Upload button for new documents */}
          <div className="mt-4 md:mt-0">
            <Upload onFileUploaded={handleFileUploaded} />
          </div>
        </div>

        {/* Display when no courses are available */}
        {courseHistory.length === 0 && !isUploading && (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <UploadCloud className="w-16 h-16 mx-auto text-gray-400" />
            <h2 className="mt-4 text-xl font-medium">No courses yet</h2>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Upload your first document to get started with AI-generated courses.
            </p>
            <div className="mt-6">
              <Upload onFileUploaded={handleFileUploaded} />
            </div>
          </div>
        )}

        {/* Course list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {courseHistory.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1 text-lg">{course.title}</CardTitle>
                <CardDescription>
                  Created {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {course.description || 'No description available.'}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between pt-2 border-t">
                <Link to={`/courses/${course.id}`}>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </Link>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
