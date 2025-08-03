import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPersonalizedRequestSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface PersonalizedFormProps {
  onClose: () => void;
}

export default function PersonalizedForm({ onClose }: PersonalizedFormProps) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm({
    resolver: zodResolver(insertPersonalizedRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      businessLocation: "",
      businessDescription: "",
      colorScheme: "",
      stylePreference: "",
      features: [],
      additionalRequirements: "",
    },
  });

  const createRequestMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/personalized-request", data);
      return response.json();
    },
    onSuccess: (data) => {
      onClose();
      setLocation(`/checkout/consultation/${data.requestId}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request",
        variant: "destructive",
      });
    },
  });

  const features = [
    "Online Booking System",
    "Photo Gallery", 
    "Customer Reviews",
    "Social Media Integration",
    "E-commerce (Products)",
    "Blog/News Section"
  ];

  const onSubmit = (data: any) => {
    createRequestMutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-fa-secondary">Custom Website Design Consultation</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <i className="fas fa-times text-2xl"></i>
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-semibold text-fa-secondary mb-4 flex items-center">
                  <i className="fas fa-user mr-2 text-fa-primary"></i>
                  Basic Information
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Business Details */}
              <div>
                <h4 className="text-lg font-semibold text-fa-secondary mb-4 flex items-center">
                  <i className="fas fa-store mr-2 text-fa-primary"></i>
                  Business Details
                </h4>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="businessLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Location *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Business Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="h-32" 
                            placeholder="Tell us about your barbershop's history, atmosphere, target customers, and unique selling points..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Design Preferences */}
              <div>
                <h4 className="text-lg font-semibold text-fa-secondary mb-4 flex items-center">
                  <i className="fas fa-palette mr-2 text-fa-primary"></i>
                  Design Preferences
                </h4>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="colorScheme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Color Scheme</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a color scheme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="classic">Classic (Black, White, Red)</SelectItem>
                            <SelectItem value="modern">Modern (Blues, Grays, White)</SelectItem>
                            <SelectItem value="vintage">Vintage (Browns, Golds, Cream)</SelectItem>
                            <SelectItem value="bold">Bold (Custom colors)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stylePreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website Style Preference</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4"
                          >
                            <div>
                              <RadioGroupItem value="classic" id="style-classic" className="peer sr-only" />
                              <Label
                                htmlFor="style-classic"
                                className="flex items-center p-4 border border-slate-300 rounded-lg cursor-pointer hover:border-fa-primary peer-checked:border-fa-primary peer-checked:bg-blue-50"
                              >
                                <div>
                                  <div className="font-medium">Classic/Traditional</div>
                                  <div className="text-sm text-fa-slate-600">Timeless, professional look</div>
                                </div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="modern" id="style-modern" className="peer sr-only" />
                              <Label
                                htmlFor="style-modern"
                                className="flex items-center p-4 border border-slate-300 rounded-lg cursor-pointer hover:border-fa-primary peer-checked:border-fa-primary peer-checked:bg-blue-50"
                              >
                                <div>
                                  <div className="font-medium">Modern/Minimalist</div>
                                  <div className="text-sm text-fa-slate-600">Clean, contemporary design</div>
                                </div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Feature Requirements */}
              <div>
                <h4 className="text-lg font-semibold text-fa-secondary mb-4 flex items-center">
                  <i className="fas fa-cogs mr-2 text-fa-primary"></i>
                  Feature Requirements
                </h4>
                <FormField
                  control={form.control}
                  name="features"
                  render={() => (
                    <FormItem>
                      <div className="grid md:grid-cols-2 gap-4">
                        {features.map((feature) => (
                          <FormField
                            key={feature}
                            control={form.control}
                            name="features"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={feature}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, feature])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== feature
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {feature}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Requirements */}
              <FormField
                control={form.control}
                name="additionalRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Requirements or Inspirations</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="h-24" 
                        placeholder="Any specific features, websites you like, or special requirements..."
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
                  className="flex-1 bg-fa-accent hover:bg-emerald-600"
                  disabled={createRequestMutation.isPending}
                >
                  {createRequestMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-credit-card mr-2"></i>
                      Book Consultation - $89
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
