
import React from 'react';
import { CourseType } from '@/utils/processingUtils';

interface ModuleListProps {
  course: CourseType;
  activeLesson: number;
  setActiveLesson: (index: number) => void;
}

const ModuleList: React.FC<ModuleListProps> = ({ 
  course, 
  activeLesson, 
  setActiveLesson 
}) => {
  return (
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
  );
};

export default ModuleList;
