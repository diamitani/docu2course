
import React from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-4 h-40 animate-pulse">
            <div className="w-3/4 h-6 bg-gray-200 rounded mb-4"></div>
            <div className="w-full h-12 bg-gray-100 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="w-1/3 h-4 bg-gray-100 rounded"></div>
              <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating your first project
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          description={project.description}
          createdAt={project.created_at}
        />
      ))}
    </div>
  );
};

export default ProjectList;
