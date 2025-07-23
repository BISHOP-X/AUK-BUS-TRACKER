import { useState, useEffect } from 'react';
import { SplashScreen } from './SplashScreen';
import { BusMap } from './BusMap';
import { NavigationMenu } from './NavigationMenu';
import { SettingsScreen } from './SettingsScreen';
import { SearchScreen } from './SearchScreen';
import { FavoritesScreen } from './FavoritesScreen';
import { NotificationsScreen } from './NotificationsScreen';
import { PWAInstallPrompt } from './PWAInstallPrompt';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { Menu, Bell } from 'lucide-react';
import { Button } from './ui/button';

export const BusTrackerApp = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('map');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasNotifications] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
  };

  const handleSelectResult = (result: any) => {
    // Handle search result selection - could show on map or navigate
    setCurrentScreen('map');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentScreen('map')} />;
      case 'search':
        return <SearchScreen onBack={() => setCurrentScreen('map')} onSelectResult={handleSelectResult} />;
      case 'favorites':
        return <FavoritesScreen onBack={() => setCurrentScreen('map')} onSelectFavorite={handleSelectResult} />;
      case 'notifications':
        return <NotificationsScreen onBack={() => setCurrentScreen('map')} />;
      case 'map':
      default:
        return <BusMap />;
    }
  };

  const { needRefresh, offlineReady } = useServiceWorker();

  return (
    <>
      <PWAInstallPrompt />
      <div className="relative w-full h-screen bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
        {showSplash ? (
          <SplashScreen onComplete={handleSplashComplete} />
        ) : (
          <>
            <div className="absolute top-0 left-0 right-0 z-20">
              <div className="flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNavigate('notifications')}
              >
                <Bell className="w-6 h-6" />
                {hasNotifications && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative h-full">
            {renderCurrentScreen()}
          </div>

          {/* Navigation Menu */}
          {isMenuOpen && (
            <NavigationMenu
              currentScreen={currentScreen}
              onNavigate={handleNavigate}
              onClose={() => setIsMenuOpen(false)}
              isOpen={isMenuOpen}
              hasNotifications={hasNotifications}
            />
          )}
        </>
      )}
    </div>
    </>
  );
};