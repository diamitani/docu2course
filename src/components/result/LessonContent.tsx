
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
  // Process markdown-style formatting in content
  const processContent = (content: string) => {
    // Split content by paragraphs for better readability
    const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
    
    return paragraphs.map((paragraph, index) => {
      // Handle bullet points
      if (paragraph.trim().startsWith('* ') || paragraph.trim().startsWith('- ')) {
        const items = paragraph.split('\n').filter(item => item.trim());
        return (
          <ul key={index} className="list-disc pl-6 mb-4 space-y-1">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^\*\s|-\s/, '')}</li>
            ))}
          </ul>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\.\s/.test(paragraph.trim())) {
        const items = paragraph.split('\n').filter(item => item.trim());
        return (
          <ol key={index} className="list-decimal pl-6 mb-4 space-y-1">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
            ))}
          </ol>
        );
      }
      
      // Handle headers
      if (paragraph.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold mb-4">{paragraph.replace(/^#\s/, '')}</h2>;
      }
      if (paragraph.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-bold mb-3">{paragraph.replace(/^##\s/, '')}</h3>;
      }
      if (paragraph.startsWith('### ')) {
        return <h4 key={index} className="text-lg font-bold mb-2">{paragraph.replace(/^###\s/, '')}</h4>;
      }
      
      // Handle bold and italic text
      let processedText = paragraph
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/\_\_([^_]+)\_\_/g, '<strong>$1</strong>')
        .replace(/\_([^_]+)\_/g, '<em>$1</em>');
      
      // Regular paragraph
      return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: processedText }} />;
    });
  };

  return (
    <div className="space-y-6">
      <h5 className="text-sm font-medium text-muted-foreground mb-2">Lesson Content</h5>
      
      <div className="prose max-w-none">
        {processContent(content)}
      </div>
      
      <Separator className="my-6" />
      
      {quiz && <KnowledgeCheck quiz={quiz} />}
    </div>
  );
};

export default LessonContent;
