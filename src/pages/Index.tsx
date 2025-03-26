
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import PricingSection from '@/components/PricingSection';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import UploadSection from '@/components/home/UploadSection';
import CallToAction from '@/components/home/CallToAction';
import PaymentSuccess from '@/components/PaymentSuccess';
import { toast } from "sonner";

const Index = () => {
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  useEffect(() => {
    // Check for success or canceled payment
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');

    if (success === 'true') {
      setShowSuccessPage(true);
      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (canceled === 'true') {
      toast.error("Payment was canceled. You can try again anytime.");
      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Handle hash fragments for navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };
    
    // Execute on first load
    handleHashChange();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (showSuccessPage) {
    return (
      <Layout>
        <PaymentSuccess />
      </Layout>
    );
  }

  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <UploadSection />
      <FeaturesGrid />
      <PricingSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;
