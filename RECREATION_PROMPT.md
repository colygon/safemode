# SafeMode Complete Recreation Prompt

This prompt provides everything an AI agent needs to recreate the entire SafeMode project from scratch, including architecture, features, styling, and implementation details.

## Project Overview

SafeMode is a revolutionary AI-powered development platform that transforms software creation into a collaborative, streamlined experience. It provides developers with an intelligent workspace featuring multiple AI coding environments, seamless application integration, and a unique retro desktop-inspired interface. The core value proposition is "Never send a human to do a machine's job" - deploying teams of AI agents that work continuously to accomplish development tasks.

## Core Technology Stack

### Frontend Stack
```json
{
  "framework": "React 18 with TypeScript",
  "buildTool": "Vite",
  "routing": "Wouter",
  "stateManagement": "TanStack Query v5",
  "uiComponents": "shadcn/ui (built on Radix UI)",
  "styling": "Tailwind CSS",
  "formHandling": "React Hook Form + Zod validation",
  "icons": "Lucide React + React Icons",
  "animations": "Framer Motion",
  "themes": "next-themes"
}
```

### Backend Stack
```json
{
  "runtime": "Node.js",
  "framework": "Express.js with TypeScript",
  "orm": "Drizzle ORM",
  "database": "PostgreSQL (Neon)",
  "authentication": "Passport.js",
  "sessionManagement": "Express Session with MemoryStore",
  "validation": "Zod with drizzle-zod"
}
```

### Package Dependencies
```json
{
  "core": [
    "@anthropic-ai/sdk",
    "@auth0/auth0-react", 
    "@auth0/auth0-spa-js",
    "@hookform/resolvers",
    "@neondatabase/serverless",
    "@tanstack/react-query",
    "drizzle-orm",
    "drizzle-kit", 
    "drizzle-zod",
    "express",
    "express-session",
    "react",
    "react-dom",
    "react-hook-form",
    "typescript",
    "vite",
    "wouter",
    "zod"
  ],
  "ui": [
    "@radix-ui/react-accordion",
    "@radix-ui/react-alert-dialog", 
    "@radix-ui/react-avatar",
    "@radix-ui/react-checkbox",
    "@radix-ui/react-dialog",
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-label",
    "@radix-ui/react-popover",
    "@radix-ui/react-select",
    "@radix-ui/react-separator",
    "@radix-ui/react-slot",
    "@radix-ui/react-switch",
    "@radix-ui/react-tabs",
    "@radix-ui/react-toast",
    "@radix-ui/react-tooltip",
    "class-variance-authority",
    "clsx",
    "cmdk",
    "framer-motion",
    "lucide-react",
    "next-themes",
    "react-icons",
    "tailwind-merge",
    "tailwindcss",
    "tailwindcss-animate"
  ],
  "development": [
    "@types/node",
    "@types/react", 
    "@types/react-dom",
    "@types/express",
    "@types/express-session",
    "@vitejs/plugin-react",
    "autoprefixer",
    "postcss",
    "tsx"
  ]
}
```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/           # shadcn/ui components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities and query client
│   │   ├── pages/            # Page components
│   │   ├── App.tsx           # Main app component
│   │   ├── index.css         # Global styles
│   │   └── main.tsx          # React entry point
│   └── index.html            # HTML template
├── server/
│   ├── db.ts                 # Database connection
│   ├── index.ts              # Express server entry
│   ├── routes.ts             # API routes
│   ├── storage.ts            # Storage interface
│   └── vite.ts               # Vite dev server integration
├── shared/
│   └── schema.ts             # Shared database schema
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── drizzle.config.ts         # Drizzle ORM configuration
└── replit.md                 # Project documentation
```

## Database Schema

### Users Table
```typescript
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }).unique(),
  passwordHash: varchar("password_hash", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  credits: integer("credits").default(100),
  subscriptionTier: varchar("subscription_tier", { length: 50 }).default('free')
});
```

### Emails Table (Signup System)
```typescript
export const emails = pgTable("emails", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow()
});
```

## Core Features Implementation

### 1. Agent Launchpad System

The Agent Launchpad is the central hub for managing AI agents. It displays available agents in a grid layout with the following features:

#### Available Agents:
```javascript
const availableApps = [
  {
    id: "claude",
    name: "CLAUDE", 
    description: "Advanced AI assistant for complex reasoning and code generation",
    icon: "🧠",
    category: "AI Assistant",
    provider: "Anthropic",
    url: "http://provider.sfo.computer:32192/",
    enabled: true
  },
  {
    id: "gemini",
    name: "GEMINI",
    description: "Multi-modal AI with vision and advanced capabilities", 
    icon: "💎",
    category: "AI Assistant",
    provider: "Google",
    url: "http://provider.sfo.computer:32193/",
    enabled: true
  },
  {
    id: "visual-studio",
    name: "VISUAL STUDIO",
    description: "Professional development environment",
    icon: "💻",
    category: "Development",
    provider: "Microsoft", 
    url: "http://provider.sfo.computer:32404/",
    enabled: true
  },
  {
    id: "opencode",
    name: "OPENCODE",
    description: "Open-source code editor and development platform",
    icon: "🔧",
    category: "Development",
    provider: "Community",
    url: "http://provider.sfo.computer:32406/",
    enabled: true
  },
  {
    id: "charm-crush", 
    name: "CHARM CRUSH",
    description: "Bug crushing and code optimization specialist",
    icon: "🐛",
    category: "Debugging",
    provider: "SafeMode",
    url: "http://provider.sfo.computer:31984/",
    enabled: true
  }
];
```

#### Agent Launch Functionality:
```javascript
const handleAppLaunch = (appName: string, url?: string) => {
  // Get the appropriate URL for the app
  const finalUrl = url || getAppUrl(appName);
  
  if (!finalUrl) {
    console.error(`No URL configured for app: ${appName}`);
    return;
  }

  // Always open in new tab for all apps
  const newWindow = globalThis.window.open(finalUrl, '_blank');
  if (newWindow) newWindow.focus();

  // Add app to running apps list
  const appInfo = getAppInfo(appName);
  setRunningApps(prev => {
    const exists = prev.find(app => app.id === appInfo.id);
    if (!exists) {
      return [...prev, { id: appInfo.id, name: appName, icon: appInfo.icon }];
    }
    return prev;
  });

  // Show loading animation for visual feedback
  setLoadingApp(appName);
  // ... loading animation logic
};
```

### 2. Multi-Theme System

SafeMode supports three distinct themes with complete visual consistency:

#### Theme Configuration:
```css
/* Retro Mode (Default) */
:root {
  --retro-background: #2A2F38;
  --retro-window: #444B56; 
  --retro-mint: #82E3D1;
  --retro-blue: #4DA4D4;
  --retro-border: #6C7484;
  --retro-light: #E8E8E8;
  --retro-beige: #F5F5DC;
  --retro-red: #FF6B6B;
}

/* Dark Mode */
.dark {
  --background: 0 0% 4%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 15%;
  --secondary-foreground: 0 0% 98%;
}

/* Cypherpunk Mode */
.cypherpunk {
  --cyber-background: #0F172A;
  --cyber-surface: #1E293B;
  --cyber-neon: #00FFFF;
  --cyber-accent: #FF00FF;
  --cyber-text: #E0FFFF;
}
```

#### Theme Implementation:
```javascript
const [viewMode, setViewMode] = useState<'retro' | 'dark' | 'cypherpunk'>('retro');

// Theme-aware styling function
const getThemeClasses = (baseClasses: string) => {
  const themeMap = {
    'cypherpunk': 'bg-slate-900 border-cyan-400 text-cyan-100',
    'dark': 'bg-gray-800 border-gray-600 text-gray-100', 
    'retro': 'bg-retro-beige border-retro-border text-retro-light'
  };
  return `${baseClasses} ${themeMap[viewMode]}`;
};
```

### 3. Responsive Desktop Interface

#### Desktop Layout Components:
```javascript
// Desktop grid system for agents
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-8">
  {availableApps.filter(app => app.enabled).map(app => (
    <div key={app.id} className="agent-card">
      {/* Agent card implementation */}
    </div>
  ))}
</div>

// Taskbar with running applications
<div className="taskbar fixed bottom-0 left-0 right-0">
  <div className="flex items-center justify-between px-4 py-2">
    <div className="flex items-center space-x-2">
      {runningApps.map(app => (
        <button key={app.id} className="taskbar-button">
          {app.icon} {app.name}
        </button>
      ))}
    </div>
    <div className="system-info">
      {/* System information display */}
    </div>
  </div>
</div>
```

#### Mobile Responsive Design:
```javascript
// Mobile-first responsive layout
<div className="md:hidden min-h-screen">
  {/* Mobile header */}
  <div className="mobile-header p-4">
    <h1 className="text-2xl font-bold">SafeMode</h1>
    <p className="text-sm opacity-80">AI Agent Platform</p>
  </div>
  
  {/* Mobile agent grid */}
  <div className="grid grid-cols-2 gap-3 p-4">
    {availableApps.map(app => (
      <MobileAgentCard key={app.id} app={app} />
    ))}
  </div>
</div>
```

### 4. Email Signup System

#### Database Integration:
```javascript
// Storage interface
export interface IStorage {
  createEmail(email: { email: string }): Promise<{ id: string; email: string; createdAt: Date }>;
}

// Database implementation
export class DatabaseStorage implements IStorage {
  async createEmail(emailData: { email: string }) {
    const [email] = await db.insert(emails).values(emailData).returning();
    return email;
  }
}
```

#### API Routes:
```javascript
// POST /api/signup
app.post("/api/signup", async (req, res) => {
  try {
    const { email } = insertEmailSchema.parse(req.body);
    const newEmail = await storage.createEmail({ email });
    res.json(newEmail);
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({ 
        error: "This email is already registered" 
      });
    }
    res.status(400).json({ error: error.message });
  }
});
```

#### Frontend Integration:
```javascript
const emailSignupMutation = useMutation({
  mutationFn: async (email: string) => {
    return await apiRequest("POST", "/api/signup", { email });
  },
  onSuccess: () => {
    toast({
      title: "Success!",
      description: "Thank you for signing up! We'll keep you updated on SafeMode progress.",
    });
    setShowSignupModal(false);
    setSignupEmail("");
  },
  onError: (error: any) => {
    toast({
      title: "Error",
      description: error.message || "Failed to sign up. Please try again.",
      variant: "destructive",
    });
  },
});
```

### 5. Navigation & UI Components

#### Top Navigation Bar:
```javascript
<div className="top-navigation flex items-center justify-between px-6 py-3">
  {/* Logo and branding */}
  <div className="flex items-center space-x-4">
    <div className="logo">SafeMode</div>
    <div className="tagline text-sm opacity-70">
      Never send a human to do a machine's job
    </div>
  </div>
  
  {/* Theme selector */}
  <div className="theme-selector">
    <select 
      value={viewMode} 
      onChange={(e) => setViewMode(e.target.value)}
      className="theme-dropdown"
    >
      <option value="retro">Retro</option>
      <option value="dark">Dark</option>
      <option value="cypherpunk">Cypherpunk</option>
    </select>
  </div>
  
  {/* Credits and signup */}
  <div className="flex items-center space-x-4">
    <div className="credits-display">
      Credits: {credits || 0}
    </div>
    <button 
      onClick={() => setShowSignupModal(true)}
      className="signup-button"
    >
      Sign Up
    </button>
  </div>
</div>
```

#### Modal System:
```javascript
// Signup Modal
{showSignupModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className={`modal-container w-full max-w-md mx-4 rounded-lg shadow-2xl ${getThemeClasses()}`}>
      {/* Modal header */}
      <div className="modal-header flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-xl font-bold font-sans">Join SafeMode</h2>
        <button onClick={() => setShowSignupModal(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Modal body */}
      <div className="modal-body px-6 py-6">
        <p className="text-sm mb-6">
          Get early access to SafeMode and be the first to know when our AI agent team becomes available.
        </p>
        
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 rounded border"
            />
          </div>
          
          <div className="flex space-x-3">
            <button type="submit" className="flex-1 submit-button">
              {emailSignupMutation.isPending ? 'Signing Up...' : 'Sign Up'}
            </button>
            <button type="button" onClick={() => setShowSignupModal(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
```

## Configuration Files

### package.json:
```json
{
  "name": "safemode",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:generate": "drizzle-kit generate"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.29.0",
    "@auth0/auth0-react": "^2.2.4",
    "@auth0/auth0-spa-js": "^2.1.3",
    "@hookform/resolvers": "^3.6.0",
    "@neondatabase/serverless": "^0.9.4",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-tooltip": "^1.1.2",
    "@tanstack/react-query": "^5.51.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "drizzle-orm": "^0.33.0",
    "drizzle-zod": "^0.5.1",
    "express": "^4.19.2",
    "express-session": "^1.18.0",
    "framer-motion": "^11.3.19",
    "lucide-react": "^0.408.0",
    "memorystore": "^1.6.7",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.52.1",
    "react-icons": "^5.2.1",
    "tailwind-merge": "^2.4.0",
    "tailwindcss": "^3.4.7",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "^5.5.3",
    "vite": "^5.3.4",
    "wouter": "^3.3.1",
    "zod": "^3.23.8",
    "zod-validation-error": "^3.3.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.18.0",
    "@types/node": "^20.14.11",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "drizzle-kit": "^0.24.0",
    "postcss": "^8.4.40",
    "tsx": "^4.16.2"
  }
}
```

### vite.config.ts:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
      '@assets': path.resolve(__dirname, './attached_assets')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

### tailwind.config.ts:
```typescript
import type { Config } from 'tailwindcss'

const config = {
  darkMode: ["class"],
  content: [
    './client/src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'retro': {
          'background': '#2A2F38',
          'window': '#444B56',
          'mint': '#82E3D1', 
          'blue': '#4DA4D4',
          'border': '#6C7484',
          'light': '#E8E8E8',
          'beige': '#F5F5DC',
          'red': '#FF6B6B'
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

### drizzle.config.ts:
```typescript
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './shared/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
})
```

## Environment Requirements

### Required Environment Variables:
```bash
DATABASE_URL="postgresql://username:password@host:port/database"
NODE_ENV="development"
```

### Development Setup Commands:
```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Start development server
npm run dev
```

## Key Implementation Details

### 1. App Launching System
- All apps open in new browser tabs (no iframe embedding)
- Loading animations provide visual feedback
- Running apps tracked in state for taskbar display
- URLs configured for Akash Network endpoints

### 2. Theme System Implementation
- CSS custom properties for consistent theming
- Dynamic class application based on theme state
- Complete UI consistency across all components
- Theme persistence in localStorage

### 3. Database Integration
- Drizzle ORM with PostgreSQL
- Type-safe queries with Zod validation
- Email signup system with duplicate prevention
- Automatic timestamp fields

### 4. API Architecture
- RESTful API design with Express.js
- Zod validation for request bodies
- Proper error handling and status codes
- CORS configuration for development

### 5. State Management
- TanStack Query for server state
- React state for UI interactions
- Optimistic updates for better UX
- Error boundary implementation

## Styling Guidelines

### Color System:
- Retro: Nostalgic beiges, mints, and blues
- Dark: Modern grays with blue accents  
- Cypherpunk: Neon cyans and magentas on dark

### Typography:
- Primary: System font stack with fallbacks
- Monospace: For code and technical elements
- Font weights: Regular (400), Medium (500), Bold (700)

### Component Patterns:
- Consistent padding and margins (4px grid)
- Rounded corners (4px, 6px, 8px)
- Subtle shadows and borders
- Hover states with transitions

### Responsive Design:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Grid systems: 2-5 columns based on screen size
- Touch-friendly sizing on mobile

## Error Handling

### Frontend Error Handling:
```javascript
// Query error boundaries
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error?.status === 404) return false;
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

// Toast notifications for user feedback
const { toast } = useToast();

const handleError = (error: any) => {
  toast({
    title: "Error",
    description: error.message || "Something went wrong",
    variant: "destructive",
  });
};
```

### Backend Error Handling:
```javascript
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  if (err.code === '23505') {
    return res.status(409).json({ error: 'Resource already exists' });
  }
  
  res.status(500).json({ error: 'Internal server error' });
});
```

## Performance Optimizations

### Frontend:
- React.memo for expensive components
- useMemo for computed values
- useCallback for event handlers
- Code splitting with React.lazy
- Image optimization and lazy loading

### Backend:
- Database connection pooling
- Query optimization with indexes
- Response compression
- Caching strategies
- Rate limiting

### Build Optimizations:
- Vite for fast development builds
- Tree shaking for smaller bundles
- Asset optimization
- Source map generation
- Environment-specific configurations

## Testing Strategy

### Unit Tests:
```javascript
// Component testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AgentCard from './AgentCard';

test('launches agent when clicked', async () => {
  const queryClient = new QueryClient();
  const mockLaunch = jest.fn();
  
  render(
    <QueryClientProvider client={queryClient}>
      <AgentCard app={mockApp} onLaunch={mockLaunch} />
    </QueryClientProvider>
  );
  
  fireEvent.click(screen.getByRole('button'));
  expect(mockLaunch).toHaveBeenCalledWith(mockApp.name);
});
```

### Integration Tests:
```javascript
// API endpoint testing
import request from 'supertest';
import app from '../server/index';

describe('POST /api/signup', () => {
  test('creates new email signup', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send({ email: 'test@example.com' })
      .expect(200);
      
    expect(response.body.email).toBe('test@example.com');
  });
});
```

## Deployment Configuration

### Production Build:
```bash
npm run build
```

### Environment Variables (Production):
```bash
DATABASE_URL="production_postgresql_url"
NODE_ENV="production"
PORT=5000
```

### Docker Configuration:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

This comprehensive prompt provides everything needed to recreate the entire SafeMode project, including all implementation details, configuration files, styling systems, and architectural decisions. An AI agent can use this to build a complete, functional replica of the SafeMode platform.