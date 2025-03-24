
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LessonContent from './LessonContent';
import ActivitiesTab from './ActivitiesTab';
import ResourcesTab from './ResourcesTab';

interface LessonDetailProps {
  activeLesson: number;
  module: {
    title: string;
    content: string;
    objectives: string[];
    activities?: string[];
    resources?: string[];
    quiz?: {
      question: string;
      options: string[];
      answer?: number;
    };
  };
}

const LessonDetail: React.FC<LessonDetailProps> = ({ activeLesson, module }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'activities' | 'resources'>('content');

  return (
    <div className="md:col-span-2">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <span className="text-primary font-medium">{activeLesson + 1}</span>
            </div>
            <h4 className="text-xl font-medium">{module.title}</h4>
          </div>
          
          <div className="mb-6">
            <h5 className="text-sm font-medium text-muted-foreground mb-2">Learning Objectives</h5>
            <ul className="space-y-2">
              {module.objectives.map((objective, i) => (
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
              <LessonContent content={module.content} quiz={module.quiz} />
            </TabsContent>
            
            <TabsContent value="activities">
              <ActivitiesTab activities={module.activities} />
            </TabsContent>
            
            <TabsContent value="resources">
              <ResourcesTab resources={module.resources} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonDetail;
