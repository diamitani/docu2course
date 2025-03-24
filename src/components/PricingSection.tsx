
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon } from 'lucide-react';

const PricingSection: React.FC = () => {
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
              <Button variant="outline" className="w-full" onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}>
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
              <CardTitle className="text-xl">Pro</CardTitle>
              <CardDescription>For individuals and small teams</CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">$19</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <PricingFeature>20 document processing per day</PricingFeature>
                <PricingFeature>Advanced course generation</PricingFeature>
                <PricingFeature>Enhanced FAQ generation</PricingFeature>
                <PricingFeature>Download in multiple formats</PricingFeature>
                <PricingFeature>Save to personal library</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className="border-2 relative">
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <CardDescription>For larger organizations</CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">$99</span>
                <span className="text-muted-foreground">/month</span>
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
              <Button variant="outline" className="w-full">
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
