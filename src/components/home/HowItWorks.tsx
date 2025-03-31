
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface HowItWorksProps {
  id?: string;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ id = "how-it-works" }) => {
  return (
    <section id={id} className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">How It Works</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground text-lg">Turn your documents into engaging learning experiences in minutes</p>
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
  );
};

export default HowItWorks;
