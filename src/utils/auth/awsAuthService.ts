
import { Amplify } from 'aws-amplify';
import { cognitoConfig } from '@/config/aws-config';

// Configure Amplify with our Cognito settings
export const configureAuth = () => {
  // Basic configuration that won't cause TypeScript errors
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: cognitoConfig.userPoolId,
        userPoolClientId: cognitoConfig.userPoolWebClientId,
        signUpVerificationMethod: 'code'
      }
    }
  });
};

// Simplified auth methods
export const getCurrentUser = async () => {
  return null;
};

export const isAuthenticated = async () => {
  return true; // Always return authenticated for the portfolio site
};

// Export empty functions for compatibility
export const signIn = async () => null;
export const signUp = async () => null;
export const confirmSignUp = async () => null;
export const signOut = async () => null;
