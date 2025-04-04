
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  isAuthenticated: async () => true,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check for user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user data:', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate auth for the portfolio site
      const userData = { name: 'Demo User', email, id: '123456' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: UserData) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate signup for the portfolio site
      const newUser = { ...userData, email, id: '123456' };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  const confirmSignUp = async (email: string, code: string) => {
    setLoading(true);
    setError(null);
    try {
      // For portfolio site, just simulate confirmation
      console.log(`Confirming signup for ${email} with code ${code}`);
    } catch (err: any) {
      setError(err.message || 'Failed to confirm sign up');
      console.error('Confirm sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // Clear user data
      setUser(null);
      localStorage.removeItem('user');
    } catch (err: any) {
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = async () => {
    return !!user;
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
