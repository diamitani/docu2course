
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PricingSection from '@/components/PricingSection';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import UploadSection from '@/components/home/UploadSection';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  
  useEffect(() => {
    // Check if API key exists in localStorage
    const apiKey = localStorage.getItem('ai_api_key');
    setHasApiKey(!!apiKey);
    
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

  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <UploadSection hasApiKey={hasApiKey} setHasApiKey={setHasApiKey} />
      <FeaturesGrid />
      <PricingSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;
