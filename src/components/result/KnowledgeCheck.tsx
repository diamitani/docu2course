
import React from 'react';

interface KnowledgeCheckProps {
  quiz: {
    question: string;
    options: string[];
    answer?: number;
  };
}

const KnowledgeCheck: React.FC<KnowledgeCheckProps> = ({ quiz }) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h5 className="text-sm font-medium mb-3">Knowledge Check</h5>
      <p className="mb-4">{quiz.question}</p>
      
      <div className="space-y-2">
        {quiz.options.map((option, i) => (
          <div key={i} className="flex items-center">
            <input 
              type="radio" 
              id={`option-${i}`} 
              name="quiz-option" 
              className="mr-2"
            />
            <label htmlFor={`option-${i}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeCheck;
