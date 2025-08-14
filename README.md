# SafeMode - AI Agent Development Platform

Never send a human to do a machine's job. SafeMode deploys teams of AI agents that work continuously to accomplish development tasks while you sleep.

![SafeMode Interface](https://img.shields.io/badge/Status-Active%20Development-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-98%25-blue)

## Overview

SafeMode is a revolutionary AI-powered development platform that transforms software creation into a collaborative, streamlined experience. It provides developers with an intelligent workspace featuring multiple AI coding environments, seamless application integration, and a unique retro desktop-inspired interface.

## Core Features

- **🤖 Multi-Agent System**: Deploy specialized AI agents simultaneously
- **⏰ 24/7 Development**: Agents work continuously while you sleep
- **🖥️ Retro Desktop UI**: Nostalgic interface with modern functionality
- **🌍 Decentralized Infrastructure**: Built on Akash Network
- **⚡ 99.99% Uptime SLA**: Enterprise-grade reliability

## Available AI Agents

- **Claude**: Advanced reasoning and code generation
- **Gemini**: Multi-modal AI with vision capabilities
- **Visual Studio**: Professional development environment
- **OpenCode**: Open-source code editor and platform
- **Charm Crush**: Bug crushing and optimization specialist

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for blazing-fast development
- TailwindCSS for styling
- shadcn/ui components
- Wouter for routing
- TanStack Query for state management

### Backend
- Express.js with TypeScript
- Drizzle ORM with PostgreSQL
- Zod validation
- Session management
- RESTful API design

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Environment variables configured

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/safemode.git
cd safemode

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL

# Push database schema
npm run db:push

# Start development server
npm run dev
```

## Environment Variables

```bash
DATABASE_URL="postgresql://username:password@host:port/database"
NODE_ENV="development"
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Drizzle Studio

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   └── lib/          # Utilities
├── server/               # Express backend
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database layer
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
└── docs/                 # Documentation
```

## Theme System

SafeMode supports three distinct themes:

- **🕹️ Retro Mode**: Windows 95 inspired nostalgia
- **🌙 Dark Mode**: Modern dark interface
- **🔮 Cypherpunk Mode**: Matrix-inspired neon aesthetics

## API Documentation

### Endpoints

- `GET /api/server-info` - Server information
- `POST /api/signup` - Email signup
- `GET /api/agents` - List available agents
- `POST /api/agents/launch` - Launch an agent

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Guidelines

1. Follow TypeScript best practices
2. Use Tailwind for styling
3. Maintain theme consistency
4. Write comprehensive tests
5. Document new features

## Deployment

SafeMode is designed for deployment on:

- **Replit** (Primary platform)
- **Vercel** (Frontend)
- **Railway** (Backend)
- **Akash Network** (Decentralized agents)

## Roadmap

### Q1 2025
- ✅ Core platform launch
- ✅ Multi-theme system
- ⬜ Billing integration
- ⬜ Mobile application

### Q2 2025
- Agent marketplace
- Custom agent development
- Team collaboration features
- Enterprise features

## Support

- 📧 Email: support@safemode.ai
- 💬 Discord: [Join our community](https://discord.gg/safemode)
- 📱 Twitter: [@SafeModeAI](https://twitter.com/SafeModeAI)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with ❤️ for developers who want to multiply their impact
- Inspired by the vision of autonomous software development
- Powered by the latest AI models and decentralized infrastructure

---

**Remember: Never send a human to do a machine's job.** 🤖

Made with 🚀 by the SafeMode team
