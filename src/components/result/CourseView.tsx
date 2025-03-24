
import React, { useState } from 'react';
import { CourseType } from '@/utils/processingUtils';
import ModuleList from './ModuleList';
import LessonDetail from './LessonDetail';

interface CourseViewProps {
  course: CourseType;
}

const CourseView: React.FC<CourseViewProps> = ({ course }) => {
  const [activeLesson, setActiveLesson] = useState(0);
  
  if (!course) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ModuleList 
        course={course} 
        activeLesson={activeLesson} 
        setActiveLesson={setActiveLesson} 
      />
      
      <LessonDetail 
        activeLesson={activeLesson} 
        module={course.modules[activeLesson]} 
      />
    </div>
  );
};

export default CourseView;
