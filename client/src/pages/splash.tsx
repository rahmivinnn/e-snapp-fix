import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function SplashPage() {
  const [, setLocation] = useLocation();
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    console.log('🎬 Splash screen loaded - exact design from mockup');
    
    // Animate logo entrance
    setTimeout(() => {
      setLogoVisible(true);
    }, 300);

    // Navigate after splash (sesuai mockup)
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
      clearTimeout(navTimer);
    };
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex items-center justify-center px-4">
      {/* Status bar mockup */}
      <div className="absolute top-0 left-0 right-0 h-11 bg-white border-b border-gray-100 flex items-center justify-between px-4 text-xs font-medium">
        <span>8:45</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-0.5">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48L3 12.95z"/>
          </svg>
          <span className="bg-green-500 text-white px-1 rounded text-[10px]">100</span>
        </div>
      </div>

      {/* Logo centered - exact dari mockup */}
      <div className={`transform transition-all duration-1000 ${logoVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        <div className="flex items-center space-x-2">
          {/* Logo icon - teal circle dengan C */}
          <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white rounded-full border-r-transparent transform rotate-45"></div>
          </div>
          {/* Text logo */}
          <h1 className="text-4xl font-bold text-teal-600">e-snapp</h1>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}