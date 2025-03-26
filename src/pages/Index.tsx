
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PricingSection from '@/components/PricingSection';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import UploadSection from '@/components/home/UploadSection';
import CallToAction from '@/components/home/CallToAction';
import PaymentSuccess from '@/components/PaymentSuccess';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

const Index = () => {
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for success or canceled payment
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');
    const plan = urlParams.get('plan');

    if (success === 'true') {
      setShowSuccessPage(true);
      // Keep the plan parameter but remove other URL parameters
      window.history.replaceState({}, document.title, 
        plan ? `${window.location.pathname}?plan=${plan}` : window.location.pathname);
    } else if (canceled === 'true') {
      toast.error("Payment was canceled. You can try again anytime.");
      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Check if user is authenticated
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        // User is logged in, you can optionally redirect or update UI
        console.log('User is authenticated');
      }
    };
    
    checkAuth();

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
  }, [isAuthenticated]);

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
