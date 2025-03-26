
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  configureAuth, 
  getCurrentUser, 
  signIn, 
  signUp, 
  signOut, 
  confirmSignUp, 
  isAuthenticated 
} from '@/utils/auth/awsAuthService';

interface User {
  username: string;
  attributes: {
    email: string;
    name?: string;
    [key: string]: any;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, email: string, name: string) => Promise<void>;
  confirmSignUp: (username: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    configureAuth();
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser({
          username: currentUser.username,
          attributes: currentUser.attributes,
        });
      }
    } catch (err) {
      console.error('Error checking current user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await signIn(username, password);
      setUser({
        username: userData.username,
        attributes: userData.attributes,
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (username: string, password: string, email: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await signUp(username, password, email, name);
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (username: string, code: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await confirmSignUp(username, code);
    } catch (err: any) {
      setError(err.message || 'An error occurred during confirmation');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await signOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign out');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleIsAuthenticated = async () => {
    return await isAuthenticated();
  };

  const value = {
    user,
    loading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    confirmSignUp: handleConfirmSignUp,
    signOut: handleSignOut,
    isAuthenticated: handleIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
