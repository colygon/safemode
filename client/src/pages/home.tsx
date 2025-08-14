import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Monitor,
  Folder,
  Globe,
  Zap,
  HardDrive,
  Trash2,
  Bot,
  Terminal,
  Package,
  MessageCircle,
  X,
  Lock,
  ChevronRight,
  Shield,
  Rocket,
  Maximize,
  Minimize,
  Heart,
  Save,
  UserPlus,
  Clock,
  LogIn,
  LogOut,
  User,
  Settings,
  Mail,
} from "lucide-react";
import { SiGithub, SiOpenai, SiGooglegemini } from 'react-icons/si';


// Claude Logo Component (refined sunburst design)
const ClaudeLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <g transform="translate(12,12)">
      {/* Sunburst rays - more refined pattern */}
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(22.5)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(45)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(67.5)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(90)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(112.5)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(135)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(157.5)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(180)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(202.5)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(225)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(247.5)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(270)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(292.5)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(315)" />
      <ellipse cx="0" cy="-7" rx="0.7" ry="3.5" transform="rotate(337.5)" />
      {/* Center circle */}
      <circle cx="0" cy="0" r="2.5" />
    </g>
  </svg>
);

// Star Logo Component (for Open Code)
const StarLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// Visual Studio Code Logo Component (official design)
const VisualStudioLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.7 2.6l-8.8 8.1L4.5 7.4l-2.2 1.2v6.8l2.2 1.2 4.4-3.3 8.8 8.1L22 19.8V4.2l-4.3-1.6z"/>
    <path d="M17.7 6.9v10.2L10.9 12l6.8-5.1z" opacity="0.8"/>
    <path d="M8.9 12l-4.4 3.3V8.7L8.9 12z" opacity="0.6"/>
  </svg>
);

// Heart with Arrow Component (for Charm Crush)
const HeartArrowLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    {/* Heart shape */}
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    {/* Arrow shaft - thicker and more visible */}
    <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    {/* Arrow head - larger and more prominent */}
    <polygon points="16,16 19,19 16,22 13,19" fill="white" stroke="white" strokeWidth="1"/>
    {/* Arrow tail - fletching style */}
    <polygon points="8,2 5,5 8,8 11,5" fill="white" stroke="white" strokeWidth="1"/>
  </svg>
);

// Toggle Switch Component
const ToggleSwitch = ({ enabled, onToggle, className = "" }: { enabled: boolean; onToggle: () => void; className?: string }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
      enabled 
        ? 'bg-cyan-500' 
        : 'bg-gray-600'
    } ${className}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

// Desktop Window Component
interface DesktopWindowProps {
  window: {
    id: string;
    title: string;
    url: string;
    x: number;
    y: number;
    width: number;
    height: number;
    isMinimized: boolean;
    zIndex: number;
  };
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  viewMode: 'dark' | 'retro' | 'cypherpunk';
}

const DesktopWindow: React.FC<DesktopWindowProps> = ({ 
  window, 
  onClose, 
  onMinimize, 
  onFocus, 
  onMove, 
  viewMode 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.x,
      y: e.clientY - window.y
    });
    onFocus();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      onMove(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (window.isMinimized) return null;

  return (
    <div
      className={`fixed border-2 rounded-lg shadow-2xl backdrop-blur-sm flex flex-col ${
        viewMode === 'cypherpunk'
          ? 'bg-slate-800/95 border-cyan-400/80'
          : viewMode === 'dark'
          ? 'bg-gray-800/95 border-gray-600'
          : 'bg-white/95 border-gray-300'
      }`}
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex
      }}
      onClick={onFocus}
    >
      {/* Window Title Bar */}
      <div
        className={`flex items-center justify-between p-3 border-b cursor-move ${
          viewMode === 'cypherpunk'
            ? 'bg-slate-700/80 border-cyan-400/50 text-cyan-100'
            : viewMode === 'dark'
            ? 'bg-gray-700 border-gray-600 text-gray-100'
            : 'bg-gray-100 border-gray-300 text-gray-800'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <span className="font-medium text-sm">{window.title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
            title="Minimize"
          />
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            title="Close"
          />
        </div>
      </div>
      
      {/* Window Content */}
      <div className="flex-1 overflow-hidden bg-white relative">
        <iframe
          src={window.url}
          className="w-full h-full border-0"
          title={window.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          onLoad={(e) => {
            console.log(`Iframe loaded: ${window.title} - ${window.url}`);
            // Hide the loading message when iframe loads
            const loadingDiv = e.currentTarget.nextElementSibling as HTMLElement;
            if (loadingDiv) loadingDiv.style.display = 'none';
          }}
          onError={(e) => {
            console.error(`Iframe error: ${window.title} - ${window.url}`);
            // Show error message
            const loadingDiv = e.currentTarget.nextElementSibling as HTMLElement;
            if (loadingDiv) {
              loadingDiv.innerHTML = `
                <div class="text-center">
                  <p class="text-sm text-red-500">Failed to load ${window.title}</p>
                  <p class="text-xs mt-1 opacity-60">${window.url}</p>
                  <button onclick="globalThis.window.open('${window.url}', '_blank')" class="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                    Open in New Tab
                  </button>
                </div>
              `;
            }
          }}
        />
        {/* Loading/Error overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 pointer-events-auto bg-white/90">
          <div className="text-center">
            <div className="mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
            <p className="text-sm">Loading {window.title}...</p>
            <p className="text-xs mt-1 opacity-60">{window.url}</p>
            <button
              onClick={() => {
                const newWindow = globalThis.window.open(window.url, '_blank');
                if (newWindow) newWindow.focus();
              }}
              className="mt-3 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
            >
              Open in New Tab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { toast } = useToast();

  // Countdown timer state (100 hours in seconds)
  const [countdownSeconds, setCountdownSeconds] = useState(100 * 60 * 60);
  // Current time state
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loadingApp, setLoadingApp] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [showAppLauncher, setShowAppLauncher] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'dark' | 'retro' | 'cypherpunk'>('cypherpunk');
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showLogoMenu, setShowLogoMenu] = useState(false);
  const [showSafeModeMenu, setShowSafeModeMenu] = useState(false);
  const [showSafeModeWindow, setShowSafeModeWindow] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [showMobileApps, setShowMobileApps] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // App management states
  const [isEditingApps, setIsEditingApps] = useState(false);

  const [enabledApps, setEnabledApps] = useState<Record<string, boolean>>({
    'claude-code': true,
    'gemini-cli': true,
    'visual-studio': true,
    'open-code': true,
    'charm-crush': false,
    'add-agent': false,
    'chatgpt': false,

    'terminal': true,
    'file-browser': true,
    'self-destruct': false
  });

  // Rotating titles and subtitles
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  
  const titles = [
    "meet your new R&D team."
  ];
  
  const subtitles = [
    "Never send a human to do a machine's job. Safe Mode sends a team of AI Agents that work continuously while you sleep to accomplish whatever task you ask them to do. Be nice."
  ];
  
  // Start menu submenu states
  const [showStartApplications, setShowStartApplications] = useState(false);
  const [showStartSystem, setShowStartSystem] = useState(false);
  const [showStartView, setShowStartView] = useState(false);
  const [showStartHelp, setShowStartHelp] = useState(false);
  
  // Safemode action modal state
  const [showSafemodeModal, setShowSafemodeModal] = useState(false);
  
  // Credits modal state
  const [showSignInModal, setShowSignInModal] = useState(false);
  
  // Email signup state
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");

  // Research/Develop toggle and input state
  const [mode, setMode] = useState<'research' | 'develop'>('research');
  const [ideaInput, setIdeaInput] = useState("");

  // Chat states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'support', message: string, time: string}>>([
    {
      type: 'support',
      message: 'Hello! I\'m Colin, your AI assistant and expert on open source LLMs and AI agents. How can I assist you today?',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    },
    {
      type: 'support', 
      message: 'I can help with:\n• Cursor IDE optimization\n• OpenCode development environments\n• Claude Code integrations\n• Gemini CLI workflows\n• OpenAI Codex implementations\n\nWhat AI development tool would you like to explore?',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Running apps state
  const [runningApps, setRunningApps] = useState<Array<{id: string, name: string, icon?: any}>>([]);

  // Desktop windows state
  interface DesktopWindow {
    id: string;
    title: string;
    url: string;
    x: number;
    y: number;
    width: number;
    height: number;
    isMinimized: boolean;
    zIndex: number;
  }
  const [desktopWindows, setDesktopWindows] = useState<DesktopWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const [serverIP, setServerIP] = useState<string>("Loading...");
  const [userIP, setUserIP] = useState<string>("Loading...");

  // Email signup mutation
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds(prev => Math.max(0, prev - 1));
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Get server IP
    fetch('/api/server-info')
      .then(res => res.json())
      .then(data => setServerIP(data.serverIP))
      .catch(() => setServerIP("0.0.0.0"));

    // Get user IP
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIP(data.ip))
      .catch(() => setUserIP("Unknown"));
  }, []);

  // No rotation needed since subtitle is fixed
  // useEffect(() => {
  //   const subtitleInterval = setInterval(() => {
  //     setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length);
  //   }, 4000); // Change subtitle every 4 seconds

  //   return () => {
  //     clearInterval(subtitleInterval);
  //   };
  // }, [subtitles.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.menu-container')) {
        setShowFileMenu(false);
        setShowEditMenu(false);
        setShowViewMenu(false);
        setShowHelpMenu(false);
        setShowStartMenu(false);
        setShowLogoMenu(false);
        setShowStartApplications(false);
        setShowStartSystem(false);
        setShowStartView(false);
        setShowStartHelp(false);
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      // Disabled fullscreen toggle to prevent accidental activation
      // if (event.key === 'F' || event.key === 'f') {
      //   handleToggleFullScreen();
      // }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // App mapping for icons and IDs
  const getAppInfo = (appName: string) => {
    const appMap: Record<string, {id: string, icon: any}> = {
      'CLAUDE': { id: 'claude-code', icon: ClaudeLogo },
      'GEMINI': { id: 'gemini-cli', icon: SiGooglegemini },
      'VSCODE': { id: 'visual-studio', icon: VisualStudioLogo },
      'OPENCODE': { id: 'open-code', icon: StarLogo },
      'CHARM CRUSH': { id: 'charm-crush', icon: null },
      'ChatGPT': { id: 'chatgpt', icon: SiOpenai },
      'Cursor': { id: 'add-agent', icon: null },
      'Terminal': { id: 'terminal', icon: Terminal },
      'Files': { id: 'file-browser', icon: Folder }
    };
    return appMap[appName] || { id: appName.toLowerCase().replace(/\s+/g, '-'), icon: null };
  };

  // Get app URLs - always use Private environment (provider.sfo.computer)
  const getAppUrl = (appName: string) => {
    // Debug logging
    console.log('Getting app URL for:', { appName });

    // Private environment URLs (provider.sfo.computer)
    const appUrls: Record<string, string> = {
      'CLAUDE': 'http://provider.sfo.computer:32192/',
      'GEMINI': 'http://provider.sfo.computer:30396/',
      'VSCODE': 'http://gpf44auiu1ai77igla6tunbifk.ingress.sfo.computer/',
      'OPENCODE': 'http://provider.sfo.computer:32406/',
      'CHARM CRUSH': 'http://provider.sfo.computer:31984/',
      'ChatGPT': 'https://chatgpt.com',
      'Cursor': 'https://cursor.sh',
      'Terminal': 'http://provider.sfo.computer:31203/',
      'Files': 'http://provider.sfo.computer:32195/files/'
    };

    const finalUrl = appUrls[appName];
    
    console.log(`App: ${appName}, URL: ${finalUrl}`);
    
    return finalUrl;
  };

  // Desktop window management functions
  const createDesktopWindow = (appName: string, url: string) => {
    const windowId = `${appName}_${Date.now()}`;
    const newWindow: DesktopWindow = {
      id: windowId,
      title: appName,
      url: url,
      x: 100 + desktopWindows.length * 30, // Cascade windows
      y: 100 + desktopWindows.length * 30,
      width: 1000,
      height: 700,
      isMinimized: false,
      zIndex: nextZIndex
    };
    
    setDesktopWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);

    // Set a timeout to check if iframe loads properly
    setTimeout(() => {
      const iframe = document.querySelector(`iframe[title="${appName}"]`) as HTMLIFrameElement;
      if (iframe) {
        try {
          // Check if iframe content is accessible
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!doc || doc.location.href === 'about:blank') {
            console.warn(`Iframe for ${appName} appears to be blocked or not loading properly`);
          }
        } catch (e) {
          console.warn(`Iframe for ${appName} blocked by CORS/X-Frame-Options:`, e);
        }
      }
    }, 3000);
  };

  const closeDesktopWindow = (windowId: string) => {
    setDesktopWindows(prev => prev.filter(w => w.id !== windowId));
    // Also remove from running apps
    setRunningApps(prev => prev.filter(app => !app.id.includes(windowId)));
  };

  const minimizeDesktopWindow = (windowId: string) => {
    setDesktopWindows(prev => 
      prev.map(w => w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w)
    );
  };

  const focusDesktopWindow = (windowId: string) => {
    const newZIndex = nextZIndex;
    setDesktopWindows(prev =>
      prev.map(w => w.id === windowId ? { ...w, zIndex: newZIndex, isMinimized: false } : w)
    );
    setNextZIndex(prev => prev + 1);
  };

  const updateWindowPosition = (windowId: string, x: number, y: number) => {
    setDesktopWindows(prev =>
      prev.map(w => w.id === windowId ? { ...w, x, y } : w)
    );
  };

  const handleAppLaunch = (appName: string, url?: string) => {
    // Use the provided URL or get the appropriate URL for the app
    const finalUrl = url || getAppUrl(appName);
    
    if (!finalUrl) {
      console.error(`No URL configured for app: ${appName}`);
      return;
    }

    // Always open in new tab for all apps
    const newWindow = globalThis.window.open(finalUrl, '_blank');
    if (newWindow) newWindow.focus();

    // Add app to running apps list if not already there
    const appInfo = getAppInfo(appName);
    setRunningApps(prev => {
      const exists = prev.find(app => app.id === appInfo.id);
      if (!exists) {
        return [...prev, { id: appInfo.id, name: appName, icon: appInfo.icon }];
      }
      return prev;
    });

    // Show brief loading animation for visual feedback
    setLoadingApp(appName);
    setLoadingProgress(0);

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + Math.random() * 50;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoadingApp(null);
            setLoadingProgress(0);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 50);
  };

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Count enabled apps to determine grid layout
  const countEnabledApps = () => {
    return Object.values(enabledApps).filter(Boolean).length;
  };

  // Get dynamic grid classes based on number of enabled apps
  const getGridClasses = () => {
    // Always use 4 columns when editing apps
    if (isEditingApps) {
      return "grid grid-cols-2 md:grid-cols-4 gap-3"; // 4 columns when editing
    }
    
    const enabledCount = countEnabledApps();
    if (enabledCount < 7) {
      return "grid grid-cols-2 md:grid-cols-3 gap-3"; // 3 columns when less than 7 apps
    }
    return "grid grid-cols-2 md:grid-cols-4 gap-3"; // 4 columns when 7 or more apps
  };

  const handleComputerAction = (action: string) => {
    // Handle computer actions here
    console.log('Computer action:', action);
  };

  const handleApplicationLaunch = (appName: string, url: string) => {
    setShowStartMenu(false);
    handleAppLaunch(appName, url);
  };

  const handleMenuAction = (action: string) => {
    // Handle menu actions here
    console.log('Menu action:', action);
    // Close all menus
    setShowHelpMenu(false);
    setShowViewMenu(false);
    setShowStartMenu(false);
    setShowLogoMenu(false);
    setShowSafeModeMenu(false);
  };

  // Fullscreen toggle function
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    // Add user message
    const userMessage = {
      type: 'user' as const,
      message: chatInput,
      time: time
    };
    
    const currentInput = chatInput;
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);
    
    try {
      // Build conversation history for context
      const conversationHistory = chatMessages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.message
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const supportMessage = {
        type: 'support' as const,
        message: data.reply,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, supportMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        type: 'support' as const,
        message: 'Sorry, I\'m experiencing some technical difficulties. Please try again in a moment.',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChatKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  };

  const handleToggleFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullScreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullScreen(false);
      }
    } catch (error) {
      console.log('Fullscreen not supported or failed:', error);
    }
    setShowViewMenu(false);
  };

  // Get dynamic classes based on view mode
  const getViewModeClasses = () => {
    switch (viewMode) {
      case 'dark':
        return 'retro-font min-h-screen bg-gray-900 overflow-hidden relative';
      case 'cypherpunk':
        return 'retro-font min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800 overflow-hidden relative';
      default: // retro
        return 'retro-font min-h-screen desktop-bg overflow-hidden relative';
    }
  };

  // Get app launcher window classes based on view mode
  const getAppLauncherClasses = () => {
    const enabledCount = countEnabledApps();
    const maxWidthClass = enabledCount <= 6 ? 'max-w-3xl' : 'max-w-5xl';
    const baseClasses = `border-2 rounded-lg p-4 ${maxWidthClass} w-full absolute top-1/2 z-10 transition-all duration-300 flex flex-col justify-center min-h-96`;
    const positionClasses = isChatOpen 
      ? 'left-4 -translate-y-1/2 max-w-[calc(100vw-24rem)]' 
      : 'left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    
    switch (viewMode) {
      case 'cypherpunk':
        return `${baseClasses} ${positionClasses} bg-slate-900/90 border-cyan-400 backdrop-blur-md`;
      case 'dark':
        return `${baseClasses} ${positionClasses} bg-gray-800/90 border-gray-600 backdrop-blur-md`;
      default:
        return `bg-retro-beige-light border-retro-teal ${baseClasses} ${positionClasses}`;
    }
  };

  // Get text color classes based on view mode
  const getTextClasses = () => {
    switch (viewMode) {
      case 'cypherpunk':
        return 'text-cyan-100';
      case 'dark':
        return 'text-gray-100';
      default:
        return 'text-retro-light';
    }
  };

  // Get header title for app launcher
  const getAppLauncherTitle = () => {
    switch (viewMode) {
      case 'cypherpunk':
        return 'Agent Launchpad';
      default:
        return 'SAFEMODE OS';
    }
  };

  // Get app button classes based on view mode
  const getAppButtonClasses = () => {
    switch (viewMode) {
      case 'cypherpunk':
        return 'w-full p-3 rounded-lg text-center h-40 flex flex-col justify-between items-center bg-slate-800/60 border-2 border-cyan-400/30 hover:border-cyan-400 hover:bg-slate-700/80 transition-all duration-300 backdrop-blur-sm';
      case 'dark':
        return 'w-full p-3 rounded-lg text-center h-40 flex flex-col justify-between items-center bg-gray-700/60 border-2 border-gray-500/30 hover:border-gray-400 hover:bg-gray-600/80 transition-all duration-300 backdrop-blur-sm';
      default:
        return 'retro-button retro-app-button w-full p-3 rounded-lg text-center h-40 flex flex-col justify-between items-center';
    }
  };

  // Get app icon background classes
  const getAppIconClasses = (color: string) => {
    if (viewMode === 'cypherpunk') {
      return `w-12 h-12 bg-cyan-600/80 border border-cyan-400 rounded-lg flex items-center justify-center mb-2`;
    }
    return `w-12 h-12 bg-${color} rounded-lg flex items-center justify-center mb-2 pixel-art`;
  };

  // Handle app toggle
  const handleAppToggle = (appId: string) => {
    setEnabledApps(prev => ({
      ...prev,
      [appId]: !prev[appId]
    }));
  };

  // Handle save app settings
  const handleSaveAppSettings = () => {
    // Save to localStorage or send to backend
    try {
      if (typeof Storage !== "undefined") {
        localStorage.setItem('enabledApps', JSON.stringify(enabledApps));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    setIsEditingApps(false);
  };

  // Load saved app settings on mount
  useEffect(() => {
    try {
      if (typeof Storage !== "undefined") {
        const saved = localStorage.getItem('enabledApps');
        if (saved) {
          setEnabledApps(JSON.parse(saved));
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  return (
    <div className={getViewModeClasses()}>

      {/* Top Menu Bar */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-black/30 backdrop-blur-md border-b border-white/20 flex items-center justify-between px-2 sm:px-4 z-30">
        {/* Left side - Safemode button and menus */}
        <div className="flex items-center space-x-1 sm:space-x-4">
          {/* Safemode Button - Desktop */}
          <button
            onClick={() => {
              setShowSafeModeWindow(!showSafeModeWindow);
            }}
            className={`hidden md:block text-sm font-bold transition-colors duration-200 tracking-wide font-sans antialiased ${
              viewMode === 'cypherpunk' 
                ? 'text-cyan-100 hover:text-cyan-300' 
                : viewMode === 'dark'
                ? 'text-gray-100 hover:text-gray-300'
                : 'text-white hover:text-gray-200'
            }`}
          >
            {viewMode === 'cypherpunk' ? '⚡' : viewMode === 'dark' ? '🌙' : '🍎'} SafeMode
          </button>
          
          {/* Safemode Button - Mobile */}
          <button
            onClick={() => {
              setShowSafeModeWindow(!showSafeModeWindow);
            }}
            className="md:hidden flex items-center space-x-2 transition-all duration-200"
            title="SafeMode Settings"
          >
            <Shield className={`w-5 h-5 ${
              viewMode === 'cypherpunk' 
                ? 'text-cyan-100 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]' 
                : viewMode === 'dark'
                ? 'text-gray-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]'
                : 'text-retro-light drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]'
            }`} />
            <span className={`font-mono text-sm font-bold antialiased ${
              viewMode === 'cypherpunk' 
                ? 'text-cyan-100 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]' 
                : viewMode === 'dark'
                ? 'text-gray-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]'
                : 'text-retro-light drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]'
            }`}>SafeMode</span>
          </button>

          

          
          {/* File Menu - Hidden on mobile */}
          <div className="relative menu-container hidden md:block">
            <button
              onClick={() => {
                setShowFileMenu(!showFileMenu);
                setShowEditMenu(false);
                setShowViewMenu(false);
                setShowHelpMenu(false);
                setShowLogoMenu(false);
                setShowSafeModeMenu(false);
              }}
              className="text-white text-sm font-medium hover:text-gray-200 transition-colors duration-200 tracking-wide font-sans antialiased"
            >
              File
            </button>
            {showFileMenu && (
              <div className="absolute top-full left-0 mt-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-lg min-w-48 z-40">
                <div className="py-1">
                  <button
                    onClick={() => {
                      handleAppLaunch("Files");
                      setShowFileMenu(false);
                    }}
                    className="w-full text-left px-3 py-1 text-white text-sm hover:bg-white/10 tracking-wide font-sans antialiased"
                  >
                    File Browser
                  </button>
                  <button
                    onClick={() => {
                      handleAppLaunch("Terminal");
                      setShowFileMenu(false);
                    }}
                    className="w-full text-left px-3 py-1 text-white text-sm hover:bg-white/10 tracking-wide font-sans antialiased"
                  >
                    Terminal Window
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Edit Menu - Hidden on mobile */}
          <div className="relative menu-container hidden md:block">
            <button
              onClick={() => {
                setShowEditMenu(!showEditMenu);
                setShowFileMenu(false);
                setShowViewMenu(false);
                setShowHelpMenu(false);
                setShowLogoMenu(false);
                setShowSafeModeMenu(false);
              }}
              className="text-white text-sm font-medium hover:text-gray-200 transition-colors duration-200 tracking-wide font-sans antialiased"
            >
              Edit
            </button>
            {showEditMenu && (
              <div className="absolute top-full left-0 mt-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-lg min-w-48 z-40">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsEditingApps(!isEditingApps);
                      setShowEditMenu(false);
                    }}
                    className="w-full text-left px-3 py-1 text-white text-sm hover:bg-white/10 tracking-wide font-sans antialiased"
                  >
                    Edit Agents
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* View Menu - Hidden on mobile */}
          <div className="relative menu-container hidden md:block">
            <button
              onClick={() => {
                setShowViewMenu(!showViewMenu);
                setShowFileMenu(false);
                setShowEditMenu(false);
                setShowHelpMenu(false);
                setShowLogoMenu(false);
                setShowSafeModeMenu(false);
              }}
              className="text-white text-sm font-medium hover:text-gray-200 transition-colors duration-200 tracking-wide font-sans antialiased"
            >
              View
            </button>
            {showViewMenu && (
              <div className="absolute top-full left-0 mt-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-lg min-w-48 z-40">
                <div className="py-1">
                  <button
                    onClick={handleToggleFullScreen}
                    className="w-full text-left px-3 py-1 text-white text-sm hover:bg-white/10 tracking-wide flex items-center justify-between font-sans antialiased"
                  >
                    <span>{isFullScreen ? 'Exit Full Screen' : 'Toggle Full Screen'}</span>
                    <span className="text-gray-300 text-xs">(fn+F)</span>
                  </button>
                  <div className="border-t border-white/20 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setShowThemeSelector(true);
                        setShowViewMenu(false);
                      }}
                      className="w-full text-left px-3 py-1 text-white text-sm hover:bg-white/10 tracking-wide font-sans antialiased"
                    >
                      Select Theme
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

















          {/* Help Menu - Hidden on mobile */}
          <div className="relative menu-container hidden md:block">
            <button
              onClick={() => {
                setShowHelpMenu(!showHelpMenu);
                setShowFileMenu(false);
                setShowEditMenu(false);
                setShowViewMenu(false);
                setShowSafeModeMenu(false);
              }}
              className="text-white text-sm font-medium hover:text-gray-200 transition-colors duration-200 tracking-wide font-sans antialiased"
            >
              Help
            </button>
            {showHelpMenu && (
              <div className="absolute top-full left-0 mt-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-lg min-w-48 z-40">
                <div className="py-1">
                  {[
                    { name: "Email", url: "mailto:collin@dabl.club", icon: "📧" },
                    { name: "Discord", url: "https://discord.gg/CvxBdTCGha", icon: "🎮" },
                    { name: "Telegram", url: "https://t.me/colodoteth", icon: "✈️" },
                    { name: "Signal", url: "https://signal.me/#eu/wYSTbmUFlhH7wxhG8tM7dngW4sAq1dskBkajYDHKCnpWYnbDMdhITL04th99Lstk", icon: "🔒" }
                  ].map((help) => (
                    <button
                      key={help.name}
                      onClick={() => {
                        if (help.url.startsWith('mailto:')) {
                          // Try window.open first, fallback to window.location
                          try {
                            window.open(help.url, '_blank');
                          } catch (e) {
                            window.location.href = help.url;
                          }
                        } else if (help.url.startsWith('tel:')) {
                          window.location.href = help.url;
                        } else {
                          window.open(help.url, '_blank');
                        }
                        setShowHelpMenu(false);
                      }}
                      className="w-full text-left px-3 py-1 text-white text-sm hover:bg-white/10 tracking-wide flex items-center space-x-2 font-sans antialiased"
                    >
                      <span>{help.icon}</span>
                      <span>{help.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center - Signup Button */}
        <div className="flex items-center">
          <button
            onClick={() => setShowSignupModal(true)}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-colors duration-200 font-sans antialiased ${
              viewMode === 'cypherpunk'
                ? 'bg-cyan-600/30 border border-cyan-400/50 text-cyan-100 hover:bg-cyan-600/40 hover:border-cyan-400/70'
                : viewMode === 'dark'
                ? 'bg-gray-700/70 border border-gray-500/50 text-gray-100 hover:bg-gray-600/70 hover:border-gray-400/70'
                : 'bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:border-white/50'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Far Right - Clock */}
        <div className="flex items-center">
          {/* Clock */}
          <div className={`text-sm font-bold font-mono ${
            viewMode === 'cypherpunk'
              ? 'text-cyan-100'
              : viewMode === 'dark'
              ? 'text-gray-100'
              : 'text-white'
          }`}>
            {currentTime.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        </div>

      </div>

      {/* Desktop Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-retro-beige-light border-t-2 border-retro-border flex items-center justify-between px-4 z-30 md:flex hidden">
        {/* Left side - Server info, running apps, and chat button */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="text-retro-light retro-mono text-xs">
            <span className="text-retro-mint">●</span> Server: {serverIP || 'Loading...'} | User: {userIP || 'Unknown'} | Version: 2.0.1 | Status: ONLINE
          </div>
          
          {/* Chat button - Moved to left side */}
          <div className="relative menu-container">
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center space-x-2 bg-retro-blue hover:bg-retro-mint transition-all duration-300 rounded-sm px-3 py-1 border-2 border-retro-border shadow-md hover:shadow-lg relative overflow-hidden cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-bold font-sans antialiased">Chat</span>
            </button>
          </div>
          
          {/* Running Apps */}
          {runningApps.length > 0 && (
            <div className="flex items-center space-x-2 ml-4">
              <span className="text-retro-light text-xs font-bold">Running:</span>
              {runningApps.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center space-x-1 bg-retro-blue/20 border border-retro-blue/40 rounded px-2 py-1 cursor-pointer hover:bg-retro-blue/30 transition-colors"
                  title={`${app.name} - Click to close`}
                  onClick={() => setRunningApps(prev => prev.filter(a => a.id !== app.id))}
                >
                  {app.icon ? (
                    <app.icon className="w-3 h-3 text-retro-light" />
                  ) : (
                    <div className="w-3 h-3 bg-retro-light rounded-sm"></div>
                  )}
                  <span className="text-retro-light text-xs font-medium">{app.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Clock */}
        <div className="flex items-center">
          <div className="text-retro-light retro-mono text-sm font-bold">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        </div>

      </div>

        {/* Desktop Version - Hidden on Mobile */}
        <div className="hidden md:block h-screen relative overflow-hidden">
          {/* Desktop Title and Controls */}
          {!isEditingApps && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
              {/* Desktop Title */}
              {viewMode === 'cypherpunk' ? (
                <>
                  <div className={`text-4xl font-bold mb-4 ${getTextClasses()} transition-all duration-500 pointer-events-none`} style={{
                    textShadow: '0 0 15px cyan, 0 0 30px cyan, 0 0 45px cyan',
                    fontFamily: 'monospace'
                  }}>
                    No Setup. Just Ship.
                  </div>
                  <div className={`text-xl mb-6 ${getTextClasses()} transition-all duration-500 pointer-events-none opacity-90`} style={{
                    textShadow: '0 0 10px cyan, 0 0 20px cyan',
                    fontFamily: 'monospace'
                  }}>
                    Meet your team of always-on AI agents ready to build modern microservices applications with a 99.99% uptime SLA.
                  </div>
                  
                  {/* Input Section */}
                  <div className="w-full max-w-6xl mx-auto pointer-events-auto px-8">
                    {/* Input Field */}
                    <div className="relative">
                      <textarea
                        value={ideaInput}
                        onChange={(e) => setIdeaInput(e.target.value)}
                        placeholder="What would you like to build?"
                        rows={3}
                        className="w-full bg-slate-800/80 border border-cyan-400/30 rounded-lg px-6 py-4 pb-12 text-cyan-100 placeholder-cyan-300/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none font-mono text-xl resize-none"
                      />
                      <button
                        onClick={() => {
                          if (ideaInput.trim()) {
                            toast({
                              title: "Request Submitted",
                              description: `Your idea: "${ideaInput}" has been submitted to the AI team.`,
                            });
                            setIdeaInput("");
                          }
                        }}
                        disabled={!ideaInput.trim()}
                        className="absolute right-3 bottom-3 p-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:opacity-50 rounded-md transition-colors"
                      >
                        <span className="text-2xl">🚀</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={`text-3xl font-bold mb-4 transition-all duration-500 pointer-events-none ${
                    viewMode === 'dark' ? 'text-gray-100' : 'text-retro-light'
                  }`}>
                    No Setup. Just Ship.
                  </div>
                  <div className={`text-lg mb-6 transition-all duration-500 pointer-events-none opacity-90 ${
                    viewMode === 'dark' ? 'text-gray-200' : 'text-retro-light'
                  }`}>
                    Meet your team of always-on AI agents ready to build modern microservices applications with a 99.99% uptime SLA.
                  </div>
                  
                  {/* Input Section */}
                  <div className="w-full max-w-6xl mx-auto pointer-events-auto px-8">
                    {/* Input Field */}
                    <div className="relative">
                      <textarea
                        value={ideaInput}
                        onChange={(e) => setIdeaInput(e.target.value)}
                        placeholder="What would you like to build?"
                        rows={3}
                        className={`w-full rounded-lg px-6 py-4 pb-12 focus:outline-none font-mono text-xl resize-none ${
                          viewMode === 'dark'
                            ? 'bg-gray-800/80 border border-gray-600/30 text-gray-100 placeholder-gray-400/50 focus:border-gray-500 focus:ring-1 focus:ring-gray-500'
                            : 'bg-white/80 border border-retro-border text-retro-light placeholder-retro-light/50 focus:border-retro-blue focus:ring-1 focus:ring-retro-blue'
                        }`}
                      />
                      <button
                        onClick={() => {
                          if (ideaInput.trim()) {
                            toast({
                              title: "Request Submitted",
                              description: `Your idea: "${ideaInput}" has been submitted to the AI team.`,
                            });
                            setIdeaInput("");
                          }
                        }}
                        disabled={!ideaInput.trim()}
                        className={`absolute right-3 bottom-3 p-2 rounded-md transition-colors ${
                          viewMode === 'dark'
                            ? 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50'
                            : 'bg-retro-blue hover:bg-retro-mint disabled:bg-gray-400 disabled:opacity-50'
                        }`}
                      >
                        <span className="text-2xl">🚀</span>
                      </button>
                    </div>
                  </div>
                </>
              )}


            </div>
          )}

          {/* Main Application Launcher Window */}
          {showAppLauncher && (
            <div className={getAppLauncherClasses()}>
            {/* Window Title Bar */}
            <div className="flex items-center justify-between mb-6 pb-3">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowAppLauncher(false)}
                  className="w-4 h-4 bg-retro-red rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                  title="Close"
                ></button>
                <button 
                  onClick={() => setShowAppLauncher(false)}
                  className="w-4 h-4 bg-retro-yellow rounded-full hover:bg-yellow-600 transition-colors cursor-pointer"
                  title="Minimize"
                ></button>
                <button 
                  onClick={toggleFullscreen}
                  className="w-4 h-4 bg-retro-mint rounded-full hover:bg-green-600 transition-colors cursor-pointer"
                  title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                ></button>
                <span className={`text-lg ml-4 ${getTextClasses()}`}>
                  {getAppLauncherTitle()} v1.0
                </span>
              </div>

            </div>





            {/* Application Grid */}
            <div className={`flex-1 ${isEditingApps ? 'overflow-y-auto py-4' : 'flex items-center justify-center'}`}>
              <div className={getGridClasses()}>
              {/* Claude Code App */}
              {(enabledApps['claude-code'] || isEditingApps) && (
                <div className="group relative">
                  {isEditingApps && (
                    <div className="absolute top-2 right-2 z-10">
                      <ToggleSwitch 
                        enabled={enabledApps['claude-code']} 
                        onToggle={() => handleAppToggle('claude-code')}
                      />
                    </div>
                  )}
                  <button
                    onClick={() =>
                      !isEditingApps && handleAppLaunch("CLAUDE")
                    }
                    className={`${getAppButtonClasses()} ${!enabledApps['claude-code'] && isEditingApps ? 'opacity-50' : ''}`}
                    disabled={loadingApp !== null || isEditingApps}
                  >
                    <div className="flex flex-col items-center">
                      <div className={getAppIconClasses('retro-red')}>
                        <ClaudeLogo className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-lg text-center font-bold font-sans ${getTextClasses()}`}>
                        CLAUDE CODE
                      </h3>
                      <p className={`retro-mono text-xs opacity-75 group-hover:opacity-100 transition-opacity text-center px-1 ${getTextClasses()}`}>
                        code faster with natural language
                      </p>
                    </div>
                  </button>
                </div>
              )}

              {/* Gemini CLI App */}
              {(enabledApps['gemini-cli'] || isEditingApps) && (
                <div className="group relative">
                  {isEditingApps && (
                    <div className="absolute top-2 right-2 z-10">
                      <ToggleSwitch 
                        enabled={enabledApps['gemini-cli']} 
                        onToggle={() => handleAppToggle('gemini-cli')}
                      />
                    </div>
                  )}
                  <button
                    onClick={() =>
                      !isEditingApps && handleAppLaunch("GEMINI")
                    }
                    className={`${getAppButtonClasses()} ${!enabledApps['gemini-cli'] && isEditingApps ? 'opacity-50' : ''}`}
                    disabled={loadingApp !== null || isEditingApps}
                  >
                    <div className="flex flex-col items-center">
                      <div className={getAppIconClasses('retro-yellow')}>
                        <SiGooglegemini className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-lg text-center font-bold font-sans ${getTextClasses()}`}>
                        GEMINI CLI
                      </h3>
                      <p className={`retro-mono text-xs opacity-75 group-hover:opacity-100 transition-opacity text-center px-1 ${getTextClasses()}`}>
                        connects tools and accelerates work
                      </p>
                    </div>
                  </button>
                </div>
              )}

              {/* Visual Studio App */}
              {(enabledApps['visual-studio'] || isEditingApps) && (
                <div className="group relative">
                  {isEditingApps && (
                    <div className="absolute top-2 right-2 z-10">
                      <ToggleSwitch 
                        enabled={enabledApps['visual-studio']} 
                        onToggle={() => handleAppToggle('visual-studio')}
                      />
                    </div>
                  )}
                  <button
                    onClick={() =>
                      !isEditingApps && handleAppLaunch("VSCODE")
                    }
                    className={`${getAppButtonClasses()} ${!enabledApps['visual-studio'] && isEditingApps ? 'opacity-50' : ''}`}
                    disabled={loadingApp !== null || isEditingApps}
                  >
                    <div className="flex flex-col items-center">
                      <div className={getAppIconClasses('retro-orange')}>
                        <VisualStudioLogo className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-lg text-center font-bold font-sans ${getTextClasses()}`}>
                        VISUAL STUDIO
                      </h3>
                      <p className={`retro-mono text-xs opacity-75 group-hover:opacity-100 transition-opacity text-center px-1 ${getTextClasses()}`}>
                        code editor with agents and extensions
                      </p>
                    </div>
                  </button>
                </div>
              )}

              {/* Open Code App */}
              {(enabledApps['open-code'] || isEditingApps) && (
                <div className="group relative">
                  {isEditingApps && (
                    <div className="absolute top-2 right-2 z-10">
                      <ToggleSwitch 
                        enabled={enabledApps['open-code']} 
                        onToggle={() => handleAppToggle('open-code')}
                      />
                    </div>
                  )}
                  <button
                    onClick={() =>
                      !isEditingApps && handleAppLaunch("OPENCODE")
                    }
                    className={`${getAppButtonClasses()} ${!enabledApps['open-code'] && isEditingApps ? 'opacity-50' : ''}`}
                    disabled={loadingApp !== null || isEditingApps}
                  >
                    <div className="flex flex-col items-center">
                      <div className={getAppIconClasses('retro-purple')}>
                        <StarLogo className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-lg text-center font-bold font-sans ${getTextClasses()}`}>
                        OPENCODE
                      </h3>
                      <p className={`retro-mono text-xs opacity-75 group-hover:opacity-100 transition-opacity text-center px-1 ${getTextClasses()}`}>
                        AI coding agent built for terminal
                      </p>
                    </div>
                  </button>
                </div>
              )}

              {/* Charm Crush App */}
              {(enabledApps['charm-crush'] || isEditingApps) && (
                <div className="group relative">
                  {isEditingApps && (
                    <div className="absolute top-2 right-2 z-10">
                      <ToggleSwitch 
                        enabled={enabledApps['charm-crush']} 
                        onToggle={() => handleAppToggle('charm-crush')}
                      />
                    </div>
                  )}
                  <button
                    onClick={() =>
                      !isEditingApps && handleAppLaunch("CHARM CRUSH")
                    }
                    className={`${getAppButtonClasses()} ${!enabledApps['charm-crush'] && isEditingApps ? 'opacity-50' : ''}`}
                    disabled={loadingApp !== null || isEditingApps}
                  >
                    <div className="flex flex-col items-center">
                      <div className={getAppIconClasses('retro-mint')}>
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                      <h3 className={`text-lg text-center font-bold font-sans ${getTextClasses()}`}>
                        CRUSH
                      </h3>
                      <p className={`retro-mono text-xs opacity-75 group-hover:opacity-100 transition-opacity text-center px-1 ${getTextClasses()}`}>
                        the most glamourous AI coding agent
                      </p>
                    </div>
                  </button>
                </div>
              )}

              {/* ChatGPT App */}
              {(enabledApps['chatgpt'] || isEditingApps) && (
                <div className="group relative">
                  {isEditingApps && (
                    <div className="absolute top-2 right-2 z-10">
                      <ToggleSwitch 
                        enabled={enabledApps['chatgpt']} 
                        onToggle={() => handleAppToggle('chatgpt')}
                      />
                    </div>
                  )}
                  <button
                    onClick={() =>
                      !isEditingApps && handleAppLaunch("ChatGPT")
                    }
                    className={`${getAppButtonClasses()} ${!enabledApps['chatgpt'] && isEditingApps ? 'opacity-50' : ''}`}
                    disabled={loadingApp !== null || isEditingApps}
                  >
                    <div className="flex flex-col items-center">
                      <div className={getAppIconClasses('retro-green')}>
                        <SiOpenai className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-lg text-center font-bold font-sans ${getTextClasses()}`}>
                        CHATGPT
                      </h3>
                      <p className={`retro-mono text-xs opacity-75 group-hover:opacity-100 transition-opacity text-center px-1 ${getTextClasses()}`}>
                        OpenAI's command line coding agent
                      </p>
                    </div>
                  </button>
                </div>
              )}

              {/* Cursor App */}
              {(enabledApps['add-agent'] || isEditingApps) && (
                <div className="group relative">
                  {isEditingApps && (
                    <div className="absolute top-2 right-2 z-10">
                      <ToggleSwitch 
                        enabled={enabledApps['add-agent']} 
                        onToggle={() => handleAppToggle('add-agent')}
                      />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (!isEditingApps) {
                        setShowComingSoonModal(true);
                      }
                    }}
                    className={`${getAppButtonClasses()} ${!enabledApps['add-agent'] && isEditingApps ? 'opacity-50' : ''}`}
                    disabled={loadingApp !== null || isEditingApps}
                  >
                    <div className="flex flex-col items-center">
                      <div className={getAppIconClasses('retro-blue')}>
                        <svg viewBox="0 0 100 100" className="w-6 h-6 text-white">
                          {/* Top triangle */}
                          <path d="M50 10 L15 35 L85 35 Z" fill="currentColor" fillOpacity="0.9"/>
                          {/* Left face */}
                          <path d="M15 35 L50 10 L50 50 L30 65 Z" fill="currentColor" fillOpacity="0.7"/>
                          {/* Right face */}
                          <path d="M85 35 L50 10 L50 50 L70 65 Z" fill="currentColor" fillOpacity="0.5"/>
                          {/* Bottom left */}
                          <path d="M15 35 L30 65 L50 50 Z" fill="currentColor" fillOpacity="0.6"/>
                          {/* Bottom right */}
                          <path d="M85 35 L70 65 L50 50 Z" fill="currentColor" fillOpacity="0.4"/>
                          {/* Bottom triangle */}
                          <path d="M30 65 L70 65 L50 90 Z" fill="currentColor" fillOpacity="0.3"/>
                          {/* Center diamond highlight */}
                          <path d="M50 50 L30 65 L50 75 L70 65 Z" fill="currentColor" fillOpacity="0.8"/>
                        </svg>
                      </div>
                      <h3 className={`text-lg text-center font-bold font-sans ${getTextClasses()}`}>
                        CURSOR
                      </h3>
                      <p className={`retro-mono text-xs opacity-75 group-hover:opacity-100 transition-opacity text-center px-1 ${getTextClasses()}`}>
                        the best way to code with AI
                      </p>
                    </div>
                  </button>
                </div>
              )}

              {/* Terminal App */}
              {(enabledApps['terminal'] || isEditingApps) && (
                <div className="group relative">
                  {isEditingApps && (
                    <div className="absolute top-2 right-2 z-10">
                      <ToggleSwitch 
                        enabled={enabledApps['terminal']} 
                        onToggle={() => handleAppToggle('terminal')}
                      />
                    </div>
                  )}
                  <button
                    onClick={() =>
                      !isEditingApps && handleAppLaunch("Terminal")
                    }
                    className={`${getAppButtonClasses()} ${!enabledApps['terminal'] && isEditingApps ? 'opacity-50' : ''}`}
                    disabled={loadingApp !== null || isEditingApps}
                  >
                    <div className="flex flex-col items-center">
                      <div className={getAppIconClasses('retro-dark')}>
                        <Terminal className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-lg text-center font-bold font-sans ${getTextClasses()}`}>
                        TERMINAL
                      </h3>
                      <p className={`retro-mono text-xs opacity-75 group-hover:opacity-100 transition-opacity text-center px-1 ${getTextClasses()}`}>
                        command line interface
                      </p>
                    </div>
                  </button>
                </div>
              )}

              {/* File Browser App */}
              {(enabledApps['file-browser'] || isEditingApps) && (
                <div className="group relative">
                  {isEditingApps && (
                    <div className="absolute top-2 right-2 z-10">
                      <ToggleSwitch 
                        enabled={enabledApps['file-browser']} 
                        onToggle={() => handleAppToggle('file-browser')}
                      />
                    </div>
                  )}
                  <button
                    onClick={() =>
                      !isEditingApps && handleAppLaunch("Files")
                    }
                    className={`${getAppButtonClasses()} ${!enabledApps['file-browser'] && isEditingApps ? 'opacity-50' : ''}`}
                    disabled={loadingApp !== null || isEditingApps}
                  >
                    <div className="flex flex-col items-center">
                      <div className={getAppIconClasses('retro-blue')}>
                        <Folder className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-lg text-center font-bold font-sans ${getTextClasses()}`}>
                        FILES
                      </h3>
                      <p className={`retro-mono text-xs opacity-75 group-hover:opacity-100 transition-opacity text-center px-1 ${getTextClasses()}`}>
                        browse system files
                      </p>
                    </div>
                  </button>
                </div>
              )}



              {/* Self-Destruct App */}
              {(enabledApps['self-destruct'] || isEditingApps) && (
                <div className="group relative">
                  {isEditingApps && (
                    <div className="absolute top-2 right-2 z-10">
                      <ToggleSwitch 
                        enabled={enabledApps['self-destruct']} 
                        onToggle={() => handleAppToggle('self-destruct')}
                      />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (!isEditingApps) {
                        handleMenuAction("Self-Destruct");
                      }
                    }}
                    className={`${getAppButtonClasses()} ${!enabledApps['self-destruct'] && isEditingApps ? 'opacity-50' : ''}`}
                    disabled={loadingApp !== null || isEditingApps}
                  >
                    <div className="flex flex-col items-center">
                      <div className={getAppIconClasses('retro-red')}>
                        <span className="text-xl">💥</span>
                      </div>
                      <h3 className={`text-lg text-center font-bold font-sans ${getTextClasses()}`}>
                        SELF-DESTRUCT
                      </h3>
                      <p className={`retro-mono text-xs opacity-75 group-hover:opacity-100 transition-opacity text-center px-1 ${getTextClasses()}`}>
                        permanently delete all data
                      </p>
                    </div>
                  </button>
                </div>
              )}
              </div>
            </div>

            {/* Save Button - shown when editing */}
            {isEditingApps && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSaveAppSettings}
                  className={`px-6 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-400'
                      : 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-400'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}

            {/* Status Bar */}
            <div className="pt-4">
              <div className={`flex items-center justify-between text-sm ${getTextClasses()}`}>
                <div className="flex items-center space-x-4">
                  <span className="animate-pulse">● ONLINE</span>
                  <span>6 APPLICATIONS AVAILABLE</span>
                </div>
                <div className="flex items-center space-x-2">
                  {viewMode === 'cypherpunk' && (
                    <span className="text-cyan-400 text-xs">CYPHERPUNK LTD ©1986-2025</span>
                  )}
                  {viewMode !== 'cypherpunk' && (
                    <span className="text-retro-light text-xs">SAFEMODE LTD ©1984-2025</span>
                  )}
                </div>
              </div>
            </div>

            {/* Loading Bar */}
            {loadingApp && (
              <div className="mt-4">
                <div className={`rounded-lg p-3 ${
                  viewMode === 'cypherpunk' 
                    ? 'bg-slate-800/80 backdrop-blur-sm' 
                    : viewMode === 'dark'
                    ? 'bg-gray-700/80 backdrop-blur-sm'
                    : 'bg-retro-darker'
                }`}>
                  <div className={`text-sm mb-2 ${getTextClasses()}`}>
                    LAUNCHING {loadingApp}...
                  </div>
                  <div className={`w-full rounded-full h-3 overflow-hidden ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-700'
                      : viewMode === 'dark'
                      ? 'bg-gray-600'
                      : 'bg-retro-window'
                  }`}>
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        viewMode === 'cypherpunk'
                          ? 'bg-cyan-400'
                          : viewMode === 'dark'
                          ? 'bg-gray-300'
                          : 'bg-retro-teal'
                      }`}
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          )}

          {/* Desktop Bottom Bar */}
          <div className={`hidden md:block fixed bottom-0 left-0 right-0 border-t-2 p-2 z-40 ${
            viewMode === 'cypherpunk' 
              ? 'bg-slate-900/90 border-cyan-400 backdrop-blur-md' 
              : viewMode === 'dark'
              ? 'bg-gray-800 border-gray-600'
              : 'bg-retro-beige-light border-retro-border'
          }`}>
            <div className="flex items-center justify-between">
              {/* Left side - Apps, Full Screen, and Running Windows */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowAppLauncher(!showAppLauncher)}
                  className={`px-4 py-2 rounded border flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-r from-cyan-600 via-cyan-700 to-teal-700 hover:from-cyan-700 hover:via-cyan-800 hover:to-teal-800 text-white border-cyan-500'
                      : viewMode === 'dark'
                      ? 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white border-gray-500'
                      : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white border-green-700'
                  }`}
                >
                  <Rocket className="w-4 h-4" />
                  <span className="font-mono text-sm font-bold">Apps</span>
                </button>
                
                {/* Full Screen Button */}
                <button
                  onClick={handleToggleFullScreen}
                  className={`px-4 py-2 rounded border flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl ${
                    isFullScreen 
                      ? // Exit Full Screen - normal colors
                        viewMode === 'cypherpunk'
                          ? 'bg-gradient-to-r from-cyan-600 via-cyan-700 to-teal-700 hover:from-cyan-700 hover:via-cyan-800 hover:to-teal-800 text-white border-cyan-500'
                          : viewMode === 'dark'
                          ? 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white border-gray-500'
                          : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white border-green-700'
                      : // Full Screen - cool special colors
                        viewMode === 'cypherpunk'
                          ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white border-purple-500'
                          : viewMode === 'dark'
                          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white border-indigo-500'
                          : 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white border-orange-500'
                  }`}
                  title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                >
                  {isFullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  <span className="font-mono text-sm font-bold">
                    {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                  </span>
                </button>


              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className={`px-4 py-2 rounded border flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700 text-white border-cyan-400'
                      : viewMode === 'dark'
                      ? 'bg-gradient-to-r from-gray-600 via-slate-600 to-gray-700 hover:from-gray-700 hover:via-slate-700 hover:to-gray-800 text-white border-gray-500'
                      : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white border-blue-700'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-sans text-sm font-bold antialiased">Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Windows - Removed since all apps now open in new tabs */}
        </div>

        {/* Mobile Version */}
        <div className={`md:hidden min-h-screen relative overflow-hidden ${
          viewMode === 'cypherpunk'
            ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900'
            : 'bg-gradient-to-br from-retro-bg to-retro-darker'
        }`}>
          {/* Mobile Animated Gradient Background */}
          <div className="absolute inset-0 opacity-30">
            <div className={`w-full h-full ${
              viewMode === 'cypherpunk' 
                ? 'bg-gradient-to-br from-pink-500/20 via-purple-500/20 via-blue-500/20 via-cyan-500/20 to-teal-500/20'
                : 'bg-gradient-to-br from-orange-400/20 via-pink-400/20 via-purple-400/20 to-blue-400/20'
            }`} style={{
              background: viewMode === 'cypherpunk'
                ? 'linear-gradient(45deg, rgba(236,72,153,0.2) 0%, rgba(147,51,234,0.2) 25%, rgba(59,130,246,0.2) 50%, rgba(6,182,212,0.2) 75%, rgba(20,184,166,0.2) 100%)'
                : 'linear-gradient(45deg, rgba(251,146,60,0.2) 0%, rgba(244,114,182,0.2) 25%, rgba(168,85,247,0.2) 50%, rgba(59,130,246,0.2) 75%, rgba(34,197,94,0.2) 100%)',
              backgroundSize: '400% 400%',
              animation: 'gradientShift 8s ease-in-out infinite'
            }}></div>
          </div>
          
          {/* Mobile Background Pattern */}
          <div className={`absolute inset-0 ${viewMode === 'cypherpunk' ? 'opacity-5' : 'opacity-3'}`}>
            <div className="w-full h-full" style={{
              backgroundImage: viewMode === 'cypherpunk' 
                ? `radial-gradient(circle at 2px 2px, rgba(0,255,255,0.2) 1px, transparent 0)`
                : `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          




          {/* Mobile Title and Description - Always visible on background */}
          {!isEditingApps && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none w-full px-2">
              <h1 className={`text-xl font-bold mb-2 tracking-wide font-sans antialiased transition-all duration-500 pointer-events-none w-full ${
                viewMode === 'cypherpunk' 
                  ? 'text-cyan-100 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] text-shadow-glow-cyan' 
                  : viewMode === 'dark'
                  ? 'text-gray-100 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                  : 'text-retro-light drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]'
              }`}>
                No Setup. Just Ship.
              </h1>
              <p className={`text-sm mb-4 tracking-wide font-sans antialiased transition-all duration-500 pointer-events-none opacity-90 w-full ${
                viewMode === 'cypherpunk' 
                  ? 'text-cyan-200 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]' 
                  : viewMode === 'dark'
                  ? 'text-gray-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                  : 'text-retro-light drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
              }`}>
                Meet your team of always-on AI agents ready to build modern microservices applications with a 99.99% uptime SLA.
              </p>
              
              {/* Mobile Input Section */}
              <div className="w-full pointer-events-auto">
                {/* Input Field */}
                <div className="relative">
                  <textarea
                    value={ideaInput}
                    onChange={(e) => setIdeaInput(e.target.value)}
                    placeholder="What would you like to build?"
                    rows={3}
                    className={`w-full rounded-lg px-3 py-2 pb-8 focus:outline-none font-mono text-base resize-none ${
                      viewMode === 'cypherpunk'
                        ? 'bg-slate-800/80 border border-cyan-400/30 text-cyan-100 placeholder-cyan-300/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                        : viewMode === 'dark'
                          ? 'bg-gray-800/80 border border-gray-600/30 text-gray-100 placeholder-gray-400/50 focus:border-gray-500 focus:ring-1 focus:ring-gray-500'
                          : 'bg-white/80 border border-retro-border text-retro-light placeholder-retro-light/50 focus:border-retro-blue focus:ring-1 focus:ring-retro-blue'
                    }`}
                  />
                  <button
                    onClick={() => {
                      if (ideaInput.trim()) {
                        toast({
                          title: "Request Submitted",
                          description: `Your idea: "${ideaInput}" has been submitted to the AI team.`,
                        });
                        setIdeaInput("");
                      }
                    }}
                    disabled={!ideaInput.trim()}
                    className={`absolute right-2 bottom-2 p-1 rounded-md transition-colors ${
                      viewMode === 'cypherpunk'
                        ? 'bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:opacity-50'
                        : viewMode === 'dark'
                          ? 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50'
                          : 'bg-retro-blue hover:bg-retro-mint disabled:bg-gray-400 disabled:opacity-50'
                    }`}
                  >
                    <span className="text-lg">🚀</span>
                  </button>
                </div>
              </div>


            </div>
          )}

          {/* Mobile App Launcher Modal */}
          {showMobileApps && !isEditingApps && (
            <div className={`md:hidden fixed top-0 left-0 right-0 z-40 flex flex-col ${
              viewMode === 'cypherpunk'
                ? 'bg-slate-900/95 backdrop-blur-md'
                : 'bg-retro-beige-light'
            }`} style={{ bottom: '65px' }}>
              {/* Mobile App Launcher Header */}
              <div className={`border-b-2 p-3 flex items-center justify-between ${
                viewMode === 'cypherpunk'
                  ? 'bg-slate-800/90 border-cyan-400'
                  : 'bg-retro-darker border-retro-teal'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    viewMode === 'cypherpunk' ? 'bg-red-500' : 'bg-retro-red'
                  }`}></div>
                  <div className={`w-3 h-3 rounded-full ${
                    viewMode === 'cypherpunk' ? 'bg-yellow-500' : 'bg-retro-yellow'
                  }`}></div>
                  <div className={`w-3 h-3 rounded-full ${
                    viewMode === 'cypherpunk' ? 'bg-cyan-400' : 'bg-retro-mint'
                  }`}></div>
                  <span className={`font-sans text-sm ml-2 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                  }`}>Agents</span>
                </div>
                <button
                  onClick={() => setShowMobileApps(false)}
                  className={`text-white border-2 rounded px-3 py-1 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 font-sans text-sm font-bold ${
                    viewMode === 'cypherpunk'
                      ? 'bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600'
                      : 'bg-retro-red hover:bg-retro-red/80 border-retro-red hover:border-retro-red/80'
                  }`}
                >
                  ✕
                </button>
              </div>

              {/* Mobile App Grid Content */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {/* Claude Code */}
                {enabledApps['claude-code'] && (
                <button
                  onClick={() => handleAppLaunch("CLAUDE")}
                  disabled={loadingApp !== null}
                  className={`w-full h-16 backdrop-blur-sm border rounded-lg px-2 py-3 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border-red-400/50 hover:border-red-300'
                      : 'bg-white/90 border-retro-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-br from-red-500 to-orange-600'
                      : 'bg-retro-red'
                  }`}>
                    <ClaudeLogo className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-bold font-sans text-lg antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>Claude</h3>
                    <p className={`text-sm antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                    }`}>code faster with natural language</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                  }`} />
                </button>
                )}

                {/* Gemini CLI */}
                {enabledApps['gemini-cli'] && (
                <button
                  onClick={() => handleAppLaunch("GEMINI")}
                  disabled={loadingApp !== null}
                  className={`w-full h-16 backdrop-blur-sm border rounded-lg px-2 py-3 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border-yellow-400/50 hover:border-yellow-300'
                      : 'bg-white/90 border-retro-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-br from-yellow-500 to-amber-600'
                      : 'bg-retro-yellow'
                  }`}>
                    <SiGooglegemini className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-bold font-sans text-lg antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>Gemini</h3>
                    <p className={`text-sm antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                    }`}>connects tools and accelerates work</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                  }`} />
                </button>
                )}

                {/* Visual Studio */}
                {enabledApps['visual-studio'] && (
                <button
                  onClick={() => handleAppLaunch("VSCODE")}
                  disabled={loadingApp !== null}
                  className={`w-full h-16 backdrop-blur-sm border rounded-lg px-2 py-3 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border-cyan-400/50 hover:border-cyan-300'
                      : 'bg-white/90 border-retro-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-br from-orange-500 to-red-600'
                      : 'bg-retro-orange'
                  }`}>
                    <VisualStudioLogo className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-bold font-sans text-lg antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>Visual Studio</h3>
                    <p className={`text-sm antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                    }`}>code editor with agents and extensions</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                  }`} />
                </button>
                )}

                {/* Open Code */}
                {enabledApps['open-code'] && (
                <button
                  onClick={() => handleAppLaunch("OPENCODE")}
                  disabled={loadingApp !== null}
                  className={`w-full h-16 backdrop-blur-sm border rounded-lg px-2 py-3 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border-purple-400/50 hover:border-purple-300'
                      : 'bg-white/90 border-retro-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                      : 'bg-retro-purple'
                  }`}>
                    <StarLogo className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-bold font-sans text-lg antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>Opencode</h3>
                    <p className={`text-sm antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                    }`}>AI coding agent built for terminal</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                  }`} />
                </button>
                )}

                {/* Charm Crush */}
                {enabledApps['charm-crush'] && (
                <button
                  onClick={() => handleAppLaunch("CHARM CRUSH")}
                  disabled={loadingApp !== null}
                  className={`w-full h-16 backdrop-blur-sm border rounded-lg px-2 py-3 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border-teal-400/50 hover:border-teal-300'
                      : 'bg-white/90 border-retro-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-br from-pink-500 to-rose-600'
                      : 'bg-retro-mint'
                  }`}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-bold font-sans text-lg antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>Crush</h3>
                    <p className={`text-sm antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                    }`}>the most glamourous AI coding agent</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                  }`} />
                </button>
                )}

                {/* ChatGPT */}
                {enabledApps['chatgpt'] && (
                <button
                  onClick={() => handleAppLaunch("ChatGPT")}
                  disabled={loadingApp !== null}
                  className={`w-full h-16 backdrop-blur-sm border rounded-lg px-2 py-3 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border-green-400/50 hover:border-green-300'
                      : 'bg-white/90 border-retro-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                      : 'bg-retro-green'
                  }`}>
                    <SiOpenai className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-bold font-sans text-lg antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>ChatGPT</h3>
                    <p className={`text-sm antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                    }`}>OpenAI's command line coding agent</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                  }`} />
                </button>
                )}

                {/* Cursor */}
                {enabledApps['add-agent'] && (
                <button
                  onClick={() => setShowComingSoonModal(true)}
                  disabled={loadingApp !== null}
                  className={`w-full h-16 backdrop-blur-sm border rounded-lg px-2 py-3 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border-blue-400/50 hover:border-blue-300'
                      : 'bg-white/90 border-retro-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                      : 'bg-retro-blue'
                  }`}>
                    <svg viewBox="0 0 100 100" className="w-5 h-5 text-white">
                      <path d="M50 10 L15 35 L85 35 Z" fill="currentColor" fillOpacity="0.9"/>
                      <path d="M15 35 L50 10 L50 50 L30 65 Z" fill="currentColor" fillOpacity="0.7"/>
                      <path d="M85 35 L50 10 L50 50 L70 65 Z" fill="currentColor" fillOpacity="0.5"/>
                      <path d="M15 35 L30 65 L50 50 Z" fill="currentColor" fillOpacity="0.6"/>
                      <path d="M85 35 L70 65 L50 50 Z" fill="currentColor" fillOpacity="0.4"/>
                      <path d="M30 65 L70 65 L50 90 Z" fill="currentColor" fillOpacity="0.3"/>
                      <path d="M50 50 L30 65 L50 75 L70 65 Z" fill="currentColor" fillOpacity="0.8"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-bold font-sans text-lg antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>Cursor</h3>
                    <p className={`text-sm antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                    }`}>the best way to code with AI</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                  }`} />
                </button>
                )}

                {/* Terminal */}
                {enabledApps['terminal'] && (
                <button
                  onClick={() => handleAppLaunch("Terminal")}
                  disabled={loadingApp !== null}
                  className={`w-full h-16 backdrop-blur-sm border rounded-lg px-2 py-3 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border-gray-400/50 hover:border-gray-300'
                      : 'bg-white/90 border-retro-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-br from-slate-600 to-gray-700'
                      : 'bg-retro-dark'
                  }`}>
                    <Terminal className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-bold font-sans text-lg antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>Terminal</h3>
                    <p className={`text-sm antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                    }`}>command line interface</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                  }`} />
                </button>
                )}

                {/* File Browser */}
                {enabledApps['file-browser'] && (
                <button
                  onClick={() => handleAppLaunch("Files")}
                  disabled={loadingApp !== null}
                  className={`w-full h-16 backdrop-blur-sm border rounded-lg px-2 py-3 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border-blue-400/50 hover:border-blue-300'
                      : 'bg-white/90 border-retro-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                      : 'bg-retro-blue'
                  }`}>
                    <Folder className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-bold font-sans text-lg antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>Files</h3>
                    <p className={`text-sm antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                    }`}>browse system files</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                  }`} />
                </button>
                )}



                {/* Self-Destruct */}
                {enabledApps['self-destruct'] && (
                <button
                  onClick={() => handleMenuAction("Self-Destruct")}
                  disabled={loadingApp !== null}
                  className={`w-full h-16 backdrop-blur-sm border rounded-lg px-2 py-3 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border-red-400/50 hover:border-red-300'
                      : 'bg-white/90 border-retro-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-br from-red-500 to-red-600'
                      : 'bg-retro-red'
                  }`}>
                    <span className="text-xl">💥</span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-bold font-sans text-lg antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>Self-Destruct</h3>
                    <p className={`text-sm antialiased ${
                      viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                    }`}>permanently delete all data</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                  }`} />
                </button>
                )}
              </div>
            </div>
          )}

          {/* App Editing Window - Full Screen Modal */}
          {isEditingApps && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className={`w-full h-full max-w-7xl max-h-full mx-4 my-4 rounded-lg shadow-2xl overflow-hidden ${
                viewMode === 'cypherpunk'
                  ? 'bg-slate-900 border-2 border-cyan-400'
                  : viewMode === 'dark'
                  ? 'bg-gray-800 border-2 border-gray-600'
                  : 'bg-retro-beige border-2 border-retro-border'
              }`}>
                {/* Window Title Bar */}
                <div className={`flex items-center justify-between px-4 py-3 border-b ${
                  viewMode === 'cypherpunk'
                    ? 'bg-slate-800 border-cyan-400'
                    : viewMode === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-retro-orange border-retro-border'
                }`}>
                  <div className="flex items-center space-x-3">
                    <Settings className={`w-5 h-5 ${
                      viewMode === 'cypherpunk' ? 'text-cyan-400' : 'text-retro-light'
                    }`} />
                    <h2 className={`text-lg font-bold font-sans ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>Edit Agents</h2>
                  </div>
                  <button
                    onClick={() => setIsEditingApps(false)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                      viewMode === 'cypherpunk'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Window Content */}
                <div className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-180px)]">
                  <div className="max-w-6xl mx-auto">
                    {/* Apps Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { id: 'claude-code', name: 'Claude Code', description: 'code faster with natural language', icon: ClaudeLogo, colors: 'from-red-500 to-orange-600', borderColors: 'border-red-400/50 hover:border-red-300' },
                        { id: 'gemini-cli', name: 'Gemini CLI', description: 'connects tools and accelerates work', icon: SiGooglegemini, colors: 'from-yellow-500 to-amber-600', borderColors: 'border-yellow-400/50 hover:border-yellow-300' },
                        { id: 'visual-studio', name: 'Visual Studio', description: 'code editor with agents and extensions', icon: VisualStudioLogo, colors: 'from-orange-500 to-red-600', borderColors: 'border-cyan-400/50 hover:border-cyan-300' },
                        { id: 'open-code', name: 'Opencode', description: 'AI coding agent built for terminal', icon: StarLogo, colors: 'from-purple-500 to-indigo-600', borderColors: 'border-purple-400/50 hover:border-purple-300' },
                        { id: 'charm-crush', name: 'Crush', description: 'the most glamourous AI coding agent', icon: null, colors: 'from-pink-500 to-rose-600', borderColors: 'border-teal-400/50 hover:border-teal-300' },
                        { id: 'chatgpt', name: 'ChatGPT', description: 'OpenAI\'s command line coding agent', icon: SiOpenai, colors: 'from-green-500 to-emerald-600', borderColors: 'border-green-400/50 hover:border-green-300' },
                        { id: 'add-agent', name: 'Cursor', description: 'the best way to code with AI', icon: null, colors: 'from-blue-500 to-indigo-600', borderColors: 'border-blue-400/50 hover:border-blue-300' },
                        { id: 'terminal', name: 'Terminal', description: 'command line interface', icon: Terminal, colors: 'from-slate-600 to-gray-700', borderColors: 'border-gray-400/50 hover:border-gray-300' },
                        { id: 'file-browser', name: 'Files', description: 'browse system files', icon: Folder, colors: 'from-blue-500 to-blue-600', borderColors: 'border-blue-400/50 hover:border-blue-300' },
                        { id: 'self-destruct', name: 'Self-Destruct', description: 'permanently delete all data', icon: null, colors: 'from-red-500 to-red-600', borderColors: 'border-red-400/50 hover:border-red-300' }
                      ].map((app) => (
                        <div key={app.id} className="relative">
                          {/* Toggle Switch */}
                          <div className="absolute top-3 right-3 z-10">
                            <ToggleSwitch 
                              enabled={enabledApps[app.id]} 
                              onToggle={() => handleAppToggle(app.id)}
                            />
                          </div>
                          
                          {/* App Card */}
                          <div className={`w-full h-32 backdrop-blur-sm border rounded-lg shadow-lg transition-all duration-300 p-4 flex flex-col ${
                            viewMode === 'cypherpunk'
                              ? `bg-slate-800/90 ${app.borderColors}`
                              : 'bg-white/90 border-retro-border'
                          } ${!enabledApps[app.id] ? 'opacity-50' : ''}`}>
                            {/* App Icon */}
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                              viewMode === 'cypherpunk'
                                ? `bg-gradient-to-br ${app.colors}`
                                : 'bg-retro-blue'
                            }`}>
                              {app.icon ? (
                                <app.icon className="w-5 h-5 text-white" />
                              ) : app.id === 'charm-crush' ? (
                                <span className="text-lg">💎</span>
                              ) : app.id === 'add-agent' ? (
                                <span className="text-lg">🎯</span>
                              ) : app.id === 'self-destruct' ? (
                                <span className="text-lg">💥</span>
                              ) : (
                                <svg viewBox="0 0 100 100" className="w-5 h-5 text-white">
                                  <path d="M50 10 L15 35 L85 35 Z" fill="currentColor" fillOpacity="0.9"/>
                                  <path d="M15 35 L50 10 L50 50 L30 65 Z" fill="currentColor" fillOpacity="0.7"/>
                                  <path d="M85 35 L50 10 L50 50 L70 65 Z" fill="currentColor" fillOpacity="0.5"/>
                                  <path d="M15 35 L30 65 L50 50 Z" fill="currentColor" fillOpacity="0.6"/>
                                  <path d="M85 35 L70 65 L50 50 Z" fill="currentColor" fillOpacity="0.4"/>
                                  <path d="M30 65 L70 65 L50 90 Z" fill="currentColor" fillOpacity="0.3"/>
                                  <path d="M50 50 L30 65 L50 75 L70 65 Z" fill="currentColor" fillOpacity="0.8"/>
                                </svg>
                              )}
                            </div>
                            
                            {/* App Info */}
                            <div className="flex-1">
                              <h3 className={`font-bold font-sans text-sm mb-1 ${
                                viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                              }`}>{app.name}</h3>
                              <p className={`text-xs leading-tight ${
                                viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                              }`}>{app.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Window Footer */}
                <div className={`flex items-center justify-between px-6 py-4 border-t ${
                  viewMode === 'cypherpunk'
                    ? 'bg-slate-800 border-cyan-400'
                    : viewMode === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-retro-orange border-retro-border'
                }`}>
                  <p className={`text-sm ${
                    viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                  }`}>
                    Toggle agents on/off to customize your workspace
                  </p>
                  <button
                    data-testid="button-save-changes"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Save Changes clicked');
                      handleSaveAppSettings();
                    }}
                    className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg ${
                      viewMode === 'cypherpunk'
                        ? 'bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-400'
                        : 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-400'
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    <span className="font-bold">Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Bottom Bar */}
          <div className={`fixed bottom-0 left-0 right-0 border-t-2 p-3 md:hidden z-50 ${
            viewMode === 'cypherpunk' 
              ? 'bg-slate-900/90 border-cyan-400 backdrop-blur-md' 
              : viewMode === 'dark'
              ? 'bg-gray-800 border-gray-600'
              : 'bg-retro-beige-light border-retro-border'
          }`}>
            <div className="flex items-center justify-between space-x-3">
              <button
                onClick={() => {
                  setShowSafeModeWindow(!showSafeModeWindow);
                  setIsChatOpen(false);
                }}
                className={`px-4 py-2 rounded border flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl flex-1 ${
                  viewMode === 'cypherpunk'
                    ? 'bg-gradient-to-r from-cyan-600 via-cyan-700 to-teal-700 hover:from-cyan-700 hover:via-cyan-800 hover:to-teal-800 text-white border-cyan-500'
                    : viewMode === 'dark'
                    ? 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white border-gray-500'
                    : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white border-green-700'
                }`}
              >
                <Settings className={`w-4 h-4 ${
                  viewMode === 'cypherpunk' 
                    ? 'text-cyan-100' 
                    : viewMode === 'dark'
                    ? 'text-white'
                    : 'text-white'
                }`} />
                <span className="font-sans text-base font-bold antialiased">Tools</span>
              </button>
              
              <button
                onClick={() => {
                  // If other windows are open, just close them and show apps
                  if (showSafeModeWindow || isChatOpen) {
                    setShowSafeModeWindow(false);
                    setIsChatOpen(false);
                    setShowMobileApps(true);
                  } else {
                    // Otherwise toggle apps normally
                    setShowMobileApps(!showMobileApps);
                  }
                }}
                className={`px-4 py-2 rounded border flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl flex-1 ${
                  viewMode === 'cypherpunk'
                    ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700 text-white border-teal-400 shadow-teal-500/25'
                    : viewMode === 'dark'
                    ? 'bg-gradient-to-r from-gray-600 via-slate-600 to-gray-700 hover:from-gray-700 hover:via-slate-700 hover:to-gray-800 text-white border-gray-500'
                    : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white border-green-700'
                }`}
              >
                <Rocket className="w-4 h-4" />
                <span className="font-sans text-base font-bold antialiased">Agents</span>
              </button>
              
              <button
                onClick={() => {
                  setIsChatOpen(!isChatOpen);
                  setShowSafeModeWindow(false);
                }}
                className={`px-4 py-2 rounded border flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl flex-1 ${
                  viewMode === 'cypherpunk'
                    ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white border-blue-400 shadow-blue-500/25'
                    : viewMode === 'dark'
                    ? 'bg-gradient-to-r from-gray-600 via-slate-600 to-gray-700 hover:from-gray-700 hover:via-slate-700 hover:to-gray-800 text-white border-gray-500'
                    : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white border-blue-700'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-sans text-base font-bold antialiased">Chat</span>
              </button>
            </div>
          </div>

          {/* Mobile Loading State */}
          {loadingApp && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className={`border-2 rounded-lg p-6 max-w-xs mx-4 ${
                viewMode === 'cypherpunk'
                  ? 'bg-slate-800/90 border-cyan-400 backdrop-blur-md'
                  : 'bg-retro-beige-light border-retro-border'
              }`}>
                <div className="text-center">
                  <div className={`text-sm mb-2 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                  }`}>
                    LAUNCHING {loadingApp}...
                  </div>
                  <div className={`w-full rounded-full h-3 overflow-hidden ${
                    viewMode === 'cypherpunk' ? 'bg-slate-700' : 'bg-retro-window'
                  }`}>
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        viewMode === 'cypherpunk' ? 'bg-gradient-to-r from-cyan-500 to-teal-500' : 'bg-retro-teal'
                      }`}
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}


        </div>

        {/* SafeMode Window - Desktop */}
        {showSafeModeWindow && (
          <div className="hidden md:block fixed top-20 left-8 z-50 w-96">
            <div className={`rounded-lg max-h-[80vh] overflow-hidden shadow-2xl ${
              viewMode === 'cypherpunk'
                ? 'bg-slate-900/95 backdrop-blur-md border border-cyan-400'
                : 'retro-window window-frame'
            }`}>
              {/* Window Header */}
              <div className={`border-b-2 p-3 flex items-center justify-between ${
                viewMode === 'cypherpunk'
                  ? 'bg-slate-800/90 border-cyan-400'
                  : 'bg-retro-darker border-retro-teal'
              }`}>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setShowSafeModeWindow(false)}
                    className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                      viewMode === 'cypherpunk'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-retro-red hover:bg-red-600'
                    }`}
                    title="Close"
                  ></button>
                  <button 
                    onClick={() => setShowSafeModeWindow(false)}
                    className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                      viewMode === 'cypherpunk'
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-retro-yellow hover:bg-yellow-600'
                    }`}
                    title="Minimize"
                  ></button>
                  <div className={`w-3 h-3 rounded-full ${
                    viewMode === 'cypherpunk' ? 'bg-cyan-400' : 'bg-retro-mint'
                  }`}></div>
                  <span className={`font-sans text-sm ml-2 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                  }`}>Tools</span>
                </div>
                <button
                  onClick={() => setShowSafeModeWindow(false)}
                  className={`transition-colors ${
                    viewMode === 'cypherpunk'
                      ? 'text-cyan-100 hover:text-red-400'
                      : 'text-retro-light hover:text-retro-red'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Window Content */}
              <div className={`p-4 max-h-[60vh] overflow-y-auto space-y-3 ${
                viewMode === 'cypherpunk'
                  ? 'bg-slate-900/95'
                  : 'bg-retro-beige-light'
              }`}>
                {[
                  { name: "Select Theme", action: "select-theme", icon: "🎨", description: "Choose interface theme" },
                  { name: "Edit Agents", action: "toggle-apps", icon: "⚙️", description: "Enable or disable agents" },
                  { name: "Terminal", action: "terminal", icon: "💻", description: "Open terminal window", url: "http://provider.akash-palmito.org:30730/" },
                  { name: "File Browser", action: "file-browser", icon: "📁", description: "Browse system files", url: "http://provider.akash-palmito.org:32607/files/" },
                  { name: "Self-Destruct", action: "delete-data", icon: "💥", description: "Permanently delete all user data" }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (item.action === "select-theme") {
                        setShowThemeSelector(true);
                        setShowSafeModeWindow(false);
                      } else if (item.action === "toggle-apps") {
                        setIsEditingApps(true);
                        setShowSafeModeWindow(false);
                      } else if (item.url) {
                        window.open(item.url, "_blank");
                      } else {
                        handleMenuAction(item.name);
                      }
                    }}
                    className={`w-full backdrop-blur-sm border rounded-lg p-4 flex items-center space-x-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                      viewMode === 'cypherpunk'
                        ? 'bg-slate-800/90 border-cyan-400/50 hover:border-cyan-300'
                        : 'bg-white/90 border-retro-border'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      viewMode === 'cypherpunk'
                        ? 'bg-gradient-to-br from-cyan-500 to-teal-600'
                        : 'bg-retro-teal'
                    }`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className={`font-bold font-sans text-lg ${
                        viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                      }`}>{item.name}</h3>
                      <p className={`text-sm ${
                        viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                      }`}>{item.description}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${
                      viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SafeMode Window - Mobile */}
        {showSafeModeWindow && (
          <div className={`md:hidden fixed top-0 left-0 right-0 z-40 flex flex-col ${
            viewMode === 'cypherpunk'
              ? 'bg-slate-900/95 backdrop-blur-md'
              : 'bg-retro-beige-light'
          }`} style={{ bottom: '65px' }}>
            {/* Mobile Header */}
            <div className={`border-b-2 p-3 flex items-center justify-between ${
              viewMode === 'cypherpunk'
                ? 'bg-slate-800/90 border-cyan-400'
                : 'bg-retro-darker border-retro-teal'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  viewMode === 'cypherpunk' ? 'bg-red-500' : 'bg-retro-red'
                }`}></div>
                <div className={`w-3 h-3 rounded-full ${
                  viewMode === 'cypherpunk' ? 'bg-yellow-500' : 'bg-retro-yellow'
                }`}></div>
                <div className={`w-3 h-3 rounded-full ${
                  viewMode === 'cypherpunk' ? 'bg-cyan-400' : 'bg-retro-mint'
                }`}></div>
                <span className={`font-sans text-sm ml-2 ${
                  viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                }`}>SafeMode Tools</span>
              </div>
              <button
                onClick={() => setShowSafeModeWindow(false)}
                className={`text-white border-2 rounded px-3 py-1 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 font-sans text-sm font-bold ${
                  viewMode === 'cypherpunk'
                    ? 'bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600'
                    : 'bg-retro-red hover:bg-retro-red/80 border-retro-red hover:border-retro-red/80'
                }`}
              >
                ✕
              </button>
            </div>

            {/* Mobile Content */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {[
                { name: "Select Theme", action: "select-theme", icon: "🎨", description: "Choose interface theme" },
                { name: "Edit Agents", action: "toggle-apps", icon: "⚙️", description: "Enable or disable agents" },
                { name: "Terminal", action: "terminal", icon: "💻", description: "Open terminal window", url: "http://provider.akash-palmito.org:30730/" },
                { name: "File Browser", action: "file-browser", icon: "📁", description: "Browse system files", url: "http://provider.akash-palmito.org:32607/files/" },
                { name: "Self-Destruct", action: "delete-data", icon: "💥", description: "Permanently delete all user data" }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.action === "select-theme") {
                      setShowThemeSelector(true);
                      setShowSafeModeWindow(false);
                    } else if (item.action === "toggle-apps") {
                      setIsEditingApps(true);
                      setShowSafeModeWindow(false);
                    } else if (item.url) {
                      window.open(item.url, "_blank");
                    } else {
                      handleMenuAction(item.name);
                    }
                  }}
                  className={`w-full backdrop-blur-sm border rounded-lg p-3 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border-cyan-400/50 hover:border-cyan-300'
                      : 'bg-white/90 border-retro-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-gradient-to-br from-cyan-500 to-teal-600'
                      : 'bg-retro-teal'
                  }`}>
                    {typeof item.icon === 'string' ? (
                      <span className="text-lg">{item.icon}</span>
                    ) : (
                      item.icon
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-bold font-sans text-base ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>{item.name}</h3>
                    <p className={`text-xs ${
                      viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-retro-light/70'
                    }`}>{item.description}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    viewMode === 'cypherpunk' ? 'text-cyan-400/70' : 'text-retro-light/50'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Chat Window */}
        {isChatOpen && (
          <div className={`md:hidden fixed top-0 left-0 right-0 bottom-0 z-40 flex flex-col ${
            viewMode === 'cypherpunk'
              ? 'bg-slate-900/95 backdrop-blur-md'
              : 'bg-retro-beige-light'
          }`} style={{ paddingBottom: '73px' }}>
            {/* Mobile Chat Header */}
            <div className={`border-b-2 p-3 flex items-center justify-between ${
              viewMode === 'cypherpunk'
                ? 'bg-slate-800/90 border-cyan-400'
                : 'bg-retro-darker border-retro-teal'
            }`}>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                    viewMode === 'cypherpunk'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-retro-red hover:bg-red-600'
                  }`}
                  title="Close"
                ></button>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                    viewMode === 'cypherpunk'
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-retro-yellow hover:bg-yellow-600'
                  }`}
                  title="Minimize"
                ></button>
                <div className={`w-3 h-3 rounded-full ${
                  viewMode === 'cypherpunk' ? 'bg-cyan-400' : 'bg-retro-mint'
                }`}></div>
                <span className={`font-sans text-sm ml-2 antialiased ${
                  viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                }`}>Chat</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className={`transition-colors ${
                  viewMode === 'cypherpunk'
                    ? 'text-cyan-100 hover:text-red-400'
                    : 'text-retro-light hover:text-retro-red'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Chat Messages */}
            <div className={`flex-1 p-4 overflow-y-auto space-y-3 ${
              viewMode === 'cypherpunk'
                ? 'bg-slate-900/95'
                : 'bg-retro-beige-light'
            }`}>
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex items-start space-x-3 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm text-white flex-shrink-0 overflow-hidden ${
                    msg.type === 'user' 
                      ? viewMode === 'cypherpunk' ? 'bg-cyan-600' : 'bg-retro-blue'
                      : viewMode === 'cypherpunk' ? 'bg-teal-600' : 'bg-retro-mint'
                  }`}>
                    {msg.type === 'user' ? 'U' : (
                      <img 
                        src="/attached_assets/colin_1754259329607.jpg" 
                        alt="Colin" 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 max-w-xs ${
                    msg.type === 'user' 
                      ? viewMode === 'cypherpunk' 
                        ? 'bg-cyan-600 text-white' 
                        : 'bg-retro-blue text-white'
                      : viewMode === 'cypherpunk'
                        ? 'bg-slate-800/90 text-cyan-100 border border-cyan-400/50'
                        : 'bg-white text-retro-light border border-retro-border'
                  }`}>
                    <p className="retro-mono text-sm whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <div className="text-xs opacity-75 mt-2">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                    viewMode === 'cypherpunk' ? 'bg-teal-600' : 'bg-retro-mint'
                  }`}>
                    <img 
                      src="/attached_assets/colin_1754259329607.jpg" 
                      alt="Colin" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`rounded-lg p-3 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border border-cyan-400/50'
                      : 'bg-white border border-retro-border'
                  }`}>
                    <p className={`retro-mono text-sm ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>
                      <span className="animate-pulse">● ● ●</span> typing...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Chat Input */}
            <div className={`border-t p-4 flex-shrink-0 ${
              viewMode === 'cypherpunk'
                ? 'bg-slate-800/90 border-cyan-400'
                : 'bg-retro-darker border-retro-teal'
            }`}>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleChatKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 border rounded px-3 py-2 retro-mono text-sm focus:outline-none ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-700 border-cyan-400/50 text-cyan-100 placeholder-cyan-300/50 focus:border-cyan-300'
                      : 'bg-white border-retro-border text-retro-light focus:border-retro-blue'
                  }`}
                  autoFocus
                />
                <button 
                  onClick={sendChatMessage}
                  className={`px-4 py-2 rounded text-sm font-bold transition-colors border ${
                    viewMode === 'cypherpunk'
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-400'
                      : 'bg-retro-blue hover:bg-retro-mint text-white border-retro-border'
                  }`}
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Chat Window */}
        {isChatOpen && (
          <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 w-80 h-[32rem] border-2 rounded-lg z-50 flex-col hidden md:flex ${
            viewMode === 'cypherpunk'
              ? 'bg-slate-900/95 border-cyan-400 backdrop-blur-md'
              : 'bg-retro-beige-light border-retro-teal'
          }`}>
            {/* Chat Header - ICQ Style */}
            <div className={`border-b-2 p-2 flex items-center justify-between rounded-t-lg ${
              viewMode === 'cypherpunk'
                ? 'bg-slate-800/90 border-cyan-400'
                : 'bg-retro-darker border-retro-teal'
            }`}>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="w-3 h-3 bg-retro-red rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                  title="Close"
                ></button>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="w-3 h-3 bg-retro-yellow rounded-full hover:bg-yellow-600 transition-colors cursor-pointer"
                  title="Minimize"
                ></button>
                <button 
                  onClick={toggleFullscreen}
                  className="w-3 h-3 bg-retro-mint rounded-full hover:bg-green-600 transition-colors cursor-pointer"
                  title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                ></button>
                <span className={`retro-mono text-xs ml-2 ${
                  viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                }`}>Support Chat</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className={`transition-colors ${
                  viewMode === 'cypherpunk' 
                    ? 'text-cyan-100 hover:text-cyan-400' 
                    : 'text-retro-light hover:text-retro-red'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className={`flex-1 p-3 overflow-y-auto space-y-2 ${
              viewMode === 'cypherpunk' ? 'bg-slate-900/95' : 'bg-retro-beige-light'
            }`} id="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex items-start space-x-2 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0 overflow-hidden ${
                    msg.type === 'user' 
                      ? viewMode === 'cypherpunk' ? 'bg-cyan-600' : 'bg-retro-blue'
                      : viewMode === 'cypherpunk' ? 'bg-teal-600' : 'bg-retro-mint'
                  }`}>
                    {msg.type === 'user' ? 'U' : (
                      <img 
                        src="/attached_assets/colin_1754259329607.jpg" 
                        alt="Colin" 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className={`rounded-lg p-2 max-w-xs ${
                    msg.type === 'user' 
                      ? viewMode === 'cypherpunk' 
                        ? 'bg-cyan-600 text-white' 
                        : 'bg-retro-blue text-white'
                      : viewMode === 'cypherpunk'
                        ? 'bg-slate-800/90 text-cyan-100 border border-cyan-400/50'
                        : 'bg-white text-retro-light border border-retro-border'
                  }`}>
                    <p className="retro-mono text-xs whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <div className="text-xs opacity-75 mt-1">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                    viewMode === 'cypherpunk' ? 'bg-teal-600' : 'bg-retro-mint'
                  }`}>
                    <img 
                      src="/attached_assets/colin_1754259329607.jpg" 
                      alt="Colin" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`rounded-lg p-2 ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-800/90 border border-cyan-400/50'
                      : 'bg-white border border-retro-border'
                  }`}>
                    <p className={`retro-mono text-xs ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-retro-light'
                    }`}>
                      <span className="animate-pulse">● ● ●</span> typing...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Bar - ICQ Style */}
            <div className={`border-t p-2 flex-shrink-0 rounded-b-lg ${
              viewMode === 'cypherpunk'
                ? 'bg-slate-800/90 border-cyan-400'
                : 'bg-retro-darker border-retro-teal'
            }`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleChatKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 border rounded px-2 py-1 retro-mono text-xs focus:outline-none ${
                    viewMode === 'cypherpunk'
                      ? 'bg-slate-700 border-cyan-400/50 text-cyan-100 placeholder-cyan-300/50 focus:border-cyan-300'
                      : 'bg-white border-retro-border text-retro-light focus:border-retro-blue'
                  }`}
                  autoFocus
                />
                <button 
                  onClick={sendChatMessage}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors border ${
                    viewMode === 'cypherpunk'
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-400'
                      : 'bg-retro-blue hover:bg-retro-mint text-white border-retro-border'
                  }`}
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Theme Selector Modal */}
        {showThemeSelector && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-lg p-6 ${
              viewMode === 'cypherpunk'
                ? 'bg-slate-900 border border-cyan-400'
                : 'bg-white border border-gray-300'
            }`}>
              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-gray-900'
                }`}>
                  Select Theme
                </h3>
                <p className={`text-sm ${
                  viewMode === 'cypherpunk' ? 'text-cyan-200' : 'text-gray-600'
                }`}>
                  Choose your preferred interface theme
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'cypherpunk', name: 'Cypherpunk Mode', icon: '⚡', description: 'Dark cyberpunk theme with cyan accents' },
                  { key: 'dark', name: 'Dark Mode', icon: '🌙', description: 'Clean dark interface with modern styling' },
                  { key: 'retro', name: 'Retro Mode', icon: '🍎', description: 'Classic beige theme with retro aesthetics' }
                ].map((theme) => (
                  <button
                    key={theme.key}
                    onClick={() => {
                      setViewMode(theme.key as 'dark' | 'retro' | 'cypherpunk');
                      setShowThemeSelector(false);
                    }}
                    className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                      viewMode === theme.key
                        ? viewMode === 'cypherpunk'
                          ? 'bg-cyan-600/20 border-cyan-400 ring-2 ring-cyan-400/50'
                          : 'bg-blue-50 border-blue-400 ring-2 ring-blue-400/50'
                        : viewMode === 'cypherpunk'
                          ? 'bg-slate-800/50 border-slate-600 hover:border-cyan-400/50'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{theme.icon}</span>
                      <div>
                        <div className={`font-semibold ${
                          viewMode === 'cypherpunk' ? 'text-cyan-100' : 'text-gray-900'
                        }`}>
                          {theme.name}
                        </div>
                        <div className={`text-sm ${
                          viewMode === 'cypherpunk' ? 'text-cyan-200/70' : 'text-gray-600'
                        }`}>
                          {theme.description}
                        </div>
                      </div>
                      {viewMode === theme.key && (
                        <div className="ml-auto">
                          <div className={`w-4 h-4 rounded-full ${
                            viewMode === 'cypherpunk' ? 'bg-cyan-400' : 'bg-blue-600'
                          }`}></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowThemeSelector(false)}
                  className={`flex-1 px-4 py-2 rounded border transition-colors ${
                    viewMode === 'cypherpunk'
                      ? 'border-cyan-400/50 text-cyan-100 hover:bg-slate-800'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}




        {/* Credits Panel - Responsive */}
        {showSignInModal && (
          <div className={`fixed z-50 flex flex-col ${
            // Mobile: full screen except bottom bar
            'md:top-16 md:right-4 md:w-80 md:rounded-lg ' +
            'top-0 left-0 right-0 bottom-16 md:bottom-auto ' +
            // Desktop styling
            'shadow-2xl ' +
            (viewMode === 'cypherpunk'
              ? 'bg-slate-900/95 border border-cyan-400 backdrop-blur-md md:border'
              : viewMode === 'dark'
              ? 'bg-gray-800/95 border border-gray-600 backdrop-blur-md md:border'
              : 'bg-retro-beige-light/95 border-2 border-retro-teal backdrop-blur-md md:border-2')
          }`}>
            {/* Panel Header with Window Controls */}
            <div className={`flex items-center justify-between p-3 border-b ${
              viewMode === 'cypherpunk' 
                ? 'border-cyan-400/30 bg-slate-800/80' 
                : viewMode === 'dark'
                ? 'border-gray-600/50 bg-gray-700/80'
                : 'border-retro-teal/30 bg-retro-darker/80'
            }`}>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowSignInModal(false)}
                  className="w-3 h-3 bg-retro-red rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                  title="Close"
                ></button>
                <button 
                  onClick={() => setShowSignInModal(false)}
                  className="w-3 h-3 bg-retro-yellow rounded-full hover:bg-yellow-600 transition-colors cursor-pointer"
                  title="Minimize"
                ></button>
                <button 
                  className="w-3 h-3 bg-retro-mint rounded-full hover:bg-green-600 transition-colors cursor-pointer"
                  title="Maximize"
                ></button>
                <span className={`text-sm font-sans ml-2 antialiased ${
                  viewMode === 'cypherpunk' 
                    ? 'text-cyan-100' 
                    : viewMode === 'dark'
                    ? 'text-white'
                    : 'text-retro-light'
                }`}>
                  Sign Up for Safemode
                </span>
              </div>
            </div>

            {/* Panel Content */}
            <div className="p-4 md:p-4 overflow-y-auto flex-1">
              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-3 font-sans ${
                  viewMode === 'cypherpunk' 
                    ? 'text-cyan-100' 
                    : viewMode === 'dark'
                    ? 'text-white'
                    : 'text-retro-light'
                }`}>
                  Sign Up for Safemode
                </h3>

                <div className={`text-base p-5 rounded-lg border font-sans ${
                  viewMode === 'cypherpunk'
                    ? 'bg-slate-800/50 border-cyan-400/30 text-cyan-100'
                    : viewMode === 'dark'
                    ? 'bg-gray-800/50 border-gray-600/30 text-gray-200'
                    : 'bg-blue-50/50 border-blue-200/50 text-blue-900'
                }`}>
                  <p className="mb-4 leading-relaxed text-lg">
                    Join Safemode to build apps with AI agents using natural language. Get started with your free account today!
                  </p>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg font-medium">SafeMode is currently in development</p>
                    <p className="text-sm opacity-75">Check back soon for updates!</p>
                  </div>
                </div>
              </div>



              <div className="space-y-4">
                {/* Cancel Button */}
                <button
                  onClick={() => setShowSignInModal(false)}
                  className={`w-full px-4 py-2 rounded border text-sm font-sans font-bold transition-colors antialiased ${
                    viewMode === 'cypherpunk'
                      ? 'border-cyan-400/50 text-cyan-100 hover:bg-slate-800'
                      : viewMode === 'dark'
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-retro-border text-retro-light hover:bg-retro-window'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Signup Modal */}
        {showSignupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className={`w-full max-w-md mx-4 rounded-lg shadow-2xl ${
              viewMode === 'cypherpunk'
                ? 'bg-slate-900 border border-cyan-400'
                : viewMode === 'dark'
                ? 'bg-gray-800 border border-gray-600'
                : 'bg-retro-beige border-2 border-retro-border'
            }`}>
              {/* Modal Header */}
              <div className={`flex items-center justify-between px-6 py-4 border-b ${
                viewMode === 'cypherpunk'
                  ? 'border-cyan-400/50'
                  : viewMode === 'dark'
                  ? 'border-gray-600'
                  : 'border-retro-border'
              }`}>
                <h2 className={`text-xl font-bold font-sans ${
                  viewMode === 'cypherpunk' ? 'text-cyan-100' : viewMode === 'dark' ? 'text-gray-100' : 'text-retro-light'
                }`}>
                  Join SafeMode
                </h2>
                <button
                  onClick={() => setShowSignupModal(false)}
                  className={`transition-colors ${
                    viewMode === 'cypherpunk'
                      ? 'text-cyan-100 hover:text-red-400'
                      : viewMode === 'dark'
                      ? 'text-gray-100 hover:text-red-400'
                      : 'text-retro-light hover:text-retro-red'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-6">
                <p className={`text-sm mb-6 ${
                  viewMode === 'cypherpunk' ? 'text-cyan-200' : viewMode === 'dark' ? 'text-gray-300' : 'text-retro-light'
                }`}>
                  Get early access to SafeMode and be the first to know when our AI agent team becomes available. We'll send you updates on our progress and exclusive early access.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (signupEmail.trim()) {
                      emailSignupMutation.mutate(signupEmail.trim());
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      viewMode === 'cypherpunk' ? 'text-cyan-100' : viewMode === 'dark' ? 'text-gray-100' : 'text-retro-light'
                    }`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className={`w-full px-3 py-2 rounded border text-sm font-sans transition-colors ${
                        viewMode === 'cypherpunk'
                          ? 'bg-slate-800 border-cyan-400/30 text-cyan-100 placeholder-cyan-300/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                          : viewMode === 'dark'
                          ? 'bg-gray-700 border-gray-500 text-gray-100 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400'
                          : 'bg-white border-retro-border text-retro-light placeholder-retro-light/50 focus:border-retro-blue focus:ring-1 focus:ring-retro-blue'
                      }`}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={emailSignupMutation.isPending || !signupEmail.trim()}
                      className={`flex-1 px-4 py-2 rounded text-sm font-bold font-sans transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        viewMode === 'cypherpunk'
                          ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                          : viewMode === 'dark'
                          ? 'bg-gray-600 hover:bg-gray-700 text-white'
                          : 'bg-retro-blue hover:bg-retro-mint text-white'
                      }`}
                    >
                      {emailSignupMutation.isPending ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSignupModal(false)}
                      className={`px-4 py-2 rounded border text-sm font-bold font-sans transition-colors ${
                        viewMode === 'cypherpunk'
                          ? 'border-cyan-400/50 text-cyan-100 hover:bg-slate-800'
                          : viewMode === 'dark'
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          : 'border-retro-border text-retro-light hover:bg-retro-window'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }



