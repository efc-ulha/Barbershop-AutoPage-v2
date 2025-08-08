import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { generateBarbershopContent } from "./openai";
import { insertTemplateRequestSchema, insertPersonalizedRequestSchema } from "@shared/schema";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Template website routes
  app.post("/api/template-request", async (req, res) => {
    try {
      const validatedData = insertTemplateRequestSchema.parse(req.body);
      const request = await storage.createTemplateRequest(validatedData);
      
      // Generate AI content
      const aiContent = await generateBarbershopContent({
        businessName: validatedData.businessName,
        businessLocation: validatedData.businessLocation,
        services: validatedData.services,
        description: validatedData.description,
        businessType: validatedData.businessType || "Barbershop",
      });
      
      // Generate HTML template
      const htmlContent = generateTemplateHTML(validatedData, aiContent);
      
      // Update request with generated content
      await storage.updateTemplateRequestContent(request.id, aiContent, htmlContent);
      
      res.json({ 
        requestId: request.id, 
        generatedContent: aiContent,
        htmlContent 
      });
    } catch (error: any) {
      console.error("Error creating template request:", error);
      const errorMessage = error?.message || "Failed to create template request";
      res.status(400).json({ 
        error: true,
        message: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });

  app.post("/api/create-template-payment", async (req, res) => {
    try {
      const { requestId } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 12000, // $120.00 in cents
        currency: "usd",
        metadata: {
          requestId,
          type: "template_website"
        }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Personalized website routes
  app.post("/api/personalized-request", async (req, res) => {
    try {
      const validatedData = insertPersonalizedRequestSchema.parse(req.body);
      const request = await storage.createPersonalizedRequest(validatedData);
      
      res.json({ requestId: request.id });
    } catch (error: any) {
      console.error("Error creating personalized request:", error);
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/create-consultation-payment", async (req, res) => {
    try {
      const { requestId } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 8900, // $89.00 in cents
        currency: "usd",
        metadata: {
          requestId,
          type: "consultation_fee"
        }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Webhook for payment confirmations
  app.post("/api/stripe-webhook", async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const { requestId, type } = paymentIntent.metadata;

      if (type === 'template_website') {
        await storage.updateTemplateRequestPayment(requestId, paymentIntent.id);
        // TODO: Deploy website and send email
      } else if (type === 'consultation_fee') {
        await storage.updatePersonalizedRequestConsultationPayment(requestId, paymentIntent.id);
        // TODO: Send consultation confirmation email
      }
    }

    res.json({ received: true });
  });

  // Admin routes
  app.get("/api/admin/personalized-requests", async (req, res) => {
    try {
      const requests = await storage.getAllPersonalizedRequests();
      res.json(requests);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/admin/personalized-request/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      await storage.updatePersonalizedRequestStatus(id, status);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generateTemplateHTML(data: any, aiContent: any): string {
  const template = data.selectedTemplate === 'modern' ? getModernTemplate() : getClassicTemplate();
  
  return template
    .replace(/{{businessName}}/g, data.businessName)
    .replace(/{{headline}}/g, aiContent.headline)
    .replace(/{{tagline}}/g, aiContent.tagline)
    .replace(/{{aboutUs}}/g, aiContent.aboutUs)
    .replace(/{{callToAction}}/g, aiContent.callToAction)
    .replace(/{{services}}/g, aiContent.serviceDescriptions.map((service: string) => 
      `<li class="flex items-center"><i class="fas fa-cut text-primary mr-2"></i><span>${service}</span></li>`
    ).join(''))
    .replace(/{{phone}}/g, data.phone)
    .replace(/{{email}}/g, data.email)
    .replace(/{{location}}/g, data.businessLocation);
}

function getClassicTemplate(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{businessName}} - Traditional Barbershop</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-red-50">
    <header class="bg-red-900 text-white py-4">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-3xl font-bold">{{businessName}}</h1>
            <p class="text-red-200">{{tagline}}</p>
        </div>
    </header>
    
    <main class="py-16">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-red-900 mb-4">{{headline}}</h2>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div>
                    <h3 class="text-2xl font-bold text-red-900 mb-4">About Us</h3>
                    <p class="text-gray-700 leading-relaxed">{{aboutUs}}</p>
                </div>
                
                <div>
                    <h3 class="text-2xl font-bold text-red-900 mb-4">Our Services</h3>
                    <ul class="space-y-2 text-gray-700">{{services}}</ul>
                </div>
            </div>
            
            <div class="text-center mt-12">
                <button class="bg-red-900 hover:bg-red-800 text-white px-8 py-4 rounded-lg text-lg font-bold">
                    {{callToAction}}
                </button>
            </div>
        </div>
    </main>
    
    <footer class="bg-red-900 text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <p><i class="fas fa-phone mr-2"></i>{{phone}}</p>
            <p><i class="fas fa-envelope mr-2"></i>{{email}}</p>
            <p><i class="fas fa-map-marker-alt mr-2"></i>{{location}}</p>
        </div>
    </footer>
</body>
</html>`;
}

function getModernTemplate(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{businessName}} - Modern Barbershop</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-slate-50">
    <header class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-4 py-6">
            <div class="text-center">
                <h1 class="text-3xl font-bold text-slate-900">{{businessName}}</h1>
                <p class="text-slate-600">{{tagline}}</p>
            </div>
        </div>
    </header>
    
    <main class="py-16">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-slate-900 mb-4">{{headline}}</h2>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-4">About Us</h3>
                    <p class="text-slate-600 leading-relaxed">{{aboutUs}}</p>
                </div>
                
                <div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-4">Our Services</h3>
                    <ul class="space-y-2 text-slate-600">{{services}}</ul>
                </div>
            </div>
            
            <div class="text-center mt-12">
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold">
                    {{callToAction}}
                </button>
            </div>
        </div>
    </main>
    
    <footer class="bg-slate-900 text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <p><i class="fas fa-phone mr-2"></i>{{phone}}</p>
            <p><i class="fas fa-envelope mr-2"></i>{{email}}</p>
            <p><i class="fas fa-map-marker-alt mr-2"></i>{{location}}</p>
        </div>
    </footer>
</body>
</html>`;
}
