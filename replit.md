# AgroVet POS - License Management System

## Overview

AgroVet POS is a Point of Sale system designed for Agricultural and Veterinary shops in Kenya. This repository contains the marketing website and admin dashboard for managing software licenses and clients. The application is built by Agrisols Systems and features license key generation, client management, and a public-facing landing page showcasing the POS product.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a standard structure with pages in `client/src/pages/`, reusable components in `client/src/components/`, and shared utilities in `client/src/lib/`. The admin section has its own pages under `client/src/pages/admin/`.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON API endpoints under `/api/`
- **Development**: Hot module replacement via Vite middleware in development mode
- **Production**: Static file serving from built assets

The server handles CRUD operations for clients and licenses through a storage abstraction layer that interfaces with the database.

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Managed via `drizzle-kit push` command

Current database tables:
- `users` - Admin authentication
- `clients` - AgroVet shop information (name, location, phone, status)
- `licenses` - Software license keys with expiry dates and client associations
- `content` - Blog posts and announcements with AI-powered generation
- `reviews` - Client reviews with approval workflow (pending/approved/rejected)
- `settings` - Application settings including API keys stored securely in database

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- Database schema definitions
- Zod validation schemas derived from Drizzle tables
- TypeScript types for entities

### Build System
- Custom build script (`script/build.ts`) that:
  - Builds frontend with Vite to `dist/public`
  - Bundles server with esbuild to `dist/index.cjs`
  - Inlines specific dependencies for faster cold starts

## External Dependencies

### Database
- PostgreSQL database required (connection via `DATABASE_URL` environment variable)
- Uses `pg` driver with `connect-pg-simple` for session storage capability

### UI Libraries
- Full shadcn/ui component set with Radix UI primitives
- Lucide React for icons
- Embla Carousel for image galleries
- React Day Picker for calendar components

### Development Tools
- Replit-specific Vite plugins for development experience:
  - `@replit/vite-plugin-runtime-error-modal`
  - `@replit/vite-plugin-cartographer`
  - `@replit/vite-plugin-dev-banner`

### Fonts
- DM Sans (body text)
- Outfit (display/headings)
- Loaded from Google Fonts CDN

### AI Integration
- OpenAI API for AI-powered content generation
- API key stored securely in Supabase settings table
- Supports blog post and announcement generation

## Admin Features

### Content Management
- Create and manage blog posts with AI assistance
- Generate content using OpenAI GPT-4o model
- Support for blog posts and announcements
- Draft/Published status workflow
- Access via `/admin/content`

### Review Moderation
- Client review submission system
- Approval workflow: pending → approved/rejected
- Approved reviews displayed on landing page
- Access via `/admin/reviews`

### Settings Management
- Secure OpenAI API key storage in database
- Database connection status display
- Access via `/admin/settings`

## Admin Navigation Order
Dashboard → License Keys → Create Content → Reviews → Clients → Settings