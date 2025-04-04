
import { supabase } from '@/integrations/supabase/client';

// Configure authentication using Supabase
export const configureAuth = () => {
  // No configuration needed for Supabase client
};

// Get the current user from Supabase
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return !!user;
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    throw error;
  }
  
  return data.user;
};

// Sign up with email and password
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  
  if (error) {
    throw error;
  }
  
  return data.user;
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
  
  return null;
};

// Confirm sign up with code
export const confirmSignUp = async (email: string, token: string) => {
  // Supabase handles email confirmation differently, this is a stub
  // This would be used if we were manually handling token verification
  return null;
};
