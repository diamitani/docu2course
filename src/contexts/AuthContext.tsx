
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  getCurrentUser, 
  signIn as authSignIn,
  signUp as authSignUp,
  confirmSignUp as authConfirmSignUp,
  signOut as authSignOut,
  isAuthenticated as authIsAuthenticated
} from '@/utils/auth/awsAuthService';

interface UserData {
  name?: string;
  email?: string;
  id?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: UserData) => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: () => Promise<boolean>;
}

const defaultContext: AuthContextType = {
  user: null,
  loading: false,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  confirmSignUp: async () => {},
  signOut: async () => {},
  isAuthenticated: async () => false,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize user data from Supabase session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session && session.user) {
              setUser({
                id: session.user.id,
                email: session.user.email,
                name: session.user.user_metadata.username || session.user.email?.split('@')[0],
              });
            } else {
              setUser(null);
            }
            setLoading(false);
          }
        );

        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata.username || session.user.email?.split('@')[0],
          });
        }

        setLoading(false);
        return () => {
          subscription.unsubscribe();
        };
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await authSignIn(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: UserData) => {
    setLoading(true);
    setError(null);
    try {
      await authSignUp(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmSignUp = async (email: string, code: string) => {
    setLoading(true);
    setError(null);
    try {
      await authConfirmSignUp(email, code);
    } catch (err: any) {
      setError(err.message || 'Failed to confirm sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await authSignOut();
      setUser(null);
    } catch (err: any) {
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = async () => {
    return authIsAuthenticated();
  };

  const contextValue = {
    user,
    loading,
    error,
    signIn,
    signUp,
    confirmSignUp,
    signOut,
    isAuthenticated,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
