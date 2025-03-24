
import React from 'react';

interface ActivitiesTabProps {
  activities?: string[];
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ activities = [] }) => {
  return (
    <>
      <h5 className="text-sm font-medium text-muted-foreground mb-2">Practice Activities</h5>
      {activities && activities.length > 0 ? (
        <ul className="space-y-3">
          {activities.map((activity, i) => (
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
    </>
  );
};

export default ActivitiesTab;
