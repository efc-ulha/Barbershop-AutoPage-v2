import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

interface WebsitePreviewProps {
  data: {
    requestId: string;
    generatedContent: {
      headline: string;
      tagline: string;
      aboutUs: string;
      serviceDescriptions: string[];
      callToAction: string;
    };
    htmlContent: string;
  };
  onClose: () => void;
  onRequestPersonalization: () => void;
}

export default function WebsitePreview({ data, onClose, onRequestPersonalization }: WebsitePreviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleProceedToPayment = () => {
    setLocation(`/checkout/template/${data.requestId}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center flex-shrink-0">
          <h3 className="text-xl font-bold text-fa-secondary">Your Website Preview</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <i className="fas fa-times text-xl"></i>
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-slate-100 rounded-lg p-8 mb-6">
            <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-fa-slate-800 to-fa-slate-900 text-white p-8 text-center">
                <h1 className="text-3xl font-bold mb-2">{data.generatedContent.headline}</h1>
                <p className="text-lg text-slate-300">{data.generatedContent.tagline}</p>
              </div>
              
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">About Us</h2>
                    <p className="text-slate-600 leading-relaxed">
                      {data.generatedContent.aboutUs}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Services</h2>
                    <ul className="space-y-2 text-slate-600">
                      {data.generatedContent.serviceDescriptions.map((service, index) => (
                        <li key={index} className="flex items-center">
                          <i className="fas fa-cut text-fa-primary mr-2"></i>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <Button className="bg-fa-primary text-white px-8 py-3 rounded-lg text-lg font-semibold">
                    {data.generatedContent.callToAction}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-200 flex gap-4 flex-shrink-0">
          <Button 
            onClick={handleProceedToPayment}
            className="flex-1 bg-fa-accent hover:bg-emerald-600 text-white"
          >
            <i className="fas fa-credit-card mr-2"></i>
            Deploy My Website - $120 + $8/mo
          </Button>
          <Button 
            onClick={onRequestPersonalization}
            variant="outline"
            className="flex-1 border-fa-primary text-fa-primary hover:bg-fa-primary hover:text-white"
          >
            <i className="fas fa-palette mr-2"></i>
            Request Personalization
          </Button>
        </div>
      </div>
    </div>
  );
}
