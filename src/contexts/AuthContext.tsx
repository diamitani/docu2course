
import React, { createContext, useContext } from 'react';

interface AuthContextType {
  user: null;
  loading: boolean;
  error: null;
  signIn: () => Promise<void>;
  signUp: () => Promise<void>;
  confirmSignUp: () => Promise<void>;
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
  return <AuthContext.Provider value={defaultContext}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
