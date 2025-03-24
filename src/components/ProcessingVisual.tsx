
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface ProcessingVisualProps {
  isProcessing: boolean;
  progress: number;
}

const ProcessingVisual: React.FC<ProcessingVisualProps> = ({ isProcessing, progress }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Extracting Text", 
    "Structuring Content", 
    "Generating Course", 
    "Creating FAQ",
    "Finalizing"
  ];
  
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          // Calculate based on progress ranges
          if (progress < 20) return 0;
          if (progress < 40) return 1;
          if (progress < 60) return 2;
          if (progress < 80) return 3;
          return 4;
        });
      }, 500); // Update faster for better UX
      
      return () => clearInterval(interval);
    } else {
      setCurrentStep(0);
    }
  }, [isProcessing, progress]);

  if (!isProcessing) return null;

  return (
    <div className="my-12 max-w-md mx-auto">
      <div className="glass-panel rounded-xl p-6 overflow-hidden">
        <h3 className="text-lg font-medium mb-4">Processing Document</h3>
        
        <Progress value={progress} className="h-2 mb-6" />
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors duration-300 ${index <= currentStep ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                {index < currentStep ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div>
                <div className="text-sm font-medium">{step}</div>
                {index === currentStep && (
                  <div className="text-xs text-muted-foreground">
                    {index === 0 && "Reading and parsing document content..."}
                    {index === 1 && "Identifying sections and organizing data..."}
                    {index === 2 && "Creating lessons and quiz elements..."}
                    {index === 3 && "Generating frequently asked questions..."}
                    {index === 4 && "Polishing and preparing output..."}
                  </div>
                )}
              </div>
              {index === currentStep && (
                <div className="ml-auto">
                  <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessingVisual;
