import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import logoImage from "@assets/e snapp logo 1 (1)_1754149374420.png";

export default function SplashPage() {
  const [, setLocation] = useLocation();
  const [logoVisible, setLogoVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Clear all app data on splash to ensure fresh start
    localStorage.clear();
    sessionStorage.clear();
    console.log('🎬 Splash screen loaded - app data cleared');
    
    // Animate logo entrance
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 300);

    // Animate progress bar
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Navigate after splash
    const navTimer = setTimeout(() => {
      sessionStorage.setItem('splashShown', 'true');
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const onboardingCompleted = localStorage.getItem('onboardingCompleted');
      const setupCompleted = localStorage.getItem('setupCompleted');
      
      if (isLoggedIn && onboardingCompleted && setupCompleted) {
        setLocation("/home");
      } else if (isLoggedIn && onboardingCompleted) {
        setLocation("/setup-wizard");
      } else if (isLoggedIn) {
        setLocation("/onboarding");
      } else {
        setLocation("/login");
      }
    }, 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(navTimer);
      clearInterval(progressTimer);
    };
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 max-w-md mx-auto flex items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-4">
        <div className={`transform transition-all duration-1000 ${logoVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-4'}`}>
          <img 
            src={logoImage} 
            alt="e-snapp" 
            className="h-12 w-auto filter drop-shadow-lg"
          />
        </div>
        
        {/* Loading Progress */}
        <div className="w-32 space-y-1.5">
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs text-gray-600 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}