
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
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
            <Button size="lg" variant="outline" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              See Features
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
  );
};

export default HeroSection;
