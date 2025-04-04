import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Upload from '@/components/Upload';  // Using default import for the Upload component
import ProcessingVisual from '@/components/ProcessingVisual';
import ResultView from '@/components/ResultView';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseType, FAQType, processDocument, generateCourseFromPrompt, simulateProgress, getSavedCourseById } from '@/utils/processingUtils';
import { toast } from "sonner";

const UploadSection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [promptInput, setPromptInput] = useState('');
  const [promptTitle, setPromptTitle] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ course: CourseType | null; faq: FAQType | null }>({
    course: null,
    faq: null,
  });
  const [activeTab, setActiveTab] = useState<'upload' | 'prompt'>('upload');
  
  // Check for courseId in URL parameters
  useEffect(() => {
    const courseId = searchParams.get('courseId');
    if (courseId) {
      const savedCourse = getSavedCourseById(courseId);
      if (savedCourse) {
        // Load the saved course
        setResult({
          course: savedCourse.course,
          faq: savedCourse.faq
        });
        // Clear the URL parameter without reloading
        navigate('/', { replace: true });
      }
    }
  }, [searchParams, navigate]);
  
  const handleFileUploaded = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleProcessDocument = async () => {
    if (!file) {
      toast.error("Please upload a document first");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setResult({ course: null, faq: null });

    // Start progress simulation
    const stopProgress = simulateProgress(setProgress);

    try {
      // Process the document using the selected API
      const data = await processDocument(file);
      
      // Stop progress simulation
      stopProgress();
      setProgress(100);
      
      // Update result after a brief delay
      setTimeout(() => {
        setResult(data);
        setIsProcessing(false);
        toast.success("Document successfully transformed!");
      }, 500);
    } catch (error) {
      setIsProcessing(false);
      stopProgress();
      setProgress(0);
      console.error('Error processing document:', error);
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
    setResult({ course: null, faq: null });

    // Start progress simulation
    const stopProgress = simulateProgress(setProgress);

    try {
      // Generate course from prompt
      const data = await generateCourseFromPrompt(promptTitle.trim() || "Custom Course", promptInput);
      
      // Stop progress simulation
      stopProgress();
      setProgress(100);
      
      // Update result after a brief delay
      setTimeout(() => {
        setResult(data);
        setIsProcessing(false);
        toast.success("Course successfully generated from your prompt!");
      }, 500);
    } catch (error) {
      setIsProcessing(false);
      stopProgress();
      setProgress(0);
      console.error('Error generating course from prompt:', error);
      toast.error(`Failed to generate course: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  return (
    <section id="upload-section" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Try It Yourself</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground text-lg">Transform documents into structured courses or create custom courses with prompts</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {!result.course && !isProcessing && (
            <>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'upload' | 'prompt')} className="mb-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Document</TabsTrigger>
                  <TabsTrigger value="prompt">Create with Prompt</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="mt-6">
                  <Upload onFileUploaded={handleFileUploaded} />
                  
                  {file && !isProcessing && !result.course && (
                    <div className="mt-8 text-center">
                      <Button size="lg" onClick={handleProcessDocument}>
                        Process Document
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="prompt" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
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
                        
                        {!isProcessing && !result.course && (
                          <div className="text-center mt-4">
                            <Button size="lg" onClick={handleGenerateFromPrompt}>
                              Generate Course
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                >
                  View Your Saved Courses
                </Button>
              </div>
            </>
          )}
          
          <ProcessingVisual isProcessing={isProcessing} progress={progress} />
          
          {(result.course || result.faq) && (
            <ResultView course={result.course} faq={result.faq} />
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
