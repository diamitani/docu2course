
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetchProjects = async () => {
      setIsLoading(true);
      const isAuth = await isAuthenticated();
      
      if (!isAuth) {
        navigate('/login', { 
          state: { 
            from: '/dashboard',
            message: 'Please sign in to view your dashboard' 
          } 
        });
        return;
      }
      
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
    
    checkAuthAndFetchProjects();
  }, [navigate, isAuthenticated]);

  const createNewProject = () => {
    navigate('/projects/new');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-7xl mx-auto py-16 px-4">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Card>
            <CardContent className="p-6 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={createNewProject}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
            <CardDescription>
              Manage and view all your projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first project
                </p>
                <Button className="mt-4" onClick={createNewProject}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.description || "No description"}</TableCell>
                      <TableCell>{formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/project/${project.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserDashboard;
