
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FAQType } from '@/utils/processingUtils';
import FAQItem from './FAQItem';

interface FAQViewProps {
  faq: FAQType;
}

const FAQView: React.FC<FAQViewProps> = ({ faq }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  if (!faq) return null;

  const filteredQuestions = searchQuery 
    ? faq.questions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : faq.questions;

  return (
    <div>
      <div className="mb-4">
        <Input 
          type="text" 
          placeholder="Search FAQs..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      
      <div className="divide-y">
        {filteredQuestions.map((item, index) => (
          <FAQItem 
            key={index} 
            question={item.question} 
            answer={item.answer} 
            tags={item.tags} 
          />
        ))}
      </div>
    </div>
  );
};

export default FAQView;
