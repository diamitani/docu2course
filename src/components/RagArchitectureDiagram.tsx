
import React from 'react';

const RagArchitectureDiagram: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="min-w-[700px] p-6 bg-white rounded-lg shadow-sm border">
        <div className="flex flex-col space-y-6">
          {/* Input Layer */}
          <div className="flex justify-center">
            <div className="w-48 h-16 bg-blue-100 border border-blue-300 rounded-lg flex items-center justify-center text-center text-sm font-medium">
              Input Layer
              <br />
              (Document Upload)
            </div>
          </div>
          
          <div className="flex justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Processing Layer */}
          <div className="flex justify-center">
            <div className="w-64 h-16 bg-green-100 border border-green-300 rounded-lg flex items-center justify-center text-center text-sm font-medium">
              Processing Layer
              <br />
              (NLP & Document Parsing)
            </div>
          </div>
          
          <div className="flex justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* RAG Engine */}
          <div className="flex justify-center">
            <div className="w-80 h-20 bg-purple-100 border border-purple-300 rounded-lg flex items-center justify-center text-center text-sm font-medium">
              RAG Engine
              <br />
              (Retrieval & Generation with LLMs)
            </div>
          </div>
          
          <div className="flex justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Output Layer - Split into two */}
          <div className="flex justify-center space-x-12">
            <div className="w-40 h-16 bg-amber-100 border border-amber-300 rounded-lg flex items-center justify-center text-center text-sm font-medium">
              Course Generation
            </div>
            <div className="w-40 h-16 bg-amber-100 border border-amber-300 rounded-lg flex items-center justify-center text-center text-sm font-medium">
              FAQ Knowledge Base
            </div>
          </div>
        </div>
        
        {/* Side Stores */}
        <div className="mt-6 flex justify-between">
          <div className="w-40 h-14 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center text-center text-xs font-medium">
            Vector Database
            <br />
            (Pinecone)
          </div>
          <div className="w-40 h-14 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center text-center text-xs font-medium">
            Document Store
            <br />
            (DynamoDB)
          </div>
        </div>
      </div>
    </div>
  );
};

export default RagArchitectureDiagram;
