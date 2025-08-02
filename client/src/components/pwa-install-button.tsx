import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { pwaManager } from '@/utils/pwa';

export default function PWAInstallButton() {
  const [showInstall, setShowInstall] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    // Check if app can be installed
    setShowInstall(pwaManager.canInstall());

    // Listen for PWA events
    const handleInstallAvailable = () => setShowInstall(true);
    const handleInstallCompleted = () => setShowInstall(false);
    const handleUpdateAvailable = () => setShowUpdate(true);

    window.addEventListener('pwa-install-available', handleInstallAvailable);
    window.addEventListener('pwa-install-completed', handleInstallCompleted);
    window.addEventListener('pwa-update-available', handleUpdateAvailable);

    return () => {
      window.removeEventListener('pwa-install-available', handleInstallAvailable);
      window.removeEventListener('pwa-install-completed', handleInstallCompleted);
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
    };
  }, []);

  const handleInstall = async () => {
    const success = await pwaManager.installApp();
    if (success) {
      setShowInstall(false);
    }
  };

  const handleUpdate = async () => {
    await pwaManager.updateApp();
    setShowUpdate(false);
  };

  if (showUpdate) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">Update Available</h3>
            <p className="text-xs text-gray-600 mt-1">A new version of e-snapp is ready to install</p>
          </div>
          <button
            onClick={() => setShowUpdate(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex space-x-2">
          <Button
            onClick={handleUpdate}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Update Now
          </Button>
          <Button
            onClick={() => setShowUpdate(false)}
            variant="outline"
            size="sm"
          >
            Later
          </Button>
        </div>
      </div>
    );
  }

  if (!showInstall) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Download className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900">Install e-snapp</h3>
            <p className="text-xs text-gray-600 mt-1">
              Install this app on your device for a better experience
            </p>
          </div>
          <button
            onClick={() => setShowInstall(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex space-x-2">
          <Button
            onClick={handleInstall}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white flex-1"
          >
            Install App
          </Button>
          <Button
            onClick={() => setShowInstall(false)}
            variant="outline"
            size="sm"
          >
            Not Now
          </Button>
        </div>
      </div>
    </div>
  );
}