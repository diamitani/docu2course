
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Upload from '@/components/Upload';
import ProcessingVisual from '@/components/ProcessingVisual';
import ResultView from '@/components/ResultView';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CourseType, FAQType, processDocument, simulateProgress } from '@/utils/processingUtils';
import { toast } from "sonner";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ course: CourseType | null; faq: FAQType | null }>({
    course: null,
    faq: null,
  });

  const handleFileUploaded = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleProcess = async () => {
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
      // Process the document using DeepSeek API
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
      toast.error("Failed to process document. Please try again.");
    }
  };

  return (
    <Layout>
      <section className="min-h-[90vh] flex flex-col justify-center py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
              Transform Documents Into Interactive Learning
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight animate-slide-down">
              Turn Any Document Into<br />Interactive Courses & FAQs
            </h1>
            <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl animate-slide-down">
              Upload your PDFs, documents, and text files. Our AI instantly transforms them into structured courses and searchable knowledge bases.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-slide-down">
              <Button size="lg" onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                View Examples
              </Button>
            </div>
          </div>
          
          <div className="w-full max-w-5xl mx-auto relative mt-20 animate-fade-in">
            <div className="absolute -top-5 -left-5 w-20 h-20 bg-primary/10 rounded-full animate-pulse-subtle"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse-subtle"></div>
            
            <div className="glass-panel rounded-2xl p-6 md:p-8 relative z-10">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <h2 className="text-2xl font-medium mb-2">From Documents To Courses</h2>
                  <p className="text-muted-foreground">
                    Upload your PDFs, manuals, or text documents and automatically convert them into structured, interactive courses with lessons, objectives, and knowledge checks.
                  </p>
                </div>
                
                <div className="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-4"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                  <h2 className="text-2xl font-medium mb-2">Generate FAQ Knowledge Bases</h2>
                  <p className="text-muted-foreground">
                    Instantly create a searchable FAQ from your documentation. Extract key questions and answers to build comprehensive knowledge libraries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Turn your documents into engaging learning experiences in minutes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                </div>
                <h3 className="text-xl font-medium mb-2">1. Upload Document</h3>
                <p className="text-muted-foreground">
                  Upload your PDF, DOC, or TXT file through our intuitive interface. We support various document formats with advanced OCR for scanned content.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/></svg>
                </div>
                <h3 className="text-xl font-medium mb-2">2. AI Processing</h3>
                <p className="text-muted-foreground">
                  Our advanced AI analyzes your content, identifies key sections, extracts important concepts, and structures the information logically.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/></svg>
                </div>
                <h3 className="text-xl font-medium mb-2">3. Get Results</h3>
                <p className="text-muted-foreground">
                  Access your transformed content as interactive courses with lessons and quizzes, or as a comprehensive FAQ knowledge base. Download or save to your library.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section id="upload-section" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Try It Yourself</h2>
            <p className="section-subtitle">Upload a document to see the transformation</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Upload onFileUploaded={handleFileUploaded} />
            
            {file && !isProcessing && !result.course && (
              <div className="mt-8 text-center">
                <Button size="lg" onClick={handleProcess}>
                  Process Document
                </Button>
              </div>
            )}
            
            <ProcessingVisual isProcessing={isProcessing} progress={progress} />
            
            {(result.course || result.faq) && (
              <ResultView course={result.course} faq={result.faq} />
            )}
          </div>
        </div>
      </section>
      
      <section id="features" className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Key Features</h2>
            <p className="section-subtitle">Powerful tools to transform your documents into engaging learning experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-primary/10 p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Intelligent Content Structuring</h3>
              <p className="text-muted-foreground">Automatically identifies headings, sections, and key points to create logically organized courses.</p>
            </div>
            
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-primary/10 p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Multiple Document Formats</h3>
              <p className="text-muted-foreground">Support for PDFs, Word documents, text files, and more with advanced OCR for scanned content.</p>
            </div>
            
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-primary/10 p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Automated Quiz Generation</h3>
              <p className="text-muted-foreground">Creates relevant quiz questions and answers to reinforce learning and test comprehension.</p>
            </div>
            
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-primary/10 p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">FAQ Extraction</h3>
              <p className="text-muted-foreground">Identifies potential questions and answers to create a comprehensive, searchable knowledge base.</p>
            </div>
            
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-primary/10 p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="3" y2="21"/><line x1="15" x2="15" y1="3" y2="21"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Responsive Learning Modules</h3>
              <p className="text-muted-foreground">Access your courses on any device with fully responsive design and optimized viewing experience.</p>
            </div>
            
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-primary/10 p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m2 12 5.2-5.2M2 12l5.2 5.2"/><path d="m22 12-5.2-5.2M22 12l-5.2 5.2"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Export Options</h3>
              <p className="text-muted-foreground">Download your course materials in various formats including PDF, HTML, and SCORM for LMS integration.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">Ready to Transform Your Documents?</h2>
            <p className="section-subtitle">Convert manuals, guides, and any documentation into engaging learning experiences</p>
            
            <div className="mt-8">
              <Button size="lg" onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
