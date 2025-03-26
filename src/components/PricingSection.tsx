
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon, DollarSign } from 'lucide-react';
import { toast } from "sonner";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe('pk_live_51QzjjzB2toh1Zq62emo5ayCdY1v9WF5N66qaJwMtfxmY1PHUbyqxMZ7qrOEvmi38BlpfNBTAsAt6OD4o0l6gPYus00zH6XXfPV');

const PricingSection: React.FC = () => {
  const handleFreePlan = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
    toast.success("You're using the free plan! You can process 1 document per day.");
  };

  const handleProPlan = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      // This is a simplified checkout - in a production app, you'd create a session on your backend
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: 'price_1QzjrxB2toh1Zq62L3xbJ8tQ', // This is a placeholder - you should replace with your actual price ID
            quantity: 1,
          },
        ],
        mode: 'subscription',
        successUrl: `${window.location.origin}/?success=true`,
        cancelUrl: `${window.location.origin}/?canceled=true`,
      });

      if (error) {
        toast.error(`Payment error: ${error.message}`);
      }
    } catch (err) {
      console.error('Error in checkout:', err);
      toast.error("There was a problem processing your payment. Please try again.");
    }
  };

  const handleEnterprisePlan = () => {
    // For enterprise, redirect to a contact form or open a modal
    window.location.href = "mailto:sales@yourdomain.com?subject=Enterprise%20Plan%20Inquiry";
    toast.success("We'll be in touch soon about our Enterprise plan!");
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
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
          
          {/* Pro Plan */}
          <Card className="border-2 border-primary relative">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary text-white text-xs py-1 px-3 rounded-full font-medium">
              Popular
            </div>
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Unlimited</CardTitle>
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
              <Button className="w-full" onClick={handleProPlan}>
                <DollarSign className="mr-1 h-4 w-4" />
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className="border-2 relative">
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <CardDescription>For larger organizations</CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">Custom</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <PricingFeature>Unlimited document processing</PricingFeature>
                <PricingFeature>Premium course generation</PricingFeature>
                <PricingFeature>Custom FAQ generation</PricingFeature>
                <PricingFeature>SCORM compliant exports</PricingFeature>
                <PricingFeature>Team library & collaboration</PricingFeature>
                <PricingFeature>API access</PricingFeature>
                <PricingFeature>Dedicated support</PricingFeature>
                <PricingFeature>Custom integrations</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleEnterprisePlan}>
                Contact Sales
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
