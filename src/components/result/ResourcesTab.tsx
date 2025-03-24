
import React from 'react';

interface ResourcesTabProps {
  resources?: string[];
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ resources = [] }) => {
  return (
    <>
      <h5 className="text-sm font-medium text-muted-foreground mb-2">Additional Resources</h5>
      {resources && resources.length > 0 ? (
        <ul className="space-y-2">
          {resources.map((resource, i) => (
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
    </>
  );
};

export default ResourcesTab;
