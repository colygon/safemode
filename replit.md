# Overview

This is a full-stack web application, "SafeMode," built with React and Express, featuring a retro desktop-inspired user interface. It utilizes a modern TypeScript stack with shadcn/ui components for the frontend and Express.js for the backend API, integrating with PostgreSQL via Drizzle ORM. The application's purpose is to provide an easy way to build applications using AI agents, offering a decentralized environment for development. It aims to be a comprehensive platform for AI-assisted coding with a unique, nostalgic user experience, and is designed for deployment on platforms like Replit.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite.
- **Routing**: Wouter for client-side routing.
- **State Management**: TanStack Query for server state management and caching.
- **UI Components**: shadcn/ui library built on Radix UI primitives.
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting Dark Mode, Retro Mode, and Cypherpunk Mode.
- **Form Handling**: React Hook Form with Zod validation.
- **UI/UX Decisions**: Retro desktop theme ("SafeMode OS") with authentic micro-interactions and "meet your new R&D team." branding. Responsive design with a Linktree-style mobile layout. Theme-specific branding and icons, including a "Agent Launchpad" for app management with toggleable applications and a global theme selector with visual previews. Recent updates include removing extra spacing between app titles and descriptions for tighter visual layout, simplified description text to "Never send a human to do a machine's job. Safe Mode sends a team of AI Agents that work continuously while you sleep to accomplish whatever task you ask them to do. Be nice," unified messaging across all view modes, reduced app button sizes for more compact design, dynamic window sizing (smaller for ≤6 apps), running apps tracking system that shows launched applications in the desktop taskbar with click-to-close functionality, countdown timer integration within Credits button, simplified branding from "SafeMode Chat" to "Chat", and payment modal with Credit Card and MetaMask options. Default enabled apps: Claude, Gemini, Visual Studio, Opencode, and Crush only.

## Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API.

## Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect.
- **Schema**: Includes a User table.
- **Validation**: Zod schemas for runtime type validation.

## Authentication & Authorization
- **Email Signup System**: Simple email capture form that saves to PostgreSQL database
- **Storage Interface**: Abstract IStorage interface with DatabaseStorage for email collection
- **User Management**: Email-based signup system for user registration and notifications

## System Design Choices
- Monorepo structure with shared TypeScript definitions for full-stack type safety.
- Applications are launched via a desktop-like interface with customizable visibility.
- Integrated chat system with typing indicators.
- Global theme selection with visual previews.

# External Dependencies

- **Database**: Neon Database (PostgreSQL).
- **UI Framework**: Radix UI.
- **Build Tools**: Vite (frontend), esbuild (backend).
- **Payment Processing**: Stripe packages configured for credit card payments.
- **Integrated AI Services (examples)**: Claude, Gemini, VSCode, Opencode, Cursor, ChatGPT, Charm Crush (Crush), Add an Agent (feedback form).
- **Authentication**: Email-based signup system for user registration
- **External Links/APIs**: Akash deployment endpoints for Terminal and File Browser, various contact platforms (Discord, Telegram, Signal)

# Recent Changes (Latest Session)

- **Removed Email Signup System**: Eliminated email capture functionality from the application
- **Cleaned Top Navigation Bar**: Removed email field and signup form from top bar interface
- **Simplified Interface**: Removed email-related modals, state variables, and API calls
- **Code Cleanup**: Removed unused email imports and mutation handlers for cleaner codebase
- **Removed LLM Heaven**: Eliminated LLM Heaven from apps list and cleaned up related references
- **Fixed URL Consistency**: Removed environment-based URL switching to maintain consistent http provider URLs
  - All apps now use consistent provider.sfo.computer or provider.akt.computer URLs regardless of environment
  - Removed production URL switching that was changing links to public services in deployed apps
  - Apps maintain their http URLs consistently in both development and production
- **Simplified to Private Environment Only**: Removed Private/Public window selector and standardized on Private environment
  - All apps now use Private environment URLs (provider.sfo.computer endpoints)
  - Removed window selector buttons from both desktop and mobile interfaces
  - Simplified URL management by eliminating dual environment system
  - Apps consistently use the same Private URLs for all users
- **Eliminated Desktop Window System**: Completely removed iframe embedding due to X-Frame-Options blocking
  - All apps now open directly in new browser tabs instead of embedded desktop windows
  - Removed desktop window management, taskbar window buttons, and window rendering components
  - Eliminated DesktopWindow component and all related window state management
  - Apps launch with loading animation feedback and open properly in new tabs without blocking issues

# Production Deployment Notes

## Email Signup System Configuration
The email signup system uses a simple PostgreSQL database to store user emails:

**Database Requirements:**
- PostgreSQL database with `emails` table
- DATABASE_URL environment variable properly configured
- Drizzle ORM schema migrations applied (`npm run db:push`)

**Email Collection Features:**
- Frontend email validation with user-friendly error messages
- Backend API endpoint `/api/signup` for email storage
- Toast notifications for successful signups and error handling
- Prevention of duplicate email signups