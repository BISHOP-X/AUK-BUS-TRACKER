import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bell } from 'lucide-react';

let deferredPrompt: any;

export const PWAInstallPrompt = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Clear the deferredPrompt variable
    deferredPrompt = null;
    setShowInstallPrompt(false);

    // Optionally, send analytics event
    console.log(`User response to install prompt: ${outcome}`);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
      <Bell className="w-5 h-5 text-primary animate-bounce" />
      <p className="text-sm font-medium">Install AUK Bus Tracker app?</p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInstallPrompt(false)}
        >
          Later
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleInstallClick}
        >
          Install
        </Button>
      </div>
    </div>
  );
};
