
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface UploadProps {
  onFileUploaded: (file: File) => void;
}

const Upload: React.FC<UploadProps> = ({ onFileUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (selectedFile: File) => {
    // Support more file types, especially PDF
    const allowedTypes = [
      'application/pdf', 
      'text/plain', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/markdown',
      'text/html',
      'text/csv'
    ];
    
    // Check file size
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      toast.error("File size exceeds 10MB limit");
      return;
    }
    
    // Just show a warning for unsupported file types, but still process them
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.warning(`File type '${selectedFile.type}' is not officially supported. We'll try to process it, but results may vary.`);
    } else {
      toast.success(`File "${selectedFile.name}" uploaded successfully`);
    }
    
    setFile(selectedFile);
    onFileUploaded(selectedFile);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`upload-area cursor-pointer ${isDragging ? 'border-primary bg-primary/10' : ''} ${file ? 'bg-green-50 border-green-200' : ''}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInputChange}
        accept=".pdf,.txt,.doc,.docx,.md,.html,.csv"
      />
      
      <div className="flex flex-col items-center justify-center text-center">
        {file ? (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="text-xl font-medium mb-2">{file.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
            >
              Change File
            </Button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Upload Your Document</h3>
            <p className="text-sm text-muted-foreground mb-4">Drag and drop your file here, or click to browse</p>
            <p className="text-xs text-muted-foreground">Supports PDF, TXT, DOC, DOCX, MD, HTML, CSV (Max 10MB)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
