import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function SplashPage() {
  const [, setLocation] = useLocation();
  const [logoVisible, setLogoVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('🎬 Splash screen loaded');
    
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500/20 to-green-500/20 max-w-md mx-auto flex items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6">
        <div className={`transform transition-all duration-1000 ${logoVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-4'}`}>
          <div className="bg-white rounded-2xl p-4 shadow-xl">
            <h1 className="text-4xl font-bold text-blue-600">e-snapp</h1>
          </div>
        </div>
        
        {/* Loading Progress */}
        <div className="w-32 space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-700 animate-pulse font-medium">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}