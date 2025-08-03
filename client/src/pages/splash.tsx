import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import logoImage from "@assets/e snapp logo 1 (1)_1754180526051.png";

export default function SplashPage() {
  const [, setLocation] = useLocation();
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    console.log('🎬 Splash screen loaded - simple centered logo');
    
    // Animate logo entrance
    setTimeout(() => {
      setLogoVisible(true);
    }, 300);

    // Navigate after splash (langsung ke onboarding dulu)
    const navTimer = setTimeout(() => {
      sessionStorage.setItem('splashShown', 'true');
      setLocation("/onboarding");
    }, 2500);

    return () => {
      clearTimeout(navTimer);
    };
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex items-center justify-center">
      {/* Logo centered - menggunakan gambar asli */}
      <div className={`transform transition-all duration-1000 ${logoVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        <img 
          src={logoImage} 
          alt="e-snapp" 
          className="w-48 h-auto"
        />
      </div>
    </div>
  );
}