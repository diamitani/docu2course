
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Key, Lock } from 'lucide-react';

const apiKeySchema = z.object({
  apiKey: z.string().min(10, {
    message: "API key must be at least 10 characters long"
  }),
  apiType: z.enum(['openai', 'deepseek']),
  useSystemKey: z.boolean().default(false)
});

type ApiKeyFormData = z.infer<typeof apiKeySchema>;

interface ApiKeyManagementProps {
  onApiKeySet?: (data: ApiKeyFormData) => void;
  isLoading?: boolean;
}

const ApiKeyManagement: React.FC<ApiKeyManagementProps> = ({ 
  onApiKeySet, 
  isLoading = false 
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("api-keys");
  
  const form = useForm<ApiKeyFormData>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      apiKey: '',
      apiType: 'openai',
      useSystemKey: false
    }
  });

  // Load saved preferences on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('ai_api_key');
    const savedApiType = localStorage.getItem('ai_api_type');
    const savedUseSystemKey = localStorage.getItem('use_system_key') === 'true';
    
    if (savedApiKey) {
      form.setValue('apiKey', savedApiKey);
    }
    
    if (savedApiType && (savedApiType === 'openai' || savedApiType === 'deepseek')) {
      form.setValue('apiType', savedApiType as 'openai' | 'deepseek');
    }
    
    form.setValue('useSystemKey', savedUseSystemKey);
  }, [form]);

  const onSubmit = (data: ApiKeyFormData) => {
    // Save preferences to localStorage
    if (!data.useSystemKey) {
      localStorage.setItem('ai_api_key', data.apiKey);
    } else {
      localStorage.removeItem('ai_api_key');
    }
    
    localStorage.setItem('ai_api_type', data.apiType);
    localStorage.setItem('use_system_key', data.useSystemKey.toString());
    
    // Call the callback if provided
    if (onApiKeySet) {
      onApiKeySet(data);
    }
    
    toast.success(`API settings saved successfully`);
  };

  const toggleSystemKey = (value: boolean) => {
    form.setValue('useSystemKey', value);
    if (value) {
      form.setValue('apiKey', '');
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('ai_api_key');
    localStorage.removeItem('ai_api_type');
    localStorage.removeItem('use_system_key');
    form.reset({
      apiKey: '',
      apiType: 'openai',
      useSystemKey: false
    });
    toast.success('API settings cleared');
  };

  return (
    <Card className="max-w-md mx-auto mb-8">
      <CardHeader>
        <CardTitle>API Key Management</CardTitle>
        <CardDescription>
          Configure how you connect to AI services for document processing.
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mx-4">
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="api-keys">
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="useSystemKey"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Use System API Key
                        </FormLabel>
                        <FormDescription>
                          Switch to use our pre-configured API key instead of your own.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value);
                            toggleSystemKey(value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {!form.watch('useSystemKey') && (
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your API Key</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input 
                              type="password" 
                              placeholder="Enter your API key" 
                              {...field} 
                              disabled={form.watch('useSystemKey')}
                            />
                            <Lock className="h-4 w-4 text-gray-400 ml-2" />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Your API key is stored only in your browser's local storage.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="apiType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>AI Service Provider</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="openai" id="openai" />
                            </FormControl>
                            <FormLabel className="font-normal" htmlFor="openai">
                              OpenAI (GPT-4)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="deepseek" id="deepseek" />
                            </FormControl>
                            <FormLabel className="font-normal" htmlFor="deepseek">
                              DeepSeek
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex space-x-2">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? (
                      <>
                        <span className="mr-2">Processing</span>
                        <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      </>
                    ) : "Save Settings"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={clearApiKey}
                    disabled={isLoading}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="settings">
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Advanced Settings</h3>
              <p className="text-sm text-gray-500">
                Configure additional settings for AI processing.
              </p>
              
              {/* You can add more settings here in the future */}
              <div className="text-sm text-gray-500 italic">
                More settings coming soon...
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="flex justify-between bg-gray-50 px-6 py-4 rounded-b-lg">
        <p className="text-xs text-gray-500">
          {form.watch('useSystemKey') 
            ? "Using system API key" 
            : "Your API key is stored locally only"}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ApiKeyManagement;
