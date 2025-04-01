
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import ProjectList from '@/components/projects/ProjectList';
import CreateProjectDialog from '@/components/projects/CreateProjectDialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

const Projects = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setProjects(data || []);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        navigate('/login', { 
          state: { 
            from: '/projects',
            message: 'Please sign in to view your projects' 
          } 
        });
        return;
      }
      
      fetchProjects();
    };
    
    checkAuth();
  }, [user, navigate, isAuthenticated]);

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <CreateProjectDialog onProjectCreated={fetchProjects} />
        </div>
        
        <Card>
          <CardContent className="p-6">
            <ProjectList projects={projects} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Projects;
