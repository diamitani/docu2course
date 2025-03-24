
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface FAQItemProps {
  question: string;
  answer: string;
  tags: string[];
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, tags }) => {
  return (
    <details className="group py-4">
      <summary className="flex justify-between items-center cursor-pointer list-none">
        <h3 className="text-lg font-medium pr-6">{question}</h3>
        <svg 
          className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="mt-3 text-muted-foreground">
        <p className="whitespace-pre-line">{answer}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, tagIndex) => (
            <Badge key={tagIndex} variant="outline" className="bg-primary/10 text-primary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </details>
  );
};

export default FAQItem;
