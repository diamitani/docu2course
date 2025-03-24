
import React, { useState } from 'react';
import Upload from '@/components/Upload';
import ProcessingVisual from '@/components/ProcessingVisual';
import ResultView from '@/components/ResultView';
import ApiKeyForm from '@/components/ApiKeyForm';
import { Button } from '@/components/ui/button';
import { CourseType, FAQType, processDocument, simulateProgress } from '@/utils/processingUtils';
import { toast } from "sonner";

interface UploadSectionProps {
  hasApiKey: boolean;
  setHasApiKey: (value: boolean) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ hasApiKey, setHasApiKey }) => {
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

  const handleApiKeySet = (data: { apiKey: string, apiType: 'openai' | 'deepseek' }) => {
    setHasApiKey(true);
  };

  const handleProcess = async () => {
    if (!file) {
      toast.error("Please upload a document first");
      return;
    }
    
    if (!hasApiKey) {
      toast.error("Please set your API key first");
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

  return (
    <section id="upload-section" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Try It Yourself</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground text-lg">Upload a document to see the transformation</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {!hasApiKey && (
            <ApiKeyForm onApiKeySet={handleApiKeySet} isLoading={isProcessing} />
          )}
          
          {hasApiKey && (
            <div className="mb-4 text-right">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setHasApiKey(false);
                }}
              >
                Change API Key
              </Button>
            </div>
          )}
          
          <Upload onFileUploaded={handleFileUploaded} />
          
          {file && !isProcessing && !result.course && hasApiKey && (
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
  );
};

export default UploadSection;
