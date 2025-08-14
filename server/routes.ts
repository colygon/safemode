import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSignupSchema } from "@shared/schema";
import os from "os";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get server info endpoint
  app.get("/api/server-info", (req, res) => {
    const networkInterfaces = os.networkInterfaces();
    let serverIP = "0.0.0.0";
    
    // Find the first non-internal IPv4 address
    for (const [name, nets] of Object.entries(networkInterfaces)) {
      if (nets) {
        for (const net of nets) {
          if (net.family === 'IPv4' && !net.internal) {
            serverIP = net.address;
            break;
          }
        }
      }
      if (serverIP !== "0.0.0.0") break;
    }
    
    res.json({ serverIP });
  });

  // Chat endpoint with OpenAI integration
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory = [] } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      // Build conversation context with system message
      const messages = [
        {
          role: "system" as const,
          content: "You are Colin, an AI assistant and expert on open source LLMs and AI agents. You specialize in tools like Cursor, OpenCode, Claude Code, Gemini CLI, and OpenAI Codex. You help users navigate, optimize, and troubleshoot these AI development environments. Keep responses helpful, technical when appropriate, and concise."
        },
        ...conversationHistory.slice(-10), // Keep last 10 messages for context
        {
          role: "user" as const,
          content: message
        }
      ];

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      const reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";

      res.json({ 
        reply,
        usage: completion.usage 
      });

    } catch (error) {
      console.error("OpenAI API Error:", error);
      res.status(500).json({ 
        error: "Sorry, I'm having trouble connecting to my AI brain right now. Please try again later." 
      });
    }
  });

  // Email signup endpoint
  app.post("/api/signup", async (req, res) => {
    try {
      const { email } = req.body;

      // Validate email with Zod
      const validatedData = insertEmailSignupSchema.parse({ email });

      // Check if email already exists
      const existingSignup = await storage.getEmailSignup(validatedData.email);
      if (existingSignup) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Create new email signup
      const signup = await storage.createEmailSignup(validatedData);

      res.json({ 
        success: true,
        message: "Successfully signed up! We'll keep you updated.",
        signup: { email: signup.email, createdAt: signup.createdAt }
      });

    } catch (error: any) {
      console.error("Email signup error:", error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          error: "Please enter a valid email address" 
        });
      }
      
      res.status(500).json({ 
        error: "Something went wrong. Please try again." 
      });
    }
  });

  // Get all email signups (for admin purposes)
  app.get("/api/signups", async (req, res) => {
    try {
      const signups = await storage.getAllEmailSignups();
      res.json({ signups });
    } catch (error) {
      console.error("Error fetching signups:", error);
      res.status(500).json({ error: "Failed to fetch signups" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
