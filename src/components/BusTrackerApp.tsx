import { useState } from 'react';
import { SplashScreen } from './SplashScreen';
import { BusMap } from './BusMap';
import { NavigationMenu } from './NavigationMenu';
import { SettingsScreen } from './SettingsScreen';
import { SearchScreen } from './SearchScreen';
import { FavoritesScreen } from './FavoritesScreen';
import { NotificationsScreen } from './NotificationsScreen';
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

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      
      {!showSplash && (
        <div className="animate-fade-in relative">
          {/* Floating Action Buttons - Only show on map screen */}
          {currentScreen === 'map' && (
            <>
              {/* Menu Button */}
              <Button
                onClick={() => setIsMenuOpen(true)}
                className="fixed top-4 left-4 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-elegant hover:shadow-floating text-primary hover:bg-white transition-all"
                size="sm"
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Notifications Button */}
              <Button
                onClick={() => setCurrentScreen('notifications')}
                className="fixed top-4 right-4 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-elegant hover:shadow-floating text-primary hover:bg-white transition-all relative"
                size="sm"
              >
                <Bell className="w-5 h-5" />
                {hasNotifications && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">3</span>
                  </div>
                )}
              </Button>
            </>
          )}

          {/* Navigation Menu */}
          <NavigationMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onNavigate={handleNavigate}
            currentScreen={currentScreen}
            hasNotifications={hasNotifications}
          />

          {/* Current Screen */}
          {renderCurrentScreen()}
        </div>
      )}
    </div>
  );
};