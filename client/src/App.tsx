import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Splash from "@/pages/splash";
import Login from "@/pages/login";
import SignUp from "@/pages/signup";
import Onboarding from "@/pages/onboarding";
import Home from "@/pages/home";
import Trends from "@/pages/trends";
import Realtime from "@/pages/realtime";
import Economics from "@/pages/economics";
import Menu from "@/pages/menu";
import SetupWizard from "@/pages/setup-wizard";

import BottomNavigation from "@/components/layout/bottom-navigation";
import NotificationModal from "@/components/modals/notification-modal";
import NotificationSettingsModal from "@/components/modals/notification-settings-modal";
import ContactSupportModal from "@/components/modals/contact-support-modal";
import ProfileModal from "@/components/modals/profile-modal";
import TariffModal from "@/components/modals/tariff-modal";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";



function Router() {
  return (
    <Switch>
      <Route path="/splash" component={Splash} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/setup-wizard" component={SetupWizard} />
      <Route path="/home" component={Home} />
      <Route path="/trends" component={Trends} />
      <Route path="/realtime" component={Realtime} />
      <Route path="/economics" component={Economics} />
      <Route path="/menu" component={Menu} />
      <Route path="/" component={Splash} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location, setLocation] = useLocation();
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const [activeModals, setActiveModals] = useState({
    notifications: false,
    notificationSettings: false,
    contactSupport: false,
    profile: false,
    tariffs: false,
  });

  // Check authentication and setup flow
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    const setupCompleted = localStorage.getItem('setupCompleted');
    
    console.log('Auth state:', { isLoggedIn, onboardingCompleted, setupCompleted, location });
    
    // Skip redirects for specific paths
    const skipPaths = ['/splash', '/login', '/signup', '/onboarding', '/setup-wizard'];
    if (skipPaths.includes(location)) {
      return;
    }
    
    if (!isLoggedIn) {
      setLocation('/splash');
    } else if (!onboardingCompleted) {
      setLocation('/onboarding');
    } else if (!setupCompleted) {
      setLocation('/setup-wizard');
    } else if (location === '/') {
      setLocation('/home');
    }
    
    setHasCompletedSetup(!!setupCompleted);
  }, [location, setLocation]);

  const openModal = (modalName: keyof typeof activeModals) => {
    setActiveModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof activeModals) => {
    setActiveModals(prev => ({ ...prev, [modalName]: false }));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <div className={hasCompletedSetup ? "pb-20" : ""}>
            <Router />
          </div>
          {hasCompletedSetup && <BottomNavigation />}
          
          {/* Modals */}
          <NotificationModal 
            isOpen={activeModals.notifications}
            onClose={() => closeModal('notifications')}
          />
          <NotificationSettingsModal
            isOpen={activeModals.notificationSettings}
            onClose={() => closeModal('notificationSettings')}
            onOpen={() => openModal('notificationSettings')}
          />
          <ContactSupportModal
            isOpen={activeModals.contactSupport}
            onClose={() => closeModal('contactSupport')}
            onOpen={() => openModal('contactSupport')}
          />
          <ProfileModal
            isOpen={activeModals.profile}
            onClose={() => closeModal('profile')}
            onOpen={() => openModal('profile')}
          />
          <TariffModal
            isOpen={activeModals.tariffs}
            onClose={() => closeModal('tariffs')}
            onOpen={() => openModal('tariffs')}
          />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
