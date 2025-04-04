
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Show success notification
      toast.success("Payment successful! Your subscription has been activated.");
      
      // In a real app, you might want to verify the payment status on the server side
      setTimeout(() => {
        setIsVerifying(false);
      }, 2000);
    } else {
      navigate('/');
    }
  }, [sessionId, navigate]);

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-16 px-4">
        <Card>
          <CardContent className="flex flex-col items-center text-center py-16">
            {isVerifying ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <h2 className="text-2xl font-bold mb-2">Verifying your payment...</h2>
                <p className="text-muted-foreground mb-4">Please wait while we confirm your subscription.</p>
              </>
            ) : (
              <>
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your subscription. You now have access to all premium features.
                </p>
                <div className="flex space-x-4">
                  <Button onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/')}>
                    Return to Home
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
