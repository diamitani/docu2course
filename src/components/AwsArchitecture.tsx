
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AwsArchitecture: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>AWS Amplify Architecture</CardTitle>
          <CardDescription>Recommended AWS Amplify setup for multi-tenant access and private project storage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Authentication (Cognito)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>User Pool for secure authentication with email/password flow</li>
                <li>Identity Pool for fine-grained AWS access control</li>
                <li>Custom attributes for storing subscription status</li>
                <li>Groups for role-based access control (Admin, Pro User, Basic User)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Storage (S3)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Private bucket with per-user prefixes for project data</li>
                <li>Protected bucket for shared team resources</li>
                <li>Public bucket for static assets</li>
                <li>Lifecycle policies for cost optimization</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">API (AppSync/Lambda)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>GraphQL API with fine-grained access control</li>
                <li>Custom resolvers for complex operations</li>
                <li>Lambda functions for business logic and third-party integrations</li>
                <li>Direct integrations with DynamoDB and S3</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Database (DynamoDB)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Single-table design with GSIs for efficient queries</li>
                <li>Tenant isolation through partition keys</li>
                <li>On-demand capacity for cost efficiency</li>
                <li>TTL for automatic data cleanup</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Deployment & CI/CD</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Amplify Console for CI/CD and hosting</li>
                <li>Environment separation (dev, staging, prod)</li>
                <li>Manual approvals for production deployments</li>
                <li>Custom domains with SSL certificates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AwsArchitecture;
