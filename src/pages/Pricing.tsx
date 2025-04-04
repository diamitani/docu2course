
import React from 'react';
import Layout from '@/components/Layout';
import PricingSection from '@/components/PricingSection';

const Pricing: React.FC = () => {
  return (
    <Layout>
      <div className="pt-10">
        <PricingSection />
      </div>
    </Layout>
  );
};

export default Pricing;
