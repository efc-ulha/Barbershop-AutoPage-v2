import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

const CheckoutForm = ({ type, requestId }: { type: string; requestId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;
    
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      const message = type === 'template' 
        ? "Your website has been generated and will be deployed within 24 hours!"
        : "Thank you for booking a consultation! We'll contact you within 24 hours.";
      
      toast({
        title: "Payment Successful",
        description: message,
      });
      
      setLocation("/");
    }
    
    setIsProcessing(false);
  };

  const amount = type === 'template' ? '$199' : '$89';
  const title = type === 'template' ? 'Template Website Payment' : 'Consultation Fee Payment';

  return (
    <div className="min-h-screen bg-fa-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-fa-secondary">{title}</CardTitle>
            <div className="text-center">
              <span className="text-3xl font-bold text-fa-primary">{amount}</span>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <PaymentElement />
              <Button 
                type="submit" 
                className="w-full bg-fa-primary hover:bg-blue-600"
                disabled={!stripe || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  `Pay ${amount}`
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation()[0];
  
  // Extract type and requestId from URL
  const pathParts = location.split('/');
  const type = pathParts[2]; // 'template' or 'consultation'
  const requestId = pathParts[3];

  useEffect(() => {
    const endpoint = type === 'template' ? '/api/create-template-payment' : '/api/create-consultation-payment';
    
    apiRequest("POST", endpoint, { requestId })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
        setLoading(false);
      });
  }, [type, requestId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-fa-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-fa-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-fa-slate-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-600">Failed to initialize payment. Please try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm type={type} requestId={requestId} />
    </Elements>
  );
}
