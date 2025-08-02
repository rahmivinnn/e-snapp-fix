import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Trends from "@/pages/trends";
import Realtime from "@/pages/realtime";
import Economics from "@/pages/economics";
import Menu from "@/pages/menu";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import NotificationModal from "@/components/modals/notification-modal";
import NotificationSettingsModal from "@/components/modals/notification-settings-modal";
import ContactSupportModal from "@/components/modals/contact-support-modal";
import ProfileModal from "@/components/modals/profile-modal";
import TariffModal from "@/components/modals/tariff-modal";
import NotFound from "@/pages/not-found";
import { useState } from "react";

// Status bar component
function StatusBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 px-4 py-2 flex justify-between items-center text-sm font-medium">
      <span>8:45</span>
      <div className="flex items-center space-x-1">
        <i className="fas fa-signal text-xs"></i>
        <i className="fas fa-wifi text-xs"></i>
        <div className="bg-black text-white px-1 rounded-sm text-xs">100</div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/trends" component={Trends} />
      <Route path="/realtime" component={Realtime} />
      <Route path="/economics" component={Economics} />
      <Route path="/menu" component={Menu} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [activeModals, setActiveModals] = useState({
    notifications: false,
    notificationSettings: false,
    contactSupport: false,
    profile: false,
    tariffs: false,
  });

  const openModal = (modalName: keyof typeof activeModals) => {
    setActiveModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof activeModals) => {
    setActiveModals(prev => ({ ...prev, [modalName]: false }));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background pb-20">
          <StatusBar />
          <Header onNotificationsClick={() => openModal('notifications')} />
          <div className="pt-20">
            <Router />
          </div>
          <BottomNavigation />
          
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
