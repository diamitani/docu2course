
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

// Simplified middleware that checks authentication
const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        
        if (!authenticated) {
          // Redirect to login with return path
          toast.error('Please sign in to continue');
          navigate('/login', { 
            state: { 
              from: location.pathname,
              message: 'Please sign in to continue' 
            } 
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error('Authentication error');
      } finally {
        setChecking(false);
      }
    };
    
    checkAuth();
  }, [navigate, isAuthenticated, location.pathname]);

  if (checking) {
    // Display loading state while checking authentication
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthMiddleware;
