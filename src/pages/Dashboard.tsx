import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Eye, Trash2, File, Upload, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { getSavedCourses, deleteSavedCourse } from '@/utils/processingUtils';
import Upload from '@/components/Upload';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { processDocument, generateCourseFromPrompt } from '@/utils/processingUtils';
import ProcessingVisual from '@/components/ProcessingVisual';

const Dashboard = () => {
  const navigate = useNavigate();
  const [savedCourses, setSavedCourses] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("history");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [promptInput, setPromptInput] = useState('');
  const [promptTitle, setPromptTitle] = useState('');
  
  useEffect(() => {
    // Load saved courses
    const courses = getSavedCourses();
    setSavedCourses(courses);
  }, []);
  
  const handleFileUploaded = (file: File) => {
    setCurrentFile(file);
  };
  
  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const success = deleteSavedCourse(id);
      if (success) {
        // Update the list
        setSavedCourses(getSavedCourses());
        toast.success('Course deleted');
      } else {
        toast.error('Failed to delete course');
      }
    }
  };
  
  const handleProcessDocument = async () => {
    if (!currentFile) {
      toast.error("Please upload a document first");
      return;
    }
    
    setIsProcessing(true);
    setProgress(0);
    
    // Import the simulation function dynamically to keep this component clean
    const { simulateProgress } = await import('@/utils/processingUtils');
    const stopProgress = simulateProgress(setProgress);
    
    try {
      // Process the document
      await processDocument(currentFile);
      
      // Stop progress simulation
      stopProgress();
      setProgress(100);
      
      // Update course list and show success
      setTimeout(() => {
        setIsProcessing(false);
        setSavedCourses(getSavedCourses());
        toast.success("Document successfully processed!");
        // Reset file selection after processing
        setCurrentFile(null);
        // Switch to history tab to show the new course
        setActiveTab("history");
      }, 500);
    } catch (error) {
      console.error('Error processing document:', error);
      setIsProcessing(false);
      stopProgress();
      setProgress(0);
      toast.error(`Failed to process document: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  
  const handleGenerateFromPrompt = async () => {
    if (!promptInput.trim()) {
      toast.error("Please enter a prompt for course generation");
      return;
    }
    
    setIsProcessing(true);
    setProgress(0);
    
    // Import the simulation function dynamically
    const { simulateProgress } = await import('@/utils/processingUtils');
    const stopProgress = simulateProgress(setProgress);
    
    try {
      // Generate course from prompt
      await generateCourseFromPrompt(promptTitle.trim() || "Custom Course", promptInput);
      
      // Stop progress simulation
      stopProgress();
      setProgress(100);
      
      // Update course list and show success
      setTimeout(() => {
        setIsProcessing(false);
        setSavedCourses(getSavedCourses());
        toast.success("Course successfully generated!");
        // Reset prompt after processing
        setPromptInput('');
        setPromptTitle('');
        // Switch to history tab to show the new course
        setActiveTab("history");
      }, 500);
    } catch (error) {
      console.error('Error generating course from prompt:', error);
      setIsProcessing(false);
      stopProgress();
      setProgress(0);
      toast.error(`Failed to generate course: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  
  const viewCourse = (courseId: string) => {
    // Instead of navigating, we'll create a URL parameter to pass to the home page
    // This will trigger the display of a specific course
    navigate(`/?courseId=${courseId}`);
  };
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto py-24 px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="history">Course History</TabsTrigger>
            <TabsTrigger value="create">Create Course</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Generated Courses</CardTitle>
                <CardDescription>
                  View and manage courses you've created
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savedCourses.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <File className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No courses yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Create your first course by uploading a document or generating from a prompt.
                    </p>
                    <Button 
                      className="mt-4" 
                      onClick={() => setActiveTab("create")}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Create Course
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedCourses.map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg truncate">{course.course.title}</CardTitle>
                          <CardDescription className="flex items-center text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {format(new Date(course.timestamp), 'MMM d, yyyy')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-sm line-clamp-3 text-gray-600">
                            {course.course.description || 'No description available'}
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <File className="h-3 w-3 mr-1" />
                            {course.fileName} ({Math.round(course.fileSize / 1024)} KB)
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            {course.course.modules.length} modules
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between">
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => viewCourse(course.id)}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New Course</CardTitle>
                <CardDescription>
                  Upload a document or generate from a prompt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload" className="mt-6">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="upload">Upload Document</TabsTrigger>
                    <TabsTrigger value="prompt">Create with Prompt</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload">
                    <Upload onFileUploaded={handleFileUploaded} />
                    
                    {currentFile && !isProcessing && (
                      <div className="mt-8 text-center">
                        <Button size="lg" onClick={handleProcessDocument}>
                          Process Document
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="prompt">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="prompt-title">Course Title (Optional)</Label>
                        <Input
                          id="prompt-title"
                          placeholder="Enter a title for your course"
                          value={promptTitle}
                          onChange={(e) => setPromptTitle(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="prompt-input">Your Prompt</Label>
                        <Textarea
                          id="prompt-input"
                          placeholder="Describe the course you want to create in detail. For example: Create a comprehensive course on machine learning fundamentals for beginners..."
                          value={promptInput}
                          onChange={(e) => setPromptInput(e.target.value)}
                          className="min-h-[150px] mt-1"
                        />
                      </div>
                      
                      {!isProcessing && (
                        <div className="text-center mt-4">
                          <Button size="lg" onClick={handleGenerateFromPrompt}>
                            Generate Course
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Processing Visual */}
        {isProcessing && (
          <div className="mt-8">
            <ProcessingVisual isProcessing={isProcessing} progress={progress} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
