# Overview

This is a full-stack web application that generates mockup homepages for barbershops using AI-powered content generation. The application allows users to create either template-based websites or request fully customized designs. It features a React frontend with TypeScript, an Express backend, PostgreSQL database with Drizzle ORM, and integrates with OpenAI for content generation and Stripe for payment processing.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management and React Hook Form for form handling
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Payment Integration**: Stripe React components for payment processing

## Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful APIs with structured error handling and request logging middleware
- **Payment Processing**: Stripe SDK for handling payments and webhooks
- **Content Generation**: OpenAI GPT-4o integration for generating barbershop-specific content

## Database & ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Schema**: Three main entities - users, template_requests, and personalized_requests
- **Data Storage**: JSON fields for storing generated AI content and HTML templates

## Authentication & Sessions
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Management**: Basic user authentication system with bcrypt password hashing

## File Upload & Asset Management
- **Logo Uploads**: File upload handling for business logos
- **Static Assets**: Vite-managed static assets with proper aliasing

## Development & Deployment
- **Development**: Hot module replacement with Vite dev server integration
- **Build Process**: Separate build processes for client (Vite) and server (esbuild)
- **Environment**: Configured for Replit deployment with runtime error overlays

## Business Logic Flow
1. **Template Route**: Users fill form → AI generates content → Preview shown → Payment → HTML deployment
2. **Personalized Route**: Users request consultation → Payment for consultation → Admin workflow → Final quote → Final payment

# External Dependencies

## Core Services
- **OpenAI API**: GPT-4o model for generating barbershop content (headlines, descriptions, service lists)
- **Stripe**: Payment processing for both template purchases ($199) and consultation fees
- **Neon Database**: Serverless PostgreSQL database hosting

## Frontend Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **TanStack Query**: Server state management and data fetching
- **React Hook Form**: Form validation with Zod resolver integration
- **Tailwind CSS**: Utility-first CSS framework for styling

## Backend Libraries
- **Drizzle Kit**: Database migrations and schema management
- **Express**: Web application framework with middleware support
- **Zod**: Runtime type validation for API requests and responses

## Development Tools
- **Vite**: Frontend build tool with React plugin
- **TypeScript**: Static type checking across the entire stack
- **ESBuild**: Fast JavaScript bundler for server-side code