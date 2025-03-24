
import React from 'react';

const FeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Key Features</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground text-lg">Powerful tools to transform your documents into engaging learning experiences</p>
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
  );
};

export default FeaturesGrid;
