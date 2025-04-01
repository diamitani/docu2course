
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, description, createdAt }) => {
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 line-clamp-2 h-10">
          {description || "No description provided"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-xs text-gray-500">Created {formattedDate}</span>
        <Button size="sm" variant="outline" asChild>
          <Link to={`/project/${id}`}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
