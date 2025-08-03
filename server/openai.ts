import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface BarbershopContent {
  headline: string;
  tagline: string;
  aboutUs: string;
  serviceDescriptions: string[];
  callToAction: string;
}

export async function generateBarbershopContent(data: {
  businessName: string;
  businessLocation: string;
  services: string;
  description: string;
  businessType: string;
}): Promise<BarbershopContent> {
  try {
    const prompt = `Generate professional website content for a barbershop with the following details:

Business Name: ${data.businessName}
Location: ${data.businessLocation}
Business Type: ${data.businessType}
Services: ${data.services}
Description: ${data.description}

Please generate content in JSON format with these fields:
- headline: A compelling main headline (max 60 characters)
- tagline: A catchy tagline that describes the business (max 100 characters)
- aboutUs: A professional "About Us" section (150-200 words)
- serviceDescriptions: Array of 3-5 service descriptions based on the services provided
- callToAction: A compelling call-to-action button text (max 30 characters)

Make the content professional, engaging, and tailored to the barbershop industry. Focus on quality, tradition, and customer satisfaction.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are a professional copywriter specializing in barbershop and salon marketing content. Generate compelling, professional content that converts visitors into customers."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000,
    });

    const content = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      headline: content.headline || `Welcome to ${data.businessName}`,
      tagline: content.tagline || "Your Premier Grooming Destination",
      aboutUs: content.aboutUs || `At ${data.businessName}, we provide exceptional grooming services in ${data.businessLocation}.`,
      serviceDescriptions: content.serviceDescriptions || ["Professional haircuts", "Beard trims", "Hot towel shaves"],
      callToAction: content.callToAction || "Book Your Appointment"
    };
  } catch (error) {
    console.error("Error generating content:", error);
    // Fallback content
    return {
      headline: `Welcome to ${data.businessName}`,
      tagline: "Your Premier Grooming Destination",
      aboutUs: `At ${data.businessName}, we provide exceptional grooming services in ${data.businessLocation}. Our skilled barbers are dedicated to delivering quality cuts and creating an exceptional experience for every customer.`,
      serviceDescriptions: data.services.split(',').map(s => s.trim()).slice(0, 5),
      callToAction: "Book Your Appointment"
    };
  }
}
