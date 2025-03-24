
import React from 'react';
import KnowledgeCheck from './KnowledgeCheck';

interface LessonContentProps {
  content: string;
  quiz?: {
    question: string;
    options: string[];
    answer?: number;
  };
}

const LessonContent: React.FC<LessonContentProps> = ({ content, quiz }) => {
  return (
    <>
      <h5 className="text-sm font-medium text-muted-foreground mb-2">Lesson Content</h5>
      <p className="whitespace-pre-line">{content}</p>
      
      {quiz && <KnowledgeCheck quiz={quiz} />}
    </>
  );
};

export default LessonContent;
