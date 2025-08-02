import { useEffect } from "react";
import { useLocation } from "wouter";
import logoImage from "@assets/e snapp logo 1 (1)_1754149374420.png";

export default function SplashPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user is already logged in or setup completed
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const setupCompleted = localStorage.getItem('setupCompleted');
      
      if (isLoggedIn && setupCompleted) {
        setLocation("/home");
      } else if (isLoggedIn) {
        setLocation("/onboarding");
      } else {
        setLocation("/login");
      }
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img 
          src={logoImage} 
          alt="e-snapp" 
          className="h-20 w-auto"
        />
      </div>
    </div>
  );
}