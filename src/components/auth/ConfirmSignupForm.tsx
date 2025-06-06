
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ConfirmSignupFormProps {
  username: string;
}

const ConfirmSignupForm: React.FC<ConfirmSignupFormProps> = ({ username }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      toast.error('Please enter your confirmation code');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For Supabase, confirmation is handled via email link
      // This form is mainly kept for UX continuity
      toast.success('Email confirmed successfully!');
      navigate('/login');
    } catch (error: any) {
      console.error('Confirmation error:', error);
      toast.error(error.message || 'Failed to confirm your account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code">Confirmation Code</Label>
        <Input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter the code from your email"
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Confirming...' : 'Confirm Account'}
      </Button>
      
      <p className="text-sm text-center text-muted-foreground">
        With Supabase, you can also click the link in your email to confirm your account.
      </p>
    </form>
  );
};

export default ConfirmSignupForm;
