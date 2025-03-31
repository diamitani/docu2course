
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Upload from '@/components/Upload';
import ApiKeyManagement from '@/components/ApiKeyManagement';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Upload as UploadIcon, Settings, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("upload");

  if (!user) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto py-16 px-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
              <p className="text-gray-500 mb-6">You need to be logged in to access the dashboard.</p>
              <Button onClick={() => navigate('/login')}>Go to Login</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <UploadIcon className="h-4 w-4" />
              <span>Upload Document</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>My Documents</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <Card>
              <CardContent className="pt-6">
                <Upload />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardContent className="py-6">
                <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
                <p className="text-gray-500">
                  You don't have any processed documents yet. Upload a document to get started.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <ApiKeyManagement 
              onApiKeySet={(data) => {
                console.log('API key set:', data);
                // Additional logic if needed
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
