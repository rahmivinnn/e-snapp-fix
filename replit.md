# Overview

This is an energy monitoring web application called "e-snapp" built with a modern full-stack architecture. The application provides real-time energy consumption tracking, billing management, and energy usage analytics for residential users. It features a mobile-first responsive design with live data visualization, WebSocket-based real-time updates, and comprehensive energy management tools including consumption trends, billing summaries, and user notifications.

**Latest Update (Aug 2, 2025)**: Successfully implemented full PWA (Progressive Web App) functionality with ultra-compact mobile optimization. Application is now installable as a native app on mobile devices and features no-scroll mobile design with 11px base font size. Deployed to insight-flow-ajunjuniantoro.replit.app with all PWA features active.

# User Preferences

Preferred communication style: Simple, everyday language.
UI Requirements: Highly interactive screens with smooth animations, transitions, and visual feedback on all elements.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Charts**: Chart.js for data visualization and energy consumption graphs
- **Real-time Updates**: WebSocket client integration for live energy data

## Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **API Design**: RESTful API with real-time WebSocket server
- **Development**: Hot module replacement with Vite middleware in development
- **Build**: ESBuild for production server bundling

## Data Storage
- **Database**: PostgreSQL with Neon serverless driver
- **Schema**: Relational design with tables for users, energy data, billing, notifications, and user settings
- **Migration**: Drizzle Kit for database schema management
- **Session Storage**: connect-pg-simple for PostgreSQL-backed session storage
- **Fallback Storage**: In-memory storage implementation for development/demo purposes

## Real-time Features
- **WebSocket Server**: Built-in WebSocket server for real-time energy data broadcasting
- **Live Charts**: Automatic chart updates with incoming energy data
- **Data Simulation**: Server-side energy data simulation for demo purposes
- **Client Synchronization**: Automatic reconnection and data synchronization

## Authentication & User Management
- **User System**: Complete user management with profiles and settings
- **Demo Mode**: Pre-configured demo user for immediate application testing
- **Settings Management**: User preferences for notifications and energy alerts
- **Profile Management**: User profile with contact information and preferences
- **Interactive Onboarding**: Complete flow with splash → login/signup → onboarding → device setup → home
- **Social Login**: Google and Apple login with authentic SVG logos and hover animations

## Interactive Features & Animations
- **Splash Screen**: Animated logo entrance, progress bar loading, gradient backgrounds (ultra-compact h-12 logo)
- **Login/Signup**: Button hover/scale effects, loading states with spinners, form slide animations
- **Onboarding**: Smooth slide transitions between steps, image blur/focus effects, floating background animations
- **Setup Wizard**: Loading states on all buttons, hover effects, gradient backgrounds, smooth transitions
- **Home Dashboard**: Card hover effects, animated icons (spinning, bouncing), staggered load animations, pulse effects on real-time data
- **Universal Interactions**: All buttons and cards have hover effects, loading states, and smooth transitions

## PWA Features (Added Aug 2, 2025)
- **Progressive Web App**: Full PWA implementation with manifest.json and service worker
- **Install Capability**: Automatic install button appears on compatible devices
- **Offline Support**: Service worker caching for offline functionality
- **Native App Experience**: Standalone display mode when installed
- **Mobile Optimization**: Ultra-compact design with 11px base font, minimal padding (px-2), no vertical scrolling
- **Real-time Updates**: Push notification support ready for energy alerts

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database access and query building

## UI Component Libraries
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Icon library for consistent iconography
- **Chart.js**: Canvas-based charting library for energy data visualization

## Development Tools
- **Vite**: Fast development server and build tool with HMR
- **TypeScript**: Type safety across frontend and backend
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **React Hook Form**: Form state management with validation

## Validation & Utilities
- **Zod**: Runtime type validation and schema validation
- **date-fns**: Date manipulation and formatting utilities
- **clsx & tailwind-merge**: Conditional CSS class management

## Replit Integration
- **Replit Vite Plugins**: Development environment integration and error handling
- **Cartographer**: Code navigation and development tools integration