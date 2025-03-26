
import { Auth } from 'aws-amplify';
import { cognitoConfig } from '@/config/aws-config';

// Initialize AWS Amplify
export const configureAuth = () => {
  Auth.configure({
    region: cognitoConfig.region,
    userPoolId: cognitoConfig.userPoolId,
    userPoolWebClientId: cognitoConfig.userPoolWebClientId,
    authenticationFlowType: cognitoConfig.authenticationFlowType,
  });
};

// Sign up a new user
export const signUp = async (
  username: string, 
  password: string, 
  email: string,
  name: string
) => {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        name,
      },
    });
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Confirm sign up with verification code
export const confirmSignUp = async (username: string, code: string) => {
  try {
    return await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.error('Error confirming sign up:', error);
    throw error;
  }
};

// Sign in a user
export const signIn = async (username: string, password: string) => {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign out a user
export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get current authenticated user
export const getCurrentUser = async () => {
  try {
    return await Auth.currentAuthenticatedUser();
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Get current session
export const getCurrentSession = async () => {
  try {
    return await Auth.currentSession();
  } catch (error) {
    console.error('Error getting current session:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch (error) {
    return false;
  }
};
