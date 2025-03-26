
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { Button } from '@/components/ui/button';

const Login: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-gray-600">Sign in to access your account</p>
          </div>
          
          <LoginForm />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="mt-6 border-t pt-6">
            <Button 
              variant="outline" 
              className="w-full"
              asChild
            >
              <Link to="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
