import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthUser {
  username: string;
  attributes: Record<string, string>;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          const { id, email, user_metadata } = currentSession.user;
          setUser({
            username: email || id,
            attributes: {
              ...user_metadata,
              email: email || '',
              name: user_metadata?.name || email || id,
            },
          });
        } else {
          setUser(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        const { id, email, user_metadata } = currentSession.user;
        setUser({
          username: email || id,
          attributes: {
            ...user_metadata,
            email: email || '',
            name: user_metadata?.name || email || id,
          },
        });
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (email: string, code: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'signup'
      });
      
      if (error) throw error;
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
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign out');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleIsAuthenticated = async () => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
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
