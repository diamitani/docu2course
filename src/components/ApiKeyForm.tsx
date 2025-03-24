
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const apiKeySchema = z.object({
  apiKey: z.string().min(10, {
    message: "API key must be at least 10 characters long"
  }),
  apiType: z.enum(['openai', 'deepseek'])
});

type ApiKeyFormData = z.infer<typeof apiKeySchema>;

interface ApiKeyFormProps {
  onApiKeySet: (data: ApiKeyFormData) => void;
  isLoading?: boolean;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onApiKeySet, isLoading = false }) => {
  const form = useForm<ApiKeyFormData>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      apiKey: '',
      apiType: 'deepseek'
    }
  });

  const onSubmit = (data: ApiKeyFormData) => {
    localStorage.setItem('ai_api_key', data.apiKey);
    localStorage.setItem('ai_api_type', data.apiType);
    onApiKeySet(data);
    toast.success(`${data.apiType.toUpperCase()} API key saved successfully`);
  };

  return (
    <Card className="max-w-md mx-auto mb-8">
      <CardHeader>
        <CardTitle>Set your API Key</CardTitle>
        <CardDescription>
          Enter your API key to use for document processing. Your key is stored locally and never sent to our servers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="apiType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Provider</FormLabel>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="openai"
                        checked={field.value === 'openai'}
                        onChange={() => field.onChange('openai')}
                        className="radio"
                      />
                      <span>OpenAI</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="deepseek"
                        checked={field.value === 'deepseek'}
                        onChange={() => field.onChange('deepseek')}
                        className="radio"
                      />
                      <span>DeepSeek</span>
                    </label>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your API key" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Your API key is stored only in your browser's local storage.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <span className="mr-2">Processing</span>
                  <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                </>
              ) : "Save API Key"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ApiKeyForm;
