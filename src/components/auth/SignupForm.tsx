
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SignupFormProps {
  onSuccess: (username: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !email) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For demo purposes, just simulate signup
      setTimeout(() => {
        toast.success('Account created! This is a demo - no actual account was created.');
        onSuccess(username);
      }, 1000);
    } catch (error: any) {
      toast.error('This is a demo - no actual signup functionality is implemented.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username*</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email*</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating Demo Account...' : 'Demo Sign Up'}
      </Button>
      
      <p className="text-sm text-center text-muted-foreground">
        This is a portfolio demo. No actual account will be created.
      </p>
    </form>
  );
};

export default SignupForm;
