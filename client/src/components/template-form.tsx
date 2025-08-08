import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTemplateRequestSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface TemplateFormProps {
  onClose: () => void;
  onShowPreview: (data: any) => void;
}

export default function TemplateForm({ onClose, onShowPreview }: TemplateFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertTemplateRequestSchema.extend({
      selectedTemplate: insertTemplateRequestSchema.shape.selectedTemplate
    })),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      businessType: "Barbershop",
      businessLocation: "",
      services: "",
      description: "",
      selectedTemplate: "",
      logoUrl: "",
    },
  });

  const createRequestMutation = useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await apiRequest("POST", "/api/template-request", data);
        return response.json();
      } catch (error: any) {
        console.error("API request failed:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      onShowPreview(data);
      toast({
        title: "Preview Generated",
        description: "Your website preview has been generated successfully!",
      });
    },
    onError: (error: any) => {
      console.error("Template form error:", error);
      let errorMessage = "Failed to generate preview";
      
      if (typeof error?.message === 'string') {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    if (!selectedTemplate) {
      toast({
        title: "Template Required",
        description: "Please select a template before continuing.",
        variant: "destructive",
      });
      return;
    }

    createRequestMutation.mutate({
      ...data,
      selectedTemplate,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-fa-secondary">Generate Your Template Website</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <i className="fas fa-times text-2xl"></i>
            </Button>
          </div>
          
          {/* Template Selection */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-fa-secondary mb-4">Choose Your Template</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${selectedTemplate === 'classic' ? 'border-fa-primary bg-blue-50' : 'border-slate-200 hover:border-fa-primary'}`}
                onClick={() => setSelectedTemplate('classic')}
              >
                <CardContent className="p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200" 
                    alt="Classic Template Preview" 
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h5 className="font-semibold text-fa-secondary">Classic Barbershop</h5>
                  <p className="text-sm text-fa-slate-600">Traditional design with vintage elements</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all ${selectedTemplate === 'modern' ? 'border-fa-primary bg-blue-50' : 'border-slate-200 hover:border-fa-primary'}`}
                onClick={() => setSelectedTemplate('modern')}
              >
                <CardContent className="p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200" 
                    alt="Modern Template Preview" 
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h5 className="font-semibold text-fa-secondary">Modern Minimalist</h5>
                  <p className="text-sm text-fa-slate-600">Clean, contemporary design</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@barbershop.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Mike's Barbershop" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Location *</FormLabel>
                      <FormControl>
                        <Input placeholder="Downtown Chicago, IL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="services"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services or Products *</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="h-24" 
                        placeholder="Men's haircuts, beard trims, hot towel shaves, hair washing..."
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Business Description *</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="h-32" 
                        placeholder="Tell us about your barbershop's style, atmosphere, and what makes it unique..."
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-fa-primary hover:bg-blue-600"
                  disabled={createRequestMutation.isPending}
                >
                  {createRequestMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-eye mr-2"></i>
                      Generate Preview
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
