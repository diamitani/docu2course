
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AuthMiddlewareProps {
  children: React.ReactNode;
  requirePro?: boolean;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ 
  children, 
  requirePro = false 
}) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProUser, setIsProUser] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const isAuth = await isAuthenticated();
      
      if (!isAuth) {
        navigate('/login', { 
          state: { 
            from: window.location.pathname,
            message: 'Please sign in to access this page' 
          } 
        });
        return;
      }

      if (requirePro) {
        try {
          // Fixed: Using a direct query to profiles instead of an invalid relation
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('is_pro')
            .eq('id', user?.attributes.sub)
            .single();
          
          if (error) throw error;
          
          if (!profile?.is_pro) {
            setIsProUser(false);
            navigate('/subscription', { 
              state: { 
                from: window.location.pathname,
                message: 'This feature requires a premium subscription' 
              } 
            });
            return;
          }
          
          setIsProUser(true);
        } catch (error) {
          console.error('Error checking subscription status:', error);
          setIsProUser(false);
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [user, navigate, isAuthenticated, requirePro]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthMiddleware;
