
import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const faqCategories = [
    {
      category: "Document Processing",
      questions: [
        {
          question: "What document formats are supported?",
          answer: "Our system currently supports PDF, TXT, DOC, and DOCX file formats. We use advanced OCR technology for scanned PDFs to extract text content efficiently."
        },
        {
          question: "How large can my document files be?",
          answer: "The maximum file size is 10MB. For larger documents, we recommend breaking them down into smaller sections or reaching out to our support team for assistance with batch processing."
        },
        {
          question: "Can I upload multiple documents at once?",
          answer: "Currently, our system processes one document at a time to ensure optimal quality. However, we're working on batch processing capabilities for future releases."
        }
      ]
    },
    {
      category: "Course Generation",
      questions: [
        {
          question: "How does the system create course modules?",
          answer: "Our RAG-based system analyzes document structure, identifies key topics, and organizes content into logical learning paths. It uses DeepSeek AI to generate clear learning objectives, digestible content blocks, and relevant assessments."
        },
        {
          question: "Can I edit the generated courses?",
          answer: "Yes! While we're still developing a full editing interface, you can download your generated courses and modify them as needed. Future updates will include an integrated course editor."
        },
        {
          question: "How accurate are the generated quizzes?",
          answer: "Quiz questions are generated based on key concepts in your document. The system aims to create assessments that test comprehension of central ideas. Accuracy improves with clearer, well-structured source documents."
        }
      ]
    },
    {
      category: "FAQ Generation",
      questions: [
        {
          question: "How does the system determine what questions to include in FAQs?",
          answer: "Our algorithm identifies potential user questions by analyzing common patterns in your document, recognizing definition sections, and highlighting key procedural information that users might need clarification on."
        },
        {
          question: "Can the system generate FAQs for technical documents?",
          answer: "Absolutely! In fact, technical documentation often works exceptionally well with our system because it typically contains clear sections, definitions, and procedures that can be transformed into comprehensive FAQs."
        }
      ]
    },
    {
      category: "Technical Details",
      questions: [
        {
          question: "What AI technology powers the document transformation?",
          answer: "We use DeepSeek AI's large language model capabilities combined with custom retrieval algorithms in a Retrieval-Augmented Generation (RAG) architecture to process documents and generate educational content."
        },
        {
          question: "Is my document data secure?",
          answer: "Yes, we take data security seriously. Documents are processed in temporary storage, and we don't permanently store your original documents unless specifically requested. All data transmission occurs over encrypted connections."
        }
      ]
    }
  ];

  const filteredFAQs = searchQuery 
    ? faqCategories.map(category => ({
        category: category.category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

  return (
    <Layout>
      <section className="pt-20 pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mt-8 mb-12">
            <h1 className="text-4xl font-bold tracking-tighter mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our document transformation platform
            </p>
          </div>
          
          <div className="max-w-xl mx-auto mb-12">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Search questions and answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              {searchQuery && (
                <Button variant="ghost" onClick={() => setSearchQuery('')}>
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            {filteredFAQs.map((category, i) => (
              category.questions.length > 0 && (
                <div key={i}>
                  <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, j) => (
                      <Card key={j} className="p-6">
                        <h3 className="text-xl font-medium mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            ))}
            
            {filteredFAQs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-lg text-muted-foreground mb-4">No questions matching your search.</p>
                <Button onClick={() => setSearchQuery('')}>View All Questions</Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Have More Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're continuously improving our platform based on user feedback. Let us know what you'd like to see!
            </p>
            <Button onClick={() => navigate('/')} className="inline-flex items-center justify-center">
              Try Our Demo
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
