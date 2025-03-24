
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { CourseType, FAQType } from '@/utils/processingUtils';
import { toast } from "sonner";

interface ResultViewProps {
  course: CourseType | null;
  faq: FAQType | null;
}

const ResultView: React.FC<ResultViewProps> = ({ course, faq }) => {
  const [activeLesson, setActiveLesson] = useState(0);
  const [activeTab, setActiveTab] = useState<'content' | 'activities' | 'resources'>('content');
  
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
            {course && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4 md:col-span-1">
                  <h3 className="text-lg font-medium mb-4">Course Modules</h3>
                  <div className="space-y-2">
                    {course.modules.map((module, index) => (
                      <button
                        key={index}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeLesson === index ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveLesson(index)}
                      >
                        <div className="text-sm font-medium">{module.title}</div>
                        {activeLesson !== index && (
                          <div className="text-xs text-muted-foreground mt-1 truncate">
                            {module.content.substring(0, 40)}...
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-primary font-medium">{activeLesson + 1}</span>
                        </div>
                        <h4 className="text-xl font-medium">{course.modules[activeLesson].title}</h4>
                      </div>
                      
                      <div className="mb-6">
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">Learning Objectives</h5>
                        <ul className="space-y-2">
                          {course.modules[activeLesson].objectives.map((objective, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'content' | 'activities' | 'resources')}>
                        <TabsList className="mb-4">
                          <TabsTrigger value="content">Lesson</TabsTrigger>
                          <TabsTrigger value="activities">Activities</TabsTrigger>
                          <TabsTrigger value="resources">Resources</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="content" className="prose max-w-none">
                          <h5 className="text-sm font-medium text-muted-foreground mb-2">Lesson Content</h5>
                          <p className="whitespace-pre-line">{course.modules[activeLesson].content}</p>
                          
                          {course.modules[activeLesson].quiz && (
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                              <h5 className="text-sm font-medium mb-3">Knowledge Check</h5>
                              <p className="mb-4">{course.modules[activeLesson].quiz.question}</p>
                              
                              <div className="space-y-2">
                                {course.modules[activeLesson].quiz.options.map((option, i) => (
                                  <div key={i} className="flex items-center">
                                    <input 
                                      type="radio" 
                                      id={`option-${i}`} 
                                      name="quiz-option" 
                                      className="mr-2"
                                    />
                                    <label htmlFor={`option-${i}`}>{option}</label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="activities">
                          <h5 className="text-sm font-medium text-muted-foreground mb-2">Practice Activities</h5>
                          {course.modules[activeLesson].activities && course.modules[activeLesson].activities.length > 0 ? (
                            <ul className="space-y-3">
                              {course.modules[activeLesson].activities.map((activity, i) => (
                                <li key={i} className="p-3 border rounded-md">
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                      <span className="text-primary font-medium text-xs">{i + 1}</span>
                                    </div>
                                    <span>{activity}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No activities available for this module.</p>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="resources">
                          <h5 className="text-sm font-medium text-muted-foreground mb-2">Additional Resources</h5>
                          {course.modules[activeLesson].resources && course.modules[activeLesson].resources.length > 0 ? (
                            <ul className="space-y-2">
                              {course.modules[activeLesson].resources.map((resource, i) => (
                                <li key={i} className="flex items-start">
                                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                  </svg>
                                  <span>{resource}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No additional resources for this module.</p>
                          )}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="faq" className="animate-slide-up">
            {faq && (
              <div>
                <div className="mb-4">
                  <input 
                    type="text" 
                    placeholder="Search FAQs..." 
                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                
                <div className="divide-y">
                  {faq.questions.map((item, index) => (
                    <details key={index} className="group py-4">
                      <summary className="flex justify-between items-center cursor-pointer list-none">
                        <h3 className="text-lg font-medium pr-6">{item.question}</h3>
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
                        <p className="whitespace-pre-line">{item.answer}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-6 space-x-3">
          <Button variant="outline" onClick={handleDownload}>Download</Button>
          <Button>Save to Library</Button>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
