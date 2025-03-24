
import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import RagArchitectureDiagram from '@/components/RagArchitectureDiagram';

const RAGFramework = () => {
  return (
    <Layout>
      <section className="pt-20 pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mt-8 mb-12">
            <h1 className="text-4xl font-bold tracking-tighter mb-4">RAG-Based Knowledge Transformation Framework</h1>
            <p className="text-lg text-muted-foreground">
              A framework for transforming static documents into dynamic, user-friendly training guides and knowledge bases
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
              <p className="mb-4">
                This white paper introduces a Retrieval-Augmented Generation (RAG) framework designed to transform static documents into dynamic, user-friendly training guides and knowledge bases. By integrating advanced AI models with scalable cloud infrastructure, this solution addresses the growing demand for efficient, accessible, and tailored educational content.
              </p>
              <p>
                Leveraging Amazon Web Services (AWS) and a modular architecture, the framework automates content processing, enhances scalability across diverse domains, and empowers users with actionable insights.
              </p>
            </Card>

            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Architecture</h2>
              <div className="mb-6">
                <RagArchitectureDiagram />
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-medium mb-2">Input Layer</h3>
                  <p className="text-sm text-muted-foreground mb-1"><strong>Functionality:</strong> Users upload documents (e.g., PDFs) through a web interface.</p>
                  <p className="text-sm text-muted-foreground"><strong>Technology:</strong> AWS Amplify hosts a responsive frontend, with S3 buckets storing uploaded files.</p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-medium mb-2">Processing Layer</h3>
                  <p className="text-sm text-muted-foreground mb-1"><strong>Functionality:</strong> Documents are parsed, segmented, and indexed for retrieval.</p>
                  <p className="text-sm text-muted-foreground"><strong>Technology:</strong> Python scripts (PyPDF2 for PDF extraction, spaCy for NLP) process content, storing structured data in DynamoDB and vector embeddings in Pinecone for similarity search.</p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-medium mb-2">RAG Engine</h3>
                  <p className="text-sm text-muted-foreground mb-1"><strong>Functionality:</strong> User queries trigger retrieval of relevant content, which is synthesized into training modules or FAQs.</p>
                  <p className="text-sm text-muted-foreground"><strong>Technology:</strong> AWS Bedrock provides the language model, with Lambda functions orchestrating retrieval and generation.</p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-medium mb-2">Output Layer</h3>
                  <p className="text-sm text-muted-foreground mb-1"><strong>Functionality:</strong> Generated content is delivered as HTML lessons or query responses.</p>
                  <p className="text-sm text-muted-foreground"><strong>Technology:</strong> A Flask-based microservice serves dynamic content, hosted on AWS Elastic Beanstalk.</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 h-full">
                <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
                <ul className="space-y-2 list-disc pl-5">
                  <li><strong>Efficiency:</strong> Reduces manual content creation time from hours to minutes.</li>
                  <li><strong>Scalability:</strong> Adapts to diverse domains using AWS's robust infrastructure.</li>
                  <li><strong>Accessibility:</strong> Delivers tailored, easy-to-understand insights for non-expert users.</li>
                </ul>
              </Card>

              <Card className="p-6 h-full">
                <h2 className="text-2xl font-semibold mb-4">Extensibility</h2>
                <ul className="space-y-2 list-disc pl-5">
                  <li><strong>Policy Education:</strong> Transforming regulatory documents into public-facing guides.</li>
                  <li><strong>Health Data Analysis:</strong> Converting medical records into patient education tools.</li>
                  <li><strong>Technical Documentation:</strong> Creating interactive tutorials from technical manuals.</li>
                </ul>
              </Card>
            </div>

            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Implementation Example</h2>
              <div className="bg-muted p-4 rounded-md mb-4">
                <p className="mb-2"><strong>Input:</strong> The author's resume (listing AWS skills: EC2, Lambda) and a Healthie Max Pro document (describing lab results).</p>
                <p className="mb-2"><strong>Processing:</strong> The system extracts key entities (e.g., "EC2," "blood work") and stores them as indexed modules.</p>
                <p><strong>Output:</strong></p>
                <ul className="list-disc pl-5">
                  <li>Resume → "Lesson 1: AWS Basics - Learn EC2 setup with hands-on experience."</li>
                  <li>Healthie Max Pro → "Lesson 2: Interpreting Lab Results - Understand blood work simply."</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Technical Implementation: RankAndRetrieve Algorithm</h2>
              <p className="mb-4">
                The RAG engine incorporates a custom RankAndRetrieve function to balance authoritative ("Goliath") and emerging ("David") sources, ensuring diverse, high-quality outputs.
              </p>
              <div className="bg-black text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
                <pre>{`Function RankAndRetrieve(query):
    # Define source rankings by category
    SourceRankings = {
        "Technology": {"Google Research": 0.92, "MIT CSAIL": 0.87},
        "Health": {"Mayo Clinic": 0.83, "WHO": 0.85}
    }
    
    # Categorize query
    category = CategorizeQuery(query)
    
    # Retrieve top-tier sources
    topSources = SortByScore(SourceRankings[category], descending=True)
    topTierResults = {}
    for source, score in topSources[:4]:
        content = RetrieveContent(source, query)
        topTierResults[source] = {"content": content, "score": score * 0.9}
    
    # Incorporate emerging sources
    emergingSources = FetchTrendingSources(query, platforms=["web", "X"])
    davidResults = {}
    for source in emergingSources:
        relevance = AssessRelevance(source, query)
        if relevance > 0.65:
            content = RetrieveContent(source, query)
            davidResults[source] = {"content": content, "score": relevance}
    
    # Combine and weight results
    allResults = MergeDictionaries(topTierResults, davidResults)
    for source, data in allResults.items():
        data["finalScore"] = data["score"] * (0.8 if source in topSources else 0.5)
    
    # Sort and return
    sortedResults = SortByScore(allResults, key="finalScore", descending=True)
    return sortedResults[:12]`}</pre>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
              <p className="mb-4">
                The RAG-Based Knowledge Transformation Framework offers a scalable, AI-driven solution to bridge the gap between raw documents and actionable knowledge. By automating content synthesis, it saves time, enhances accessibility, and supports diverse applications—positioning it as a valuable tool for education, healthcare, and policy innovation.
              </p>
              <div className="flex justify-center mt-6">
                <a href="/#upload-section" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Try Our Implementation
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Ready to Transform Your Documents?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the power of our RAG-based framework to convert your static documents into dynamic learning resources.
            </p>
            <a href="/#upload-section" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Upload Your Document
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RAGFramework;
