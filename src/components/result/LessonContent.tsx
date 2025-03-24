
import React from 'react';
import KnowledgeCheck from './KnowledgeCheck';
import { Separator } from "@/components/ui/separator";

interface LessonContentProps {
  content: string;
  quiz?: {
    question: string;
    options: string[];
    answer?: number;
  };
}

const LessonContent: React.FC<LessonContentProps> = ({ content, quiz }) => {
  // Split content by paragraphs for better readability
  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');

  return (
    <div className="space-y-6">
      <h5 className="text-sm font-medium text-muted-foreground mb-2">Lesson Content</h5>
      
      <div className="prose max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
      
      <Separator className="my-6" />
      
      {quiz && <KnowledgeCheck quiz={quiz} />}
    </div>
  );
};

export default LessonContent;
