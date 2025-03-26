
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getUserCourses, deleteCourse } from '@/utils/db/dynamoDBService';
import { toast } from 'sonner';

interface CourseItem {
  user_id: string;
  id: string;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchUserCourses();
  }, [user, navigate]);

  const fetchUserCourses = async () => {
    if (!user) return;
    
    try {
      const userCourses = await getUserCourses(user.username);
      setCourses(userCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load your courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!user) return;
    
    try {
      await deleteCourse(user.username, courseId);
      toast.success('Course deleted successfully');
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success('Successfully logged out');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Layout>
      <div className="container py-16 px-4 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Courses</h1>
            <p className="text-muted-foreground mt-1">
              {user ? `Welcome back, ${user.attributes.name || user.username}` : 'Loading...'}
            </p>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="default" 
              onClick={() => navigate('/')}
            >
              Create New Course
            </Button>
            <Button 
              variant="outline"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium text-gray-700 mb-4">No courses created yet</h2>
            <p className="text-muted-foreground mb-8">
              Upload your first document to start creating interactive courses
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/')}
            >
              Upload Document
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    Created on {formatDate(course.created_at)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {course.description || 'No description available'}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    asChild
                  >
                    <Link to={`/course/${course.id}`}>
                      View Course
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
