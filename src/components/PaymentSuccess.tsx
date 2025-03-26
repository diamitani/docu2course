
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  useEffect(() => {
    // You could also update the user's account status in your database here
    localStorage.setItem('userPlan', 'pro');
  }, []);

  return (
    <div className="max-w-md mx-auto my-16 p-8 border rounded-lg shadow-lg text-center">
      <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
      <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for upgrading to our Unlimited plan. You now have unlimited access to all of our features.
      </p>
      <Button 
        onClick={() => window.location.href = '/#upload-section'}
        className="w-full"
      >
        Start Using Unlimited Features
      </Button>
    </div>
  );
};

export default PaymentSuccess;
