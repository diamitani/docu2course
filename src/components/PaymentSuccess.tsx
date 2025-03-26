
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const [planType, setPlanType] = useState('monthly');
  
  useEffect(() => {
    // Get the plan type from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    if (plan) {
      setPlanType(plan);
    }
    
    // Set user plan in localStorage
    localStorage.setItem('userPlan', 'pro');
    
    // Store subscription date for tracking
    localStorage.setItem('subscriptionDate', new Date().toISOString());
    localStorage.setItem('subscriptionType', plan || 'monthly');
  }, []);

  const getPlanText = () => {
    if (planType === 'yearly') {
      return "Yearly Unlimited";
    }
    return "Monthly Unlimited";
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 border rounded-lg shadow-lg text-center">
      <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
      <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for upgrading to our {getPlanText()} plan. You now have unlimited access to all of our features.
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Your subscription will automatically renew. You can manage your subscription at any time through your account settings.
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
