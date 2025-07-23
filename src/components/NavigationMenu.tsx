import { useState, useEffect } from 'react';
import { 
  Settings, 
  Search, 
  Menu, 
  Bell, 
  User, 
  X,
  Route as RouteIcon,
  Clock,
  MapPin,
  Heart,
  History,
  HelpCircle,
  Info,
  Download
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  currentScreen: string;
  hasNotifications: boolean;
}

export const NavigationMenu = ({ 
  isOpen, 
  onClose, 
  onNavigate, 
  currentScreen,
  hasNotifications 
}: NavigationMenuProps) => {
  const [userName] = useState('Alex Johnson');

  const menuItems = [
    { id: 'map', label: 'Live Map', icon: MapPin, badge: null },
    { id: 'search', label: 'Search & Plan', icon: Search, badge: null },
    { id: 'favorites', label: 'Favorites', icon: Heart, badge: null },
    { id: 'history', label: 'Trip History', icon: History, badge: null },
    { id: 'routes', label: 'All Routes', icon: RouteIcon, badge: null },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: hasNotifications ? 'new' : null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, badge: null },
    { id: 'about', label: 'About', icon: Info, badge: null },
  ];

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-md shadow-floating z-50 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-primary p-6 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">Menu</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">{userName}</p>
                <p className="text-white/80 text-sm">Regular Commuter</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                    currentScreen === item.id
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-foreground hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="destructive" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Download App Section */}
          <div className="p-4 border-t border-border/20">
            <button
              onClick={async () => {
                if (!deferredPrompt) return;
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to install prompt: ${outcome}`);
                setDeferredPrompt(null);
              }}
              className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download App
            </button>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border/20">
            <div className="text-center text-xs text-muted-foreground">
              <p>AUK Bus Tracker v2.1.0</p>
              <p>© 2024 Auckland University</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};