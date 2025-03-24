
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Ready to Transform Your Documents?</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground text-lg mb-8">
            Convert manuals, guides, and any documentation into engaging learning experiences
          </p>
          
          <div className="mt-8">
            <Button size="lg" onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Now - Free!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
