import { useEffect, useState } from 'react';
import aukLogo from '@/assets/auk-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    // Logo fade in after brief delay
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 200);

    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setLogoVisible(false);
    }, 2500);

    // Hide splash and show main app
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-primary">
      <div className="relative flex flex-col items-center">
        <div
          className={`transition-all duration-1000 transform ${
            logoVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-90 translate-y-4'
          }`}
        >
          <img 
            src={aukLogo} 
            alt="AUK Bus Tracker" 
            className="w-24 h-24 mb-6 animate-pulse-glow"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">AUK Bus Tracker</h1>
            <p className="text-white/80 text-lg">Real-time bus tracking</p>
          </div>
        </div>
        
        {/* Elegant loading indicator */}
        <div className="absolute -bottom-8 flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.2s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};