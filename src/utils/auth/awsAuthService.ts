
import { Amplify } from 'aws-amplify';
import { signIn as amplifySignIn, signUp as amplifySignUp, confirmSignUp as amplifyConfirmSignUp, signOut as amplifySignOut, fetchUserAttributes, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { cognitoConfig } from '@/config/aws-config';

// Configure Amplify with our Cognito settings
export const configureAuth = () => {
  Amplify.configure({
    Auth: {
      ...cognitoConfig
    }
  });
};

// Sign in a user
export const signIn = async (username: string, password: string) => {
  try {
    const signInOutput = await amplifySignIn({
      username,
      password,
    });
    
    if (signInOutput.isSignedIn) {
      const userAttributes = await fetchUserAttributes();
      const currentUser = await getCurrentUser();
      
      return {
        username: currentUser.username,
        attributes: userAttributes
      };
    } else {
      throw new Error('Sign in failed');
    }
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign up a new user
export const signUp = async (username: string, password: string, email: string, name: string) => {
  try {
    const { isSignUpComplete, userId } = await amplifySignUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
          name
        },
        autoSignIn: true
      }
    });
    
    return { isSignUpComplete, userId };
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Confirm sign up with verification code
export const confirmSignUp = async (username: string, confirmationCode: string) => {
  try {
    const { isSignUpComplete } = await amplifyConfirmSignUp({
      username,
      confirmationCode
    });
    
    return isSignUpComplete;
  } catch (error) {
    console.error('Error confirming sign up:', error);
    throw error;
  }
};

// Sign out the current user
export const signOut = async () => {
  try {
    await amplifySignOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get the current authenticated user
export const getCurrentAuthenticatedUser = async () => {
  try {
    const currentUser = await getCurrentUser();
    const userAttributes = await fetchUserAttributes();
    
    return {
      username: currentUser.username,
      attributes: userAttributes
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Check if a user is authenticated
export const isAuthenticated = async () => {
  try {
    const session = await fetchAuthSession();
    return session.tokens !== undefined;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};
