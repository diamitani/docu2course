
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { CourseType, FAQType } from '@/utils/processingUtils';

interface ResultViewProps {
  course: CourseType | null;
  faq: FAQType | null;
}

const ResultView: React.FC<ResultViewProps> = ({ course, faq }) => {
  const [activeLesson, setActiveLesson] = useState(0);
  
  if (!course && !faq) return null;

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
                      
                      <div className="prose max-w-none">
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">Lesson Content</h5>
                        <p className="whitespace-pre-line">{course.modules[activeLesson].content}</p>
                      </div>
                      
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
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-6 space-x-3">
          <Button variant="outline">Download</Button>
          <Button>Save to Library</Button>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
