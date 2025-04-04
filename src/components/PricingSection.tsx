
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon, DollarSign } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface PricingSectionProps {
  id?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({ id = "pricing" }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Product IDs for the different plans
  const PRODUCTS = {
    monthly: 'prod_S0kVCDHwTSNOcV',
    yearly: 'prod_S0kWOUMG5ybW84'
  };

  const handleFreePlan = () => {
    if (!user) {
      navigate('/signup');
    } else {
      document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
      toast.success("You're using the free plan! You can process 1 document per day.");
    }
  };

  const handleSubscribe = async (productId: string, planType: string) => {
    if (!user) {
      toast.info("Please sign in to subscribe");
      navigate('/login', { state: { from: '/pricing' } });
      return;
    }

    try {
      toast.info("Preparing checkout...");
      
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          product_id: productId,
          email: user.email
        }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error('Error in checkout:', err);
      toast.error("There was a problem processing your payment. Please try again.");
    }
  };

  return (
    <section id={id} className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Simple, Transparent Pricing</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground text-lg">
            Start for free, upgrade when you need more. No hidden fees or long-term commitments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 relative">
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Free</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <PricingFeature>1 document processing per day</PricingFeature>
                <PricingFeature>Basic course generation</PricingFeature>
                <PricingFeature>Basic FAQ generation</PricingFeature>
                <PricingFeature>Download as markdown</PricingFeature>
                <PricingFeature>Community support</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleFreePlan}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
          
          {/* Monthly Plan */}
          <Card className="border-2 border-primary relative">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary text-white text-xs py-1 px-3 rounded-full font-medium">
              Popular
            </div>
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Monthly</CardTitle>
              <CardDescription>For individuals and small teams</CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">$5</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <PricingFeature>Unlimited document processing</PricingFeature>
                <PricingFeature>Advanced course generation</PricingFeature>
                <PricingFeature>Enhanced FAQ generation</PricingFeature>
                <PricingFeature>Download in multiple formats</PricingFeature>
                <PricingFeature>Save to personal library</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSubscribe(PRODUCTS.monthly, 'monthly')}>
                <DollarSign className="mr-1 h-4 w-4" />
                Subscribe Monthly
              </Button>
            </CardFooter>
          </Card>
          
          {/* Yearly Plan */}
          <Card className="border-2 relative">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-green-500 text-white text-xs py-1 px-3 rounded-full font-medium">
              Save 33%
            </div>
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Yearly</CardTitle>
              <CardDescription>Best value for serious users</CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">$20</span>
                <span className="text-muted-foreground">/year</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <PricingFeature>Everything in Monthly plan</PricingFeature>
                <PricingFeature>Unlimited document processing</PricingFeature>
                <PricingFeature>Premium support</PricingFeature>
                <PricingFeature>Early access to new features</PricingFeature>
                <PricingFeature>Advanced analytics</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full bg-green-50 hover:bg-green-100 border-green-200" 
                onClick={() => handleSubscribe(PRODUCTS.yearly, 'yearly')}>
                <DollarSign className="mr-1 h-4 w-4" />
                Subscribe Yearly
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

const PricingFeature: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <li className="flex items-start">
      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
};

export default PricingSection;
