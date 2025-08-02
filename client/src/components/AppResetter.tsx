import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function AppResetter() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Force clear data and show splash screen every time app loads
    console.log('Force resetting app to show splash screen...');
    localStorage.clear();
    sessionStorage.clear();
    
    // Force redirect to splash screen
    if (location !== '/splash') {
      setLocation('/splash');
    }
  }, []);

  return null;
}