
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SignupForm from '@/components/auth/SignupForm';
import ConfirmSignupForm from '@/components/auth/ConfirmSignupForm';
import { Button } from '@/components/ui/button';

const Signup: React.FC = () => {
  const [registeredUsername, setRegisteredUsername] = useState<string | null>(null);

  const handleSignupSuccess = (username: string) => {
    setRegisteredUsername(username);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
          {registeredUsername ? (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold">Confirm Your Account</h1>
                <p className="mt-2 text-gray-600">Enter the confirmation code sent to your email</p>
              </div>
              
              <ConfirmSignupForm username={registeredUsername} />
            </>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold">Create an Account</h1>
                <p className="mt-2 text-gray-600">Sign up to get started</p>
              </div>
              
              <SignupForm onSuccess={handleSignupSuccess} />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                    Log in
                  </Link>
                </p>
              </div>
            </>
          )}
          
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

export default Signup;
