
import React from 'react';

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

// Simplified middleware that just passes through children
const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  return <>{children}</>;
};

export default AuthMiddleware;
