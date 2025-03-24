
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseType, FAQType } from '@/utils/processingUtils';
import { toast } from "sonner";
import CourseView from './result/CourseView';
import FAQView from './result/FAQView';
import ContentActions from './result/ContentActions';

interface ResultViewProps {
  course: CourseType | null;
  faq: FAQType | null;
}

const ResultView: React.FC<ResultViewProps> = ({ course, faq }) => {
  if (!course && !faq) return null;

  const handleDownload = () => {
    try {
      // Determine which content to download based on active tab
      const contentType = document.querySelector('[role="tablist"] [data-state="active"]')?.getAttribute('value') || 'course';
      
      let content = '';
      let filename = '';
      
      if (contentType === 'course' && course) {
        filename = `${course.title.replace(/\s+/g, '_').toLowerCase()}.md`;
        content = `# ${course.title}\n\n${course.description}\n\n`;
        
        course.modules.forEach((module, index) => {
          content += `## Module ${index + 1}: ${module.title}\n\n`;
          
          content += `### Learning Objectives\n\n`;
          module.objectives.forEach(obj => {
            content += `- ${obj}\n`;
          });
          content += `\n### Content\n\n${module.content}\n\n`;
          
          if (module.activities && module.activities.length > 0) {
            content += `### Activities\n\n`;
            module.activities.forEach((activity, i) => {
              content += `${i + 1}. ${activity}\n`;
            });
            content += `\n`;
          }
          
          if (module.resources && module.resources.length > 0) {
            content += `### Resources\n\n`;
            module.resources.forEach((resource) => {
              content += `- ${resource}\n`;
            });
            content += `\n`;
          }
          
          if (module.quiz) {
            content += `### Knowledge Check\n\n`;
            content += `Question: ${module.quiz.question}\n\n`;
            content += `Options:\n`;
            module.quiz.options.forEach((opt, i) => {
              content += `${i + 1}. ${opt}\n`;
            });
            content += `\nCorrect Answer: ${module.quiz.options[module.quiz.answer || 0]}\n\n`;
          }
        });
      } else if (contentType === 'faq' && faq) {
        filename = `${faq.title.replace(/\s+/g, '_').toLowerCase()}_faq.md`;
        content = `# ${faq.title}\n\n${faq.description}\n\n`;
        
        faq.questions.forEach((q, index) => {
          content += `## Q${index + 1}: ${q.question}\n\n${q.answer}\n\n`;
          content += `Tags: ${q.tags.join(', ')}\n\n`;
        });
      } else {
        toast.error("No content available to download");
        return;
      }
      
      // Create a blob and trigger download
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`Downloaded ${filename}`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download content");
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-5xl mx-auto glass-panel rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-medium mb-6">Generated Content</h2>
        
        <Tabs defaultValue="course" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="course">Course Format</TabsTrigger>
            <TabsTrigger value="faq">FAQ Format</TabsTrigger>
          </TabsList>
          
          <TabsContent value="course" className="animate-slide-up">
            {course && <CourseView course={course} />}
          </TabsContent>
          
          <TabsContent value="faq" className="animate-slide-up">
            {faq && <FAQView faq={faq} />}
          </TabsContent>
        </Tabs>
        
        <ContentActions onDownload={handleDownload} />
      </div>
    </div>
  );
};

export default ResultView;
